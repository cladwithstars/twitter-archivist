import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FolderContext } from "../context/FolderContext";
import TweetCard from "../components/TweetCard/TweetCard";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Folder, Tweet } from "../shared/types";
import AuthContext from "../context/auth/authContext";

const FolderPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const folderName = params.name;
  const [folders] = useContext(FolderContext);
  const folder = folders.find((f: Folder) => f.name === folderName);
  const tweets: Array<Tweet> = folder["tweets"];
  const { isAuthenticated, loading } = authContext;

  useEffect(() => {
    console.log("auth: ", isAuthenticated);
    console.log("loading: ", loading);
    if (!isAuthenticated && !loading) {
      navigate("/login");
    }
  }, [isAuthenticated, loading, navigate]);

  return (
    <div>
      <h2>{params.folder}</h2>
      {tweets?.length ? (
        <Grid container sx={{ margin: "0 auto", justifyContent: "center" }}>
          {tweets.map((tweet) => (
            <Grid
              item
              key={tweet._id || tweet.url}
              sx={{ minWidth: "300px", margin: "10px" }}
            >
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
