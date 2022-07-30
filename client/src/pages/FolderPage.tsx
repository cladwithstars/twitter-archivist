import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { FolderContext } from "../context/FolderContext";
import TweetCard from "../components/TweetCard/TweetCard";
import { Grid } from "@mui/material";

import { Folder, Tweet } from "../shared/types";

const FolderPage = () => {
  const params = useParams();
  const folderName = params.name;
  const [folders] = useContext(FolderContext);
  const folder = folders.find((f: Folder) => f.name === folderName);
  const tweets: Array<Tweet> = folder["tweets"];

  return (
    <div>
      <h2>{params.folder}</h2>
      {tweets?.length ? (
        <Grid container sx={{ margin: "0 auto", width: "80%" }}>
          {tweets.map((tweet) => (
            <Grid item key={tweet._id || tweet.url} sx={{ minWidth: "300px" }}>
              <TweetCard tweet={tweet} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <p>No tweets saved to this folder yet...</p>
      )}
    </div>
  );
};

export default FolderPage;
