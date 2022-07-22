import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const Tweet = ({ text, url, username }) => {
  return (
    <Card
      sx={{
        width: "80%",
        margin: "0 auto",
        marginBottom: "10px",
        backgroundColor: "lightblue",
      }}
    >
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
          {text}
        </Typography>
        <hr style={{ color: "lightgrey" }} />
        <Typography variant="h5" color="text.secondary" component="div">
          @{username}
        </Typography>
        <Typography variant="body2">
          <a target="__blank" href={url}>
            {url}
          </a>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Tweet;
