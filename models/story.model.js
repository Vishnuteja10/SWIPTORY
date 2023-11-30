const mongoose = require("mongoose");

const story = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  heading: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const storySchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  stories: [story],
});

module.exports = mongoose.model("Story", storySchema);
