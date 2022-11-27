import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { TWEETS_PATH } from "../shared/constants";
import {
  TextField,
  Typography,
  Button,
  FormControl,
  Container,
} from "@mui/material";
import TweetTable from "../components/TweetTable/TweetTable";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/auth/authContext";

interface ShortTweet {
  text: string;
  id: string;
}

const LikesPage = () => {
  const [likedTweets, setLikedTweets] = useState<ShortTweet[] | null>(null);
  const [searchString, setSearchString] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const authContext = useContext(AuthContext);
  const { isAuthenticated, loading } = authContext;

  useEffect(() => {
    if (!isAuthenticated && !loading) {
      navigate("/login");
    }
  }, [isAuthenticated, loading, navigate]);

  const fetchTweets = async () => {
    try {
      const { data } = await axios.get(`${TWEETS_PATH}/${searchString}`);
      setLikedTweets(data);
    } catch {
      setError(
        "Could not fetch likes. Make sure the username you typed is valid."
      );
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchString !== "") {
      fetchTweets();
    }
  };
  return (
    <Container sx={{ width: "95%" }}>
      <Typography sx={{ marginTop: "30px" }}>
        On this page you can enter a Twitter username (likely your own) and we
        will display the recently liked tweets of that user. This makes it
        easier to get tweets into your bookmark folders, as you don't have to
        worry about copying and pasting urls or tweet ids. If you recently liked
        a tweet on the Twitter app or website, and want to add it to a folder,
        this page is for your convenience. Expand the table row for the tweet
        details, and click the bookmark icon to open a modal to save the tweet
        corresponding to that row to one of your folders.
      </Typography>
      <form onSubmit={handleSubmit}>
        <FormControl
          sx={{
            paddingTop: 2,
            paddingBottom: 2,
            margin: "0 auto",
          }}
          fullWidth
        >
          <TextField
            label="Username"
            variant="outlined"
            value={searchString}
            inputProps={{ maxLength: 15 }}
            fullWidth
            sx={{ paddingBottom: 2 }}
            onChange={(e) => {
              if (error) {
                setError(null);
              }
              setSearchString(e.target.value);
            }}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ marginTop: "10px" }}
            disabled={!searchString}
          >
            Search User Likes
          </Button>
        </FormControl>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {likedTweets && <TweetTable tweets={likedTweets} />}
    </Container>
  );
};

export default LikesPage;
