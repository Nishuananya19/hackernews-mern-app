const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  getStories,
  getStoryById,
  toggleBookmark,
  scrapeStories,
} = require("../controllers/storyController");

router.post("/scrape", scrapeStories);
router.get("/", getStories);
router.get("/:id", getStoryById);
router.post("/:id/bookmark", authMiddleware, toggleBookmark);

module.exports = router;