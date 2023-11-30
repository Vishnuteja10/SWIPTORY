const Story = require("../models/story.model");

const getSpecificStory = async (req, res) => {
  try {
    const { id, storyId, isMultiple } = req.query;

    if (!id || !storyId) {
      return res.status(404).json({
        success: false,
        message: "please send story id and document id ",
      });
    }

    if (isMultiple === "true") {
      const story = await Story.findById(id);
      if (story) {
        return res.status(200).json({
          success: true,
          message: "story fetched successfully",
          story,
        });
      }
      return res
        .status(400)
        .json({ success: false, message: "No story found" });
    } else {
      const story = await Story.findById(id);
      if (!story) {
        return res
          .status(404)
          .json({ success: false, message: "No story found" });
      }

      const storyIndex = story.stories.findIndex((s) => s._id == storyId);

      if (storyIndex === -1) {
        return res
          .status(404)
          .json({ success: false, message: "No such stories found" });
      }

      const reqStory = story.stories[storyIndex];
      const stories = [reqStory];
      console.log("req story is", reqStory);

      res.status(200).json({
        success: true,
        message: "story fetched successfully",
        story: { stories },
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getStory = async (req, res) => {
  try {
    const { storyId } = req.query;
    console.log("story id", storyId);
    if (!storyId) {
      return res
        .status(400)
        .json({ success: false, message: "story id required" });
    }
    const story = await Story.findById(storyId);
    if (story) {
      return res
        .status(200)
        .json({ success: true, message: "story fetched successfully", story });
    }
    res.status(400).json({ success: false, message: "No story found" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const addStory = async (req, res) => {
  try {
    const { userId, stories } = req.body;

    if (!userId || !stories) {
      return res
        .status(400)
        .json({ success: false, message: "please send user id and stories" });
    }

    const story = new Story({ userId, stories });
    await story.save();
    res.status(200).json({
      success: true,
      message: "story added successfully",
      story,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateStory = async (req, res) => {
  try {
    const { storyId, stories } = req.body;
    if (!storyId || !stories) {
      return res
        .status(400)
        .json({ success: false, message: "please send story id and stories" });
    }

    const updatedStory = await Story.findByIdAndUpdate(
      { _id: storyId },
      { $set: { stories: stories } },
      { new: true }
    );

    if (updateStory) {
      return res.status(200).json({
        success: true,
        message: "story updated successfully",
        story: updatedStory,
      });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "story not found" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "internal server error" });
  }
};

const likeStory = async (req, res) => {
  try {
    const { id, storyId } = req.body;

    if (!id || !storyId) {
      return res
        .status(400)
        .json({ success: false, message: "id and story id is required" });
    }

    const story = await Story.findById(id);
    if (!story) {
      return res
        .status(404)
        .json({ success: false, message: "No story found" });
    }

    const storyIndex = story.stories.findIndex((s) => s._id == storyId);

    if (storyIndex === -1) {
      return res
        .status(404)
        .json({ success: false, message: "No such stories found" });
    }

    story.stories[storyIndex].likes++;

    const updatedStory = await story.save();

    const likesCount = updatedStory.stories[storyIndex].likes;

    res.status(200).json({
      success: true,
      message: "like count increased",
      likesCount,
      updateStory,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const dislikeStory = async (req, res) => {
  try {
    const { id, storyId } = req.body;

    if (!id || !storyId) {
      return res
        .status(400)
        .json({ success: false, message: "id and story id is required" });
    }

    const story = await Story.findByIdAndUpdate(id);

    if (!story) {
      return res
        .status(404)
        .json({ success: false, message: "No story found" });
    }

    const storyIndex = story.stories.findIndex((s) => s._id == storyId);

    if (storyIndex === -1) {
      return res
        .status(404)
        .json({ success: false, message: "No such stories found" });
    }

    story.stories[storyIndex].likes--;

    const updatedStory = await story.save();

    const likesCount = updatedStory.stories[storyIndex].likes;

    res.status(200).json({
      success: true,
      message: "like count decreased",
      likesCount,
      updateStory,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getStory,
  addStory,
  updateStory,
  likeStory,
  dislikeStory,
  getSpecificStory,
};
