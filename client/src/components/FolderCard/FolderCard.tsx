import React, { useState, useContext } from "react";
import { FOLDERS_PATH } from "../../shared/constants";
import { FolderContext } from "../../context/FolderContext";
import { Card, CardContent, Typography, CardActions } from "@mui/material";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import FolderActions from "./FolderActions/FolderActions";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../shared/constants";

interface Props {
  folderName: string;
}

const FolderCard: React.FC<Props> = ({ folderName }) => {
  const [folders, setFolders] = useContext(FolderContext);
  const [rename, setRename] = useState(false);
  const [inputVal, setInputVal] = useState(folderName);

  const updateContext = () => {
    const folderToUpdate = folders.find((folder) => folder.name === folderName);
    const otherFolders = folders.filter((folder) => folder.name !== folderName);
    setFolders([{ ...folderToUpdate, name: inputVal }, ...otherFolders]);
  };

  const renameFolder = async () => {
    try {
      await axios.put(`${FOLDERS_PATH}/${folderName}`, { newName: inputVal });
      updateContext();
    } catch {
      console.error("rename folder failed");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      renameFolder();
      setRename(false);
    }
  };

  const handleInputChange = (e) => {
    setInputVal(e.target.value);
  };

  return (
    <Card
      sx={{
        width: "80%",
        margin: "0 auto",
        marginBottom: "10px",
        backgroundColor: "palegoldenrod",
      }}
    >
      <CardActions>
        <FolderActions
          folderName={folderName}
          rename={rename}
          setRename={setRename}
        />
      </CardActions>
      <CardContent>
        <Link to={`${BASE_URL}/folder/${folderName}`}>
          <FolderOutlinedIcon />
        </Link>
        {rename ? (
          <input
            value={inputVal}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
        ) : (
          <Link to={`${BASE_URL}/folder/${folderName}`}>
            <Typography
              variant="h5"
              sx={{ fontSize: 16 }}
              color="text.primary"
              gutterBottom
            >
              {folderName}
            </Typography>
          </Link>
        )}
      </CardContent>
    </Card>
  );
};

export default FolderCard;
