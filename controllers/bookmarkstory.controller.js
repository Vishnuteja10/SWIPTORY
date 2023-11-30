const Bookmark = require("../models/bookmarkstory.model");

const getBookmarks = async (req, res) => {
  const { userId } = req.query;
  try {
    const bookmarks = await Bookmark.find({ userId });
    if (!bookmarks) {
      return res
        .status(400)
        .json({ success: false, message: "No bookmarks found" });
    }
    res
      .status(200)
      .json({ success: true, message: "bookmarks found", bookmarks });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const addBookmark = async (req, res) => {
  try {
    const { story } = req.body;
    if (!story) {
      return res
        .status(400)
        .json({ success: false, message: "story data required" });
    }
    const newBookmark = new Bookmark(story);
    const savedBookmark = await newBookmark.save();
    if (!savedBookmark) {
      return res
        .status(400)
        .json({ success: false, message: "failed to save bookmark" });
    }
    res.status(200).json({
      success: true,
      message: "story bookmarked",
      bookmark: savedBookmark,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const removeBookmark = async (req, res) => {
  try {
    const { storyId } = req.body;
    if (!storyId) {
      return res
        .status(400)
        .json({ success: false, message: "storyId required" });
    }

    const deletedStory = await Bookmark.findOneAndDelete({ storyId });
    if (!deletedStory) {
      return res
        .status(404)
        .json({ success: false, message: "No such story found" });
    }

    res.status(200).json({
      success: true,
      message: "removed bookmark",
      bookmark: deletedStory,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { addBookmark, removeBookmark, getBookmarks };
