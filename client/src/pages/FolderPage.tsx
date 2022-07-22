import React, { useContext } from "react";
import { useParams } from "react-router-dom";
// import { TweetList } from "./TweetList";
import { FolderContext } from "../context/FolderContext";
import Tweet from "../components/Tweet";
import { Grid } from "@mui/material";

const FolderPage = () => {
  const params = useParams();
  const folderName = params.name;
  const [folders] = useContext(FolderContext);
  const folder = folders.find((folder) => folder.name === folderName);
  const tweets = folder["tweets"];

  return (
    <div>
      <h2>{params.folder}</h2>
      <Grid container>
        {tweets.map(({ text, url, username }) => (
          <Grid item key={url} sx={{ minWidth: "300px" }}>
            <Tweet text={text} url={url} username={username} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default FolderPage;
