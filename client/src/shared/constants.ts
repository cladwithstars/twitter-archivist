export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://super-twitmarks.herokuapp.com"
    : "http://localhost:5500";

export const CREATE_FOLDER_PATH = `${BASE_URL}/api/folders/createFolder`;
export const GET_FOLDERS_PATH = `${BASE_URL}/api/folders/getFolders`;

export const SAVE_TWEET_PATH = `${BASE_URL}/api/tweets/saveTweet`;

export const COLOURS = {
  primary: "#7067CF",
  secondary: "#CBF3D2",
  darkPurple: "#7B287D",
  darkestPurple: "#330C2F",
  lavender: "#B7C0EE",
};
