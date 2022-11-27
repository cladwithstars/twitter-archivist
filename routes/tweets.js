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

router.get("/:username", async (req, res) => {
  try {
    const usernameLookup = await client.v2.userByUsername(req.params.username);
    const { data } = usernameLookup;
    const { id } = data;
    const likedTweets = await client.v2.userLikedTweets(id);
    const likes = likedTweets._realData;
    const formattedResult = likes.data.map((tweet) => ({
      id: tweet.id,
      text: tweet.text,
    }));
    res.json(formattedResult);
  } catch (error) {
    console.log(error);
    res.status(404).send("Server Error - could not get user data");
  }
});

router.get("/details/:tweetId", async (req, res) => {
  const id = req.params.tweetId;
  try {
    const data = await client.v1.singleTweet(id);
    const { full_text, user, created_at } = data;
    const { screen_name, name, profile_image_url } = user;
    const tweetDetails = {
      text: full_text || "",
      url: screen_name ? `https://twitter.com/${screen_name}/status/${id}` : "",
      username: screen_name || "",
      displayName: name,
      datePosted: created_at,
    };
    res.json(tweetDetails);
  } catch (error) {
    console.log(error);
    res.status(404).send("Server Error - could not fetch tweet details");
  }
});

router.post("/", async (req, res) => {
  const { idOrUrl, folder, isUrl, userId } = req.body;
  const id = isUrl ? idOrUrl.split("/").at(-1) : idOrUrl;

  try {
    const data = await client.v1.singleTweet(id);
    const { full_text, user, created_at } = data;
    const { screen_name, name, profile_image_url } = user;
    const newTweet = new Tweet({
      text: full_text || "",
      url: screen_name ? `https://twitter.com/${screen_name}/status/${id}` : "",
      username: screen_name || "",
      displayName: name,
      datePosted: created_at,
      profileImg: profile_image_url,
      dateSaved: Date.now(),
    });

    const ourFolder = await Folder.find({ userId, name: folder });
    const tweet = await newTweet.save();

    const filter = { _id: ourFolder[0]._id };
    const update = {
      $set: { date: Date.now() },
      $push: {
        tweets: {
          $each: [newTweet],
          $position: 0,
        },
      },
    };

    Folder.findOneAndUpdate(filter, update, function (error, success) {
      if (error) {
        console.error(error);
      }
    });

    res.json(tweet);
  } catch {
    console.error("could not save tweet");
    res.status(500).send("Server Error - could not save tweet");
  }
});

router.delete("/:folderId/:tweetId", async (req, res) => {
  try {
    let folder = await Folder.find({ _id: req.params.folderId });

    if (!folder) return res.status(404).json({ msg: "Folder not found" });

    const filter = { _id: req.params.folderId };
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
        console.error(error);
      }
    });

    res.json({ msg: "Tweet removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
