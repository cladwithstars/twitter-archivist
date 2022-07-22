const express = require("express");
const router = express.Router();
const config = require("config");
require("dotenv").config();
const { TwitterApi } = require("twitter-api-v2");

const client = new TwitterApi({
  appKey: process.env.API_KEY,
  appSecret: process.env.API_SECRET_KEY,
  accessToken: process.env.ACCESS_TOKEN,
  accessSecret: process.env.ACCESS_TOKEN_SECRET,
});

const Folder = require("../models/Folder");
const Tweet = require("../models/Tweet");

router.post("/saveTweet", async (req, res) => {
  const { id, folder } = req.body;
  try {
    const data = await client.v1.singleTweet(id);
    const { full_text, user } = data;
    const { screen_name } = user;
    const newTweet = new Tweet({
      text: full_text,
      url: screen_name ? `https://twitter.com/${screen_name}/status/${id}` : "",
      username: screen_name || "",
    });

    const ourFolder = await Folder.find({ name: folder });
    const tweet = await newTweet.save();

    Folder.findOneAndUpdate(
      { _id: ourFolder[0]._id },
      { $push: { tweets: newTweet } },
      function (error, success) {
        if (error) {
          console.log(error);
        } else {
          console.log(success);
        }
      }
    );

    res.json(tweet);
  } catch {
    console.error("could not save tweet");
    res.status(500).send("Server Error - could not save tweet");
  }
});

module.exports = router;
