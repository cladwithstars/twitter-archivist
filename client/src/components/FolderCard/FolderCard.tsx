import React, { useState, useContext, useEffect, useRef } from "react";
import { FOLDERS_PATH } from "../../shared/constants";
import { FolderContext } from "../../context/FolderContext";
import { Card, CardContent, Typography, CardActions } from "@mui/material";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import FolderActions from "./FolderActions/FolderActions";
import { Link } from "react-router-dom";
import axios from "axios";

interface Props {
  folderName: string;
  folderId: any;
}

const regex = /^[ A-Za-z0-9_@.'/#&+-]*$/;

const FolderCard: React.FC<Props> = ({ folderName, folderId }) => {
  const [folders, setFolders] = useContext(FolderContext);
  const inputRef = useRef<any>(null);
  const folderNames = folders.map((folder) => folder.name);
  const [rename, setRename] = useState(false);
  const [inputVal, setInputVal] = useState(folderName);
  const [error, setError] = useState(false);
  const [folderAlreadyExists, setFolderAlreadyExists] = useState(false);
  const [emptyNameError, setEmptyNameError] = useState(false);

  const updateContext = () => {
    const folderToUpdate = folders.find((folder) => folder._id === folderId);
    const otherFolders = folders.filter((folder) => folder._id !== folderId);
    setFolders([{ ...folderToUpdate, name: inputVal }, ...otherFolders]);
  };

  useEffect(() => {
    if (rename) {
      inputRef.current.focus();
    }
  }, [rename]);

  const renameFolder = async () => {
    if (inputVal === folderName) {
      return;
    }
    const trimmed = inputVal.trim();
    if (trimmed === "") {
      setInputVal(folderName);
      setEmptyNameError(true);
      return;
    }
    if (!regex.test(trimmed) || trimmed.length > 25 || trimmed.length === 0) {
      setInputVal(folderName);
      setError(true);
      return;
    }
    if (folderNames.includes(trimmed)) {
      setInputVal(folderName);
      setFolderAlreadyExists(true);
      return;
    }

    try {
      await axios.put(`${FOLDERS_PATH}/${folderId}`, { newName: trimmed });
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
    } else if (folderAlreadyExists) {
      setTimeout(() => {
        setFolderAlreadyExists(false);
      }, 4000);
    } else if (emptyNameError) {
      setTimeout(() => {
        setEmptyNameError(false);
      }, 4000);
    }
  }, [error, folderAlreadyExists, emptyNameError]);

  return (
    <Card
      sx={{
        margin: "0 auto",
        marginBottom: "10px",
        backgroundColor: "palegoldenrod",
      }}
    >
      <CardActions>
        <FolderActions
          folderName={folderName}
          folderId={folderId}
          rename={rename}
          setRename={setRename}
        />
      </CardActions>
      <CardContent>
        <Link
          to={`/folder/${folderId}`}
          style={{ textDecoration: "none", color: "#1976d2" }}
        >
          <FolderOutlinedIcon />
        </Link>
        {rename ? (
          <input
            maxLength={25}
            ref={inputRef}
            value={inputVal}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
        ) : (
          <Link
            to={`/folder/${folderId}`}
            style={{ textDecoration: "none", color: "#1976d2" }}
          >
            <Typography
              variant="h5"
              sx={{ fontSize: 12, fontWeight: "bold" }}
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
            {`Invalid folder name. Must be between 1 and 25 characters and only contain
            letters, numbers, and valid special symbols (_@./#'+-&)`}
          </Typography>
        )}
        {folderAlreadyExists && (
          <Typography
            variant="h5"
            sx={{ fontSize: 16, color: "red" }}
            gutterBottom
          >
            Folder by that name already exists
          </Typography>
        )}
        {emptyNameError && (
          <Typography
            variant="h5"
            sx={{ fontSize: 16, color: "red" }}
            gutterBottom
          >
            Folder name must include one non-whitespace character
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default FolderCard;
