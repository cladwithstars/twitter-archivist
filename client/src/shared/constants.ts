export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://twit-archivist.herokuapp.com"
    : `http://localhost:5000`;

// export const BASE_URL = "https://super-twitmarks.herokuapp.com";

export const FOLDERS_PATH = `${BASE_URL}/api/folders`;

export const TWEETS_PATH = `${BASE_URL}/api/tweets`;

export const USERS_PATH = `${BASE_URL}/api/users`;

export const AUTH_PATH = `${BASE_URL}/api/auth`;
