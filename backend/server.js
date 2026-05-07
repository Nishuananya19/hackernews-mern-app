const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const scrapeHackerNews = require("./scraper/scrapeHackerNews");
const storyRoutes = require("./routes/storyRoutes");
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/stories", storyRoutes);
app.get("/", (req, res) => {
  res.send("API Running");
});

const startServer = async () => {
  try {
    await connectDB();

    console.log("Database ready");

    await scrapeHackerNews();

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();