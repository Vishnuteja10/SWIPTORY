const express = require("express");

const router = express.Router();

const {
  addBookmark,
  removeBookmark,
  getBookmarks,
} = require("../controllers/bookmarkstory.controller");

router.route("/addbookmark").post(addBookmark);

router.route("/removebookmark").delete(removeBookmark);

router.route("/getbookmarks").get(getBookmarks);

module.exports = router;
