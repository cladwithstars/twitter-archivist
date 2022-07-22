import React from "react";
import SaveTweetForm from "../components/SaveTweetForm";
import MyFolders from "../components/MyFolders";
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
