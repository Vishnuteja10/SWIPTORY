const Story = require("../models/story.model");

const getYourStories = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User Id required" });
    }

    const stories = await Story.find({ userId });

    if (!stories) {
      return res
        .status(404)
        .json({ success: false, message: "No stories found" });
    }

    res.status(200).json({
      success: true,
      message: "stories fetched successfully",
      stories,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getFoodStories = async (req, res) => {
  try {
    const foodStories = await Story.aggregate([
      {
        $match: { "stories.category": "Food" },
      },
      {
        $project: {
          userId: 1,
          stories: {
            $filter: {
              input: "$stories",
              as: "story",
              cond: { $eq: ["$$story.category", "Food"] },
            },
          },
        },
      },
    ]);
    if (foodStories) {
      return res.status(200).json({
        success: true,
        message: "Food stories fetched successfully",
        stories: foodStories,
      });
    }
    res.status(404).json({ success: false, message: "No such data found" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getHealthFitnessStories = async (req, res) => {
  try {
    const healthStories = await Story.aggregate([
      {
        $match: { "stories.category": "HealthFitness" },
      },
      {
        $project: {
          userId: 1,
          stories: {
            $filter: {
              input: "$stories",
              as: "story",
              cond: { $eq: ["$$story.category", "HealthFitness"] },
            },
          },
        },
      },
    ]);
    if (healthStories) {
      return res.status(200).json({
        success: true,
        message: "Health Fitness stories fetched successfully",
        stories: healthStories,
      });
    }
    res.status(404).json({ success: false, message: "No such data found" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getTravelStories = async (req, res) => {
  try {
    const travelStories = await Story.aggregate([
      {
        $match: { "stories.category": "Travel" },
      },
      {
        $project: {
          userId: 1,
          stories: {
            $filter: {
              input: "$stories",
              as: "story",
              cond: { $eq: ["$$story.category", "Travel"] },
            },
          },
        },
      },
    ]);
    if (travelStories) {
      return res.status(200).json({
        success: true,
        message: "Travel stories fetched successfully",
        stories: travelStories,
      });
    }
    res.status(404).json({ success: false, message: "No such data found" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getMoviesStories = async (req, res) => {
  try {
    const movieStories = await Story.aggregate([
      {
        $match: { "stories.category": "Movies" },
      },
      {
        $project: {
          userId: 1,
          stories: {
            $filter: {
              input: "$stories",
              as: "story",
              cond: { $eq: ["$$story.category", "Movies"] },
            },
          },
        },
      },
    ]);
    if (movieStories) {
      return res.status(200).json({
        success: true,
        message: "Movies stories fetched successfully",
        stories: movieStories,
      });
    }
    res.status(404).json({ success: false, message: "No such data found" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getEducationStories = async (req, res) => {
  try {
    const educationStories = await Story.aggregate([
      {
        $match: { "stories.category": "Education" },
      },
      {
        $project: {
          userId: 1,
          stories: {
            $filter: {
              input: "$stories",
              as: "story",
              cond: { $eq: ["$$story.category", "Education"] },
            },
          },
        },
      },
    ]);
    if (educationStories) {
      return res.status(200).json({
        success: true,
        message: "Education stories fetched successfully",
        stories: educationStories,
      });
    }

    res.status(404).json({ success: false, message: "No such data found" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getFoodStories,
  getEducationStories,
  getHealthFitnessStories,
  getMoviesStories,
  getTravelStories,
  getYourStories,
};
