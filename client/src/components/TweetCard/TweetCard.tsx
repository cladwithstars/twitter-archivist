import React, { useContext } from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  CardActions,
} from "@mui/material";
import { useParams } from "react-router-dom";
import "./styles.css";
import { FolderContext } from "../../context/FolderContext";
import { TWEETS_PATH } from "../../shared/constants";
import axios from "axios";
import { Tweet } from "../../shared/types";
import DeleteIcon from "@mui/icons-material/Delete";

interface Props {
  tweet: Tweet;
}

const TweetCard: React.FC<Props> = ({ tweet }) => {
  const [folders, setFolders] = useContext(FolderContext);
  const params = useParams();
  const folderId = params._id;
  const ourFolder = folders.find((folder) => folder._id === folderId);
  const { url, text, username, datePosted, displayName, _id } = tweet;
  const tweetId = _id;

  const date = datePosted ? new Date(datePosted).toLocaleDateString() : "";

  const deleteTweet = async () => {
    try {
      await axios.delete(`${TWEETS_PATH}/${folderId}/${tweetId}`);

      const updatedFolder = {
        ...ourFolder,
        tweets: ourFolder.tweets.filter((tweet) => tweet._id !== _id),
      };

      setFolders([
        updatedFolder,
        ...folders.filter((folder) => folder._id !== folderId),
      ]);
    } catch {
      console.error("could not delete tweet");
    }
  };

  const handleDelete = () => {
    deleteTweet();
  };
  return (
    <Card
      sx={{
        margin: "0 auto",
        marginBottom: "10px",
        // maxWidth: "350px",
      }}
      className="tweet"
    >
      <CardActions>
        <IconButton sx={{ color: "red" }} onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
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
        <Typography>{date}</Typography>
      </CardContent>
    </Card>
  );
};

export default TweetCard;
