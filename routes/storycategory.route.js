const express = require("express");

const router = express.Router();

const {
  getFoodStories,
  getHealthFitnessStories,
  getMoviesStories,
  getTravelStories,
  getEducationStories,
  getYourStories,
} = require("../controllers/storycategory.controller");

const VerifyAuthentication = require("../middlewares/VerifyAuthentication");

router.route("/food-stories").get(getFoodStories);

router.route("/health-fitness-stories").get(getHealthFitnessStories);

router.route("/travel-stories").get(getTravelStories);

router.route("/movies-stories").get(getMoviesStories);

router.route("/education-stories").get(getEducationStories);

router.route("/your-stories").get(VerifyAuthentication, getYourStories);

module.exports = router;
