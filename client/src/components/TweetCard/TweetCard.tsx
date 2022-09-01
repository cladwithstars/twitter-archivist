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
  const folderName = params.name;
  const ourFolder = folders.find((folder) => folder.name === params.name);
  const folderId = folderName ? ourFolder._id : null;
  const { url, text, username, displayPhoto, datePosted, displayName, _id } =
    tweet;

  const deleteTweet = async () => {
    try {
      await axios.delete(`${TWEETS_PATH}/${folderName}/${_id}`);

      if (folderName && folderId) {
        const folderToUpdate = {
          ...ourFolder,
          tweets: ourFolder.tweets.filter((tweet) => tweet._id !== _id),
        };

        setFolders([
          folderToUpdate,
          ...folders.filter((folder) => folder._id !== folderId),
        ]);
      }
    } catch {
      console.error("could not delete folder");
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
      </CardContent>
    </Card>
  );
};

export default TweetCard;
