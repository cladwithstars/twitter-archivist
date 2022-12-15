import { createContext } from "react";

interface ShortTweet {
  text: string;
  id: string;
}

export interface TweetsState {
  checked: boolean;
  tweets: Array<ShortTweet>;
  error: boolean;
  loading: false;
  searchString: "";
}

interface TweetsTableContext extends TweetsState {
  fetchUserTweets: (searchString: string) => Promise<void>;
  fetchLikedTweets: (searchString: string) => Promise<void>;
  setChecked: (val: boolean) => void;
  setSearchString: (val: string) => void;
}

const tweetTableContext = createContext({} as TweetsTableContext);

export default tweetTableContext;
