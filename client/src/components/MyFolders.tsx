import React, { useContext } from "react";
import { FolderContext } from "../context/FolderContext";
import { Link } from "react-router-dom";
import FolderCard from "./FolderCard";
import { Grid } from "@mui/material";

const MyFolders = () => {
  const [folders] = useContext(FolderContext);
  return (
    <Grid container sx={{ justifyContent: "center" }}>
      {folders?.length &&
        folders.map(({ name }) => (
          <Grid item sx={{ width: "20%", minWidth: "250px" }}>
            <Link to={`/folder/${name}`}>
              <FolderCard folderName={name} />
            </Link>
          </Grid>
        ))}
    </Grid>
  );
};

export default MyFolders;
