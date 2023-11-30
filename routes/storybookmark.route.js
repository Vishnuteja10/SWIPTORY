const express = require("express");

const router = express.Router();

const {
  addBookmark,
  removeBookmark,
  getBookmarks,
} = require("../controllers/bookmarkstory.controller");

const VerifyAuthentication = require("../middlewares/VerifyAuthentication");

router.route("/addbookmark").post(VerifyAuthentication,addBookmark);

router.route("/removebookmark").delete(VerifyAuthentication,removeBookmark);

router.route("/getbookmarks").get(VerifyAuthentication,getBookmarks);

module.exports = router;
