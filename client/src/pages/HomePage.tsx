import React from "react";
import SaveTweetForm from "../components/SaveTweetForm/SaveTweetForm";
import MyFolders from "../components/MyFolders/MyFolders";
import CreateFolder from "../components/CreateFolder/CreateFolder";
import { Container } from "@mui/material";

const HomePage = () => {
  return (
    <Container sx={{ width: "95%" }}>
      <SaveTweetForm />
      <CreateFolder />
      <MyFolders />
    </Container>
  );
};

export default HomePage;
