import React, { useEffect, useContext } from "react";

import {
  TextField,
  Typography,
  Button,
  FormControl,
  FormControlLabel,
  Container,
  Checkbox,
} from "@mui/material";
import TweetTable from "../components/TweetTable/TweetTable";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/auth/authContext";
import tweetTableContext from "../context/TweetTable/TweetTableContext";

const LikesPage = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const { isAuthenticated, loading } = authContext;
  const {
    tweets,
    searchString,
    checked,
    error,
    setChecked,
    setSearchString,
    fetchLikedTweets,
    fetchUserTweets,
  } = useContext(tweetTableContext);

  useEffect(() => {
    if (!isAuthenticated && !loading) {
      navigate("/login");
    }
  }, [isAuthenticated, loading, navigate]);

  const handleCheckBoxClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(!checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchString !== "") {
      checked ? fetchUserTweets(searchString) : fetchLikedTweets(searchString);
    }
  };

  return (
    <Container sx={{ width: "95%" }}>
      <Typography sx={{ marginTop: "30px" }}>
        On this page you can enter a Twitter username (likely your own) and we
        will display the recently (up to 100) liked tweets of that user. There
        is also the option to search a user's timeline instead. This can make it
        easier to get tweets into your bookmark folders, as you don't have to
        copy and paste urls or tweet ids. After fetching tweets, expand the
        table row for the tweet details, and click the bookmark icon to save the
        tweet corresponding to that row to one of your folders.
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
              setSearchString(e.target.value);
            }}
          />

          <FormControlLabel
            control={
              <Checkbox checked={checked} onChange={handleCheckBoxClick} />
            }
            label="Search User's Timeline (instead of likes)"
          />

          <Button
            type="submit"
            variant="contained"
            sx={{ marginTop: "10px" }}
            disabled={!searchString}
          >
            Submit
          </Button>
        </FormControl>
      </form>
      {error && (
        <p style={{ color: "red" }}>
          {"Could not fetch tweets. Make sure your query string is correct."}
        </p>
      )}
      {tweets && tweets.length > 0 && <TweetTable tweets={tweets} />}
    </Container>
  );
};

export default LikesPage;
