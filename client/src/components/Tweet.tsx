import React from "react";
import { Card } from "@mui/material";

const Tweet = ({ text, url, username }) => {
  return (
    <Card variant="outlined">
      {text} - {username} - <a href={url}>{url}</a>
    </Card>
  );
};

export default Tweet;
