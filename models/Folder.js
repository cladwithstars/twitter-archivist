const mongoose = require("mongoose");

const FolderSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  tweets: {
    type: Array,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(), // keeps track of last time *modified* - not creation date
  },
});

module.exports = mongoose.model("folders", FolderSchema);
