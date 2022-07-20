const mongoose = require("mongoose");

const FolderSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  tweets: {
    type: Array, // ?
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("folders", FolderSchema);
