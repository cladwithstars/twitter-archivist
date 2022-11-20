import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FolderContext } from "../context/FolderContext";
import TweetCard from "../components/TweetCard/TweetCard";
import { Grid } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { Folder, Tweet } from "../shared/types";
import { Link } from "react-router-dom";
import AuthContext from "../context/auth/authContext";

const FolderPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const folderId = params._id;
  const [folders] = useContext(FolderContext);
  const folder = folders.find((f: Folder) => f._id === folderId);
  const tweets: Array<Tweet> = folder["tweets"];
  const { isAuthenticated, loading } = authContext;

  useEffect(() => {
    if (!isAuthenticated && !loading) {
      navigate("/login");
    }
  }, [isAuthenticated, loading, navigate]);

  return (
    <div>
      <h2>
        <Link to="/" style={{ textDecoration: "none", color: "#1976d2" }}>
          <ArrowBackIcon />
        </Link>
        {"  "} {folder.name}
      </h2>
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
