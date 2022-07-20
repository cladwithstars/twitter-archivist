import React from "react";
import { Grid } from "@mui/material";
import SaveTweetForm from "../components/SaveTweetForm";
import MyFolders from "../components/MyFolders";
import CreateFolder from "../components/CreateFolder/CreateFolder";

const HomePage = () => {
  return (
    <Grid container direction="column">
      <Grid item>
        <SaveTweetForm />
      </Grid>
      <Grid item>
        <MyFolders />
      </Grid>
      <Grid item>
        <CreateFolder />
      </Grid>
    </Grid>
  );
};

export default HomePage;
