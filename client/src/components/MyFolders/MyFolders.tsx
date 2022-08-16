import React, { useContext } from "react";
import { FolderContext } from "../../context/FolderContext";
import FolderCard from "../FolderCard/FolderCard";
import { Grid } from "@mui/material";

const MyFolders = () => {
  const [folders] = useContext(FolderContext);
  if (!folders?.length) {
    return <p>Your folders will appear here when you have created some</p>;
  }

  return (
    <Grid container sx={{ justifyContent: "center" }}>
      {folders.map(({ name, _id }) => (
        <Grid item sx={{ width: "20%", minWidth: "250px" }} key={_id}>
          <FolderCard folderName={name} />
        </Grid>
      ))}
    </Grid>
  );
};

export default MyFolders;
