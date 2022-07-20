import React from "react";
import SaveTweetForm from "../components/SaveTweetForm";
import MyFolders from "../components/MyFolders";
import CreateFolder from "../components/CreateFolder";

const HomePage = () => {
  return (
    <div>
      <SaveTweetForm />
      <MyFolders />
      <CreateFolder />
    </div>
  );
};

export default HomePage;
