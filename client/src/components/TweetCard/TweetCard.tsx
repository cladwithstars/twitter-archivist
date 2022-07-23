import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import { useParams } from "react-router-dom";
import "./styles.css";
import { DELETE_TWEET_PATH } from "../../shared/constants";
import axios from "axios";
import { Tweet } from "../../types";

interface Props {
  tweet: Tweet;
}

const TweetCard: React.FC<Props> = ({ tweet }) => {
  console.log("tweet is: ", tweet);
  const params = useParams();
  const folderName = params.name;
  const { url, text, username, displayPhoto, datePosted, displayName, _id } =
    tweet;

  const deleteTweet = async () => {
    const path = `${DELETE_TWEET_PATH}/${folderName}/${_id}`;
    console.log("path: ", path);
    await axios.delete(path);
  };
  const handleDelete = (e) => {
    deleteTweet();
  };
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
      <CardActions>
        <Button size="small" onClick={handleDelete}>
          Delete
        </Button>
      </CardActions>
      <CardContent>
        <Typography color="text.primary" className="name" component="span">
          {" "}
          {displayName || ""}
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
