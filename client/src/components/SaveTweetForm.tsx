import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import axios from "axios";
import { urlPath } from "../shared/constants";

const SaveTweetForm = () => {
  const [id, setId] = useState("");
  const [folder, setFolder] = useState("");
  const saveTweet = async () => {
    // const {data} = axios.post()
  };
  const handleFolderChange = (e: any) => {
    setFolder(e.target.value);
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
  };
  return (
    <form onSubmit={handleSubmit}>
      <FormControl
        sx={{
          padding: 2,
          margin: "10px",
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
            value={folder}
            select
            required
            label="Select Folder"
            onChange={handleFolderChange}
          >
            <MenuItem value={"Ten"}>Ten</MenuItem>
            <MenuItem value={"Twenty"}>Twenty</MenuItem>
            <MenuItem value={"Thirty"}>Thirty</MenuItem>
          </TextField>
        </FormControl>

        <Button variant="contained" disabled={!id || !folder} type="submit">
          Save Tweet
        </Button>
      </FormControl>
    </form>
  );
};

export default SaveTweetForm;
