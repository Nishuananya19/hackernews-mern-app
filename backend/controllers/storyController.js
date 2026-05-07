const Story = require("../models/Story");
const User = require("../models/User");
const scrapeHackerNews = require("../scraper/scrapeHackerNews");

exports.getStories = async (req, res) => {
  try {
    const stories = await Story.find().sort({
      points: -1,
    });

    res.json({
      success: true,
      count: stories.length,
      stories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getStoryById = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);

    if (!story) {
      return res.status(404).json({
        success: false,
        message: "Story not found",
      });
    }

    res.json({
      success: true,
      story,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.toggleBookmark = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    const storyId = req.params.id;

    const alreadyBookmarked =
      user.bookmarks.includes(storyId);

    if (alreadyBookmarked) {
      user.bookmarks = user.bookmarks.filter(
        (id) => id.toString() !== storyId
      );
    } else {
      user.bookmarks.push(storyId);
    }

    await user.save();

    res.json({
      success: true,
      bookmarks: user.bookmarks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.scrapeStories = async (req, res) => {
  try {
    await scrapeHackerNews();

    res.json({
      success: true,
      message: "Scraping completed",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};