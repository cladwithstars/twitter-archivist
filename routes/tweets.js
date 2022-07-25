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
    console.log(data);
    const { full_text, user, created_at } = data;
    const { screen_name, name, profile_image_url } = user;
    const newTweet = new Tweet({
      text: full_text || "",
      url: screen_name ? `https://twitter.com/${screen_name}/status/${id}` : "",
      username: screen_name || "",
      displayName: name,
      datePosted: created_at,
      profileImg: profile_image_url,
    });

    const ourFolder = await Folder.find({ name: folder });
    const tweet = await newTweet.save();

    const filter = { _id: ourFolder[0]._id };
    const update = {
      $set: { date: Date.now() },
      $push: { tweets: newTweet },
    };

    Folder.findOneAndUpdate(filter, update, function (error, success) {
      if (error) {
        console.log(error);
      }
    });

    res.json(tweet);
  } catch {
    console.error("could not save tweet");
    res.status(500).send("Server Error - could not save tweet");
  }
});

router.delete("/:folderName/:tweetId", async (req, res) => {
  try {
    let folder = await Folder.find({ name: req.params.folderName });

    if (!folder) return res.status(404).json({ msg: "Folder not found" });

    const filter = { _id: folder[0]._id };
    const update = {
      $set: { date: Date.now() },
      $set: {
        tweets: folder[0]["tweets"].filter(
          (tweet) => tweet._id.toString() !== req.params.tweetId
        ),
      },
    };
    Folder.findOneAndUpdate(filter, update, function (error, success) {
      if (error) {
        console.log(error);
      }
    });

    res.json({ msg: "Folder removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
