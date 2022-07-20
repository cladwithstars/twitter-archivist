const express = require("express");
const router = express.Router();
const config = require("config");
require("dotenv").config();

const Folder = require("../models/Folder");

router.post("/createFolder", async (req, res) => {
  console.log("req.body: ", req.body);
  const { name } = req.body;
  try {
    const newFolder = new Folder({
      name,
      tweets: [],
    });
    const folder = await newFolder.save();
    res.json(folder);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
