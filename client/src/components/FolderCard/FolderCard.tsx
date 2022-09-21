import React, { useState, useContext, useEffect } from "react";
import { FOLDERS_PATH } from "../../shared/constants";
import { FolderContext } from "../../context/FolderContext";
import { Card, CardContent, Typography, CardActions } from "@mui/material";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import FolderActions from "./FolderActions/FolderActions";
import { Link } from "react-router-dom";
import axios from "axios";

interface Props {
  folderName: string;
}

const regex = /^[ A-Za-z0-9_@.'/#&+-]*$/;

const FolderCard: React.FC<Props> = ({ folderName }) => {
  const [folders, setFolders] = useContext(FolderContext);
  const [rename, setRename] = useState(false);
  const [inputVal, setInputVal] = useState(folderName);
  const [error, setError] = useState(false);

  const updateContext = () => {
    const folderToUpdate = folders.find((folder) => folder.name === folderName);
    const otherFolders = folders.filter((folder) => folder.name !== folderName);
    setFolders([{ ...folderToUpdate, name: inputVal }, ...otherFolders]);
  };

  const renameFolder = async () => {
    if (!regex.test(inputVal) || inputVal.length > 40) {
      setInputVal(folderName);
      setError(true);
      return;
    }
    if (inputVal === folderName) {
      return;
    }
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

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(false);
      }, 6000);
    }
  }, [error]);

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
        <Link to={`/folder/${folderName}`}>
          <FolderOutlinedIcon />
        </Link>
        {rename ? (
          <input
            value={inputVal}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
        ) : (
          <Link to={`/folder/${folderName}`}>
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
        {error && (
          <Typography
            variant="h5"
            sx={{ fontSize: 16, color: "red" }}
            gutterBottom
          >
            {`Invalid folder name. Must be 40 characters or less and only contain
            letters, numbers, and valid special symbols _@./#'+-&`}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default FolderCard;
