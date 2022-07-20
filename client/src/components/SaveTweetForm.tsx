import React, { useState } from "react";
import {
  TextField,
  Button,
  FormControl,
  FormLabel,
  FormControlLabel,
} from "@mui/material";

const SaveTweetForm = () => {
  const [id, setId] = useState("");
  const handleSubmit = () => {};
  return (
    <div>
      <TextField
        id="outlined-basic"
        label="Save Tweet By Id"
        variant="outlined"
        required
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <Button variant="outlined" onClick={handleSubmit}>
        Save Tweet
      </Button>
    </div>
  );
};

export default SaveTweetForm;
