import React, { useReducer } from "react";

import axios from "axios";

import { TWEETS_PATH } from "../../shared/constants";
import {
  LIKED_TWEETS_FETCHED,
  USER_TWEETS_FETCHED,
  SEARCH_STRING_CHANGED,
  CHECKBOX_CLICKED,
  TWEETS_FETCH_ERROR,
} from "./constants";
import tweetTableContext from "./TweetTableContext";
import TweetTableReducer from "./TweetTableReducer";

import { TweetsState } from "./TweetTableContext";

const initialState: TweetsState = {
  checked: false,
  tweets: [],
  error: false,
  loading: false,
  searchString: "",
};

const TweetTableState = ({ children }) => {
  const [state, dispatch] = useReducer(TweetTableReducer, initialState);

  const fetchUserTweets = async (searchString: string) => {
    try {
      const { data } = await axios.get(`${TWEETS_PATH}/${searchString}/tweets`);
      dispatch({ type: USER_TWEETS_FETCHED, payload: data });
    } catch {
      dispatch({ type: TWEETS_FETCH_ERROR });
    }
  };

  const fetchLikedTweets = async (searchString: string) => {
    try {
      const { data } = await axios.get(
        `${TWEETS_PATH}/${searchString}/likedTweets`
      );
      dispatch({ type: LIKED_TWEETS_FETCHED, payload: data });
    } catch {
      dispatch({ type: TWEETS_FETCH_ERROR });
    }
  };

  const setChecked = (value: boolean) => {
    dispatch({ type: CHECKBOX_CLICKED, payload: value });
  };

  const setSearchString = (value: string) => {
    dispatch({ type: SEARCH_STRING_CHANGED, payload: value });
  };

  return (
    <tweetTableContext.Provider
      value={{
        checked: state.checked,
        tweets: state.tweets,
        loading: state.loading,
        error: state.error,
        searchString: state.searchString,
        fetchUserTweets,
        fetchLikedTweets,
        setChecked,
        setSearchString,
      }}
    >
      {children}
    </tweetTableContext.Provider>
  );
};

export default TweetTableState;
