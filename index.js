const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors());

const PORT = process.env.PORT || 4000;

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");

    const authRoutes = require("./routes/auth.route");

    const storyRoutes = require("./routes/story.route");

    const boomarkRoutes = require("./routes/storybookmark.route");

    const categoryRoutes = require("./routes/storycategory.route");

    app.listen(PORT, () => {
      console.log(`server is running on port ${PORT}`);
    });

    app.use("/api", authRoutes);
    app.use("/api", storyRoutes);
    app.use("/api", boomarkRoutes);
    app.use("/api", categoryRoutes);
  })
  .catch((error) => {
    console.log("Failed to connect to MongoDB", error);
  });

app.get("/health", async (req, res) => {
  res.status(200).json("Server is up and running");
});
