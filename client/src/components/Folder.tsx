import React, { useContext } from "react";
import { useParams } from "react-router-dom";
// import { TweetList } from "./TweetList";
import { FolderContext } from "../context/FolderContext";
import Tweet from "./Tweet";

const Folder = ({ name }) => {
  const params = useParams();
  const folderName = params.name;
  const [folders, setFolders] = useContext(FolderContext);
  const folder = folders.find((folder) => folder.name === folderName);
  const tweets = folder["tweets"];
  console.log("folder: ", folder);

  console.log("tweets: ", tweets);

  return (
    <div>
      <h2>{params.folder}</h2>
      {tweets.map(({ text, url, username }) => (
        <Tweet text={text} url={url} username={username} />
      ))}
    </div>
  );
};

export default Folder;
