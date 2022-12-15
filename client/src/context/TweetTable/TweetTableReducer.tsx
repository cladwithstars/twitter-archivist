import {
  USER_TWEETS_FETCHED,
  LIKED_TWEETS_FETCHED,
  CHECKBOX_CLICKED,
  SEARCH_STRING_CHANGED,
  TWEETS_FETCH_ERROR,
} from "./constants";

import { TweetsState } from "./TweetTableContext";

interface Action {
  type: string;
  payload?: any;
}

const TweetTableReducer = (state: TweetsState, action: Action): TweetsState => {
  switch (action.type) {
    case USER_TWEETS_FETCHED:
      return {
        ...state,
        loading: false,
        error: false,
        tweets: action.payload,
      };
    case LIKED_TWEETS_FETCHED:
      return {
        ...state,
        loading: false,
        error: false,
        tweets: action.payload,
      };
    case TWEETS_FETCH_ERROR:
      return {
        ...state,
        tweets: [],
        error: true,
      };
    case CHECKBOX_CLICKED:
      return {
        ...state,
        checked: action.payload,
      };
    case SEARCH_STRING_CHANGED:
      return {
        ...state,
        searchString: action.payload,
        error: false,
      };
    default:
      return state;
  }
};

export default TweetTableReducer;
