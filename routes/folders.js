const express = require("express");
const router = express.Router();
const config = require("config");
require("dotenv").config();

const Folder = require("../models/Folder");

router.post("/createFolder", async (req, res) => {
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

router.get("/getFolders", async (req, res) => {
  try {
    const folders = await Folder.find().sort({ date: -1 });
    res.json(folders);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

router.delete("/:name", async (req, res) => {
  try {
    let folder = await Folder.find({ name: req.params.name });

    if (!folder) return res.status(404).json({ msg: "Folder not found" });

    await Folder.deleteOne({ name: req.params.name });

    res.json({ msg: "Folder removed" });
  } catch (err) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
