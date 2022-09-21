import React, { useState, useContext } from "react";
import { TextField, Button, FormControl, MenuItem } from "@mui/material";
import axios from "axios";
import { FolderContext } from "../../context/FolderContext";

import { TWEETS_PATH } from "../../shared/constants";

const SaveTweetForm = () => {
  const [folders, setFolders] = useContext(FolderContext);
  const [idOrUrl, setIdOrUrl] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [folderName, setFolderName] = useState("");

  const saveTweet = async () => {
    try {
      const { data } = await axios.post(TWEETS_PATH, {
        idOrUrl,
        folder: folderName,
        isUrl: idOrUrl.includes("twitter"),
      });
      const folderToUpdate = folders.find(
        (folder) => folder.name === folderName
      );
      const foldersTweets = folderToUpdate["tweets"];
      setFolders([
        { ...folderToUpdate, tweets: [data, ...foldersTweets] },
        ...folders.filter((folder) => folder.name !== folderName),
      ]);
      setIdOrUrl("");
      setFolderName("");
      setLoading(false);
    } catch {
      setError(true);
      setLoading(false);
    }
  };
  const handleFolderChange = (e) => setFolderName(e.target.value);
  const handleInputChange = (e) => {
    if (error) {
      setError(false);
    }
    setIdOrUrl(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    saveTweet();
  };
  return (
    <form onSubmit={handleSubmit}>
      <FormControl
        sx={{
          paddingTop: 2,
          paddingBottom: 2,
          margin: "0 auto",
        }}
        fullWidth
      >
        <TextField
          id="outlined-basic"
          label="Enter tweet url or id"
          variant="outlined"
          required
          value={idOrUrl}
          sx={{ paddingBottom: 2 }}
          onChange={handleInputChange}
          error={error}
          helperText={
            error && "Could not save tweet. Make sure the url or id is a valid"
          }
        />

        <FormControl sx={{ paddingBottom: 2 }}>
          <TextField
            id="demo-simple-select"
            value={folderName}
            select
            required
            disabled={!folders?.length}
            label="Select folder to save tweet to"
            onChange={handleFolderChange}
          >
            {folders.map(({ name, _id }) => (
              <MenuItem value={name} key={_id}>
                {name}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>

        <Button
          variant="contained"
          disabled={!idOrUrl || !folderName || loading}
          type="submit"
        >
          Save Tweet
        </Button>
      </FormControl>
    </form>
  );
};

export default SaveTweetForm;
