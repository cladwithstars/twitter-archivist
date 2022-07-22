import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import "./styles.css";
import { Tweet } from "../../types";

interface Props {
  tweet: Tweet;
}

const TweetCard: React.FC<Props> = ({ tweet }) => {
  const { url, text, username, displayPhoto, datePosted, displayName } = tweet;
  return (
    <Card
      sx={{
        width: "80%",
        margin: "0 auto",
        marginBottom: "10px",
        // backgroundColor: "lightskyblue",
      }}
      className="tweet"
    >
      <CardContent>
        <Typography color="text.primary" className="name" component="span">
          {" "}
          {displayName || "No Display Name"}
        </Typography>
        <Typography color="text.secondary" className="handle" component="span">
          @{username}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
          {text}
        </Typography>
        <hr style={{ color: "lightgrey" }} />
        <Typography variant="body2">
          <a target="__blank" href={url}>
            {url}
          </a>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TweetCard;
