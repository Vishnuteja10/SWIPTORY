const express = require("express");

const router = express.Router();

const {
  addStory,
  updateStory,
  likeStory,
  dislikeStory,
  getStory,
  getSpecificStory,
} = require("../controllers/story.controller");

const VerifyAuthentication = require("../middlewares/VerifyAuthentication");

router.route("/get-story").get(getStory);

router.route("/add-story").post(VerifyAuthentication, addStory);

router.route("/update-story").put(VerifyAuthentication, updateStory);

router.route("/like-story").put(VerifyAuthentication, likeStory);

router.route("/dislike-story").put(VerifyAuthentication, dislikeStory);

router.route("/specific-story").get(VerifyAuthentication, getSpecificStory);

module.exports = router;
