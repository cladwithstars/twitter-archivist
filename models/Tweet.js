const mongoose = require("mongoose");

const TweetSchema = mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  datePosted: {
    type: String,
  },
  displayName: {
    type: String,
  },
  profileImg: {
    type: String,
  },
  retweetCount: {
    type: Number,
  },
  favoriteCount: {
    type: Number,
  },
  dateSaved: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("tweets", TweetSchema);
