import React, { useState, useContext } from "react";
import { TextField, Button, FormControl, MenuItem } from "@mui/material";
import axios from "axios";
import { FolderContext } from "../context/FolderContext";

import { SAVE_TWEET_PATH } from "../shared/constants";

const SaveTweetForm = () => {
  const [folders, setFolders] = useContext(FolderContext);
  const [id, setId] = useState("");
  const [folderName, setFolderName] = useState("");
  const saveTweet = async () => {
    try {
      const { data } = await axios.post(SAVE_TWEET_PATH, {
        id,
        folder: folderName,
      });
      const folderToUpdate = folders.find(
        (folder) => folder.name === folderName
      );
      const foldersTweets = folderToUpdate["tweets"];
      setFolders([
        { ...folderToUpdate, tweets: [data, ...foldersTweets] },
        ...folders.filter((folder) => folder.name !== folderName),
      ]);
      setId("");
      setFolderName("");
    } catch {
      console.error("could not save tweet");
    }
  };
  const handleFolderChange = (e) => setFolderName(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    saveTweet();
  };
  return (
    <form onSubmit={handleSubmit}>
      <FormControl
        sx={{
          padding: 2,
          margin: "10px",
          width: "80%",
        }}
      >
        <TextField
          id="outlined-basic"
          label="Enter Tweet Id"
          variant="outlined"
          required
          value={id}
          sx={{ paddingBottom: 2 }}
          onChange={(e) => setId(e.target.value)}
        />

        <FormControl sx={{ paddingBottom: 2 }}>
          <TextField
            id="demo-simple-select"
            value={folderName}
            select
            required
            label="Select Folder"
            onChange={handleFolderChange}
          >
            {folders.map(({ name }) => (
              <MenuItem value={name} key={name}>
                {name}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>

        <Button variant="contained" disabled={!id || !folderName} type="submit">
          Save Tweet
        </Button>
      </FormControl>
    </form>
  );
};

export default SaveTweetForm;
