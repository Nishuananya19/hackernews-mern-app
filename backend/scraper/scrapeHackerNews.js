const axios = require("axios");
const cheerio = require("cheerio");
const Story = require("../models/Story");

const scrapeHackerNews = async () => {
  try {
    console.log("Scraping Hacker News...");

    const response = await axios.get(
      "https://news.ycombinator.com"
    );

    const $ = cheerio.load(response.data);

    const stories = [];

    $(".athing").slice(0, 10).each((i, el) => {
      const title = $(el)
        .find(".titleline a")
        .text()
        .trim();

      const url = $(el)
        .find(".titleline a")
        .attr("href");

      const subtext = $(el).next();

      const points =
        parseInt(subtext.find(".score").text()) || 0;

      const author =
        subtext.find(".hnuser").text() || "Unknown";

      const postedAt =
        subtext.find(".age").text() || "";

      if (title) {
        stories.push({
          title,
          url,
          points,
          author,
          postedAt,
        });
      }
    });

    console.log("Stories found:", stories.length);

    await Story.deleteMany({});
    await Story.insertMany(stories);

    console.log("Stories saved successfully");
  } catch (error) {
    console.log("Scraper error:", error.message);
  }
};

module.exports = scrapeHackerNews;