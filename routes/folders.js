const express = require("express");
const router = express.Router();
const config = require("config");
require("dotenv").config();

const Folder = require("../models/Folder");

// create folder
router.post("/", async (req, res) => {
  const { name, userId } = req.body;

  try {
    const newFolder = new Folder({
      name,
      tweets: [],
      userId,
    });
    const folder = await newFolder.save();
    res.json(folder);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ error: error.message });
  }
});

router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const folders = await Folder.find({ userId }).sort({ date: -1 });
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

// rename folder
router.put("/:name", async (req, res) => {
  const { newName } = req.body;

  try {
    const filter = { name: req.params.name };
    const update = {
      $set: { name: newName },
    };

    Folder.findOneAndUpdate(filter, update, function (error, success) {
      if (error) {
        console.error(error);
      }
    });

    res.json(newName);
  } catch (err) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
