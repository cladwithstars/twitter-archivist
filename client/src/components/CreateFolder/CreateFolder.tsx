import React, { useState, useContext } from "react";
import {
  Modal,
  Button,
  Box,
  Typography,
  FormControl,
  TextField,
} from "@mui/material";

import { FolderContext } from "../../context/FolderContext";

import { FOLDERS_PATH } from "../../shared/constants";

import AuthContext from "../../context/auth/authContext";

import axios from "axios";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: `2px solid black`,
  boxShadow: 24,
  p: 4,
};

const CreateFolder = () => {
  const authContext = useContext(AuthContext);
  const [folders, setFolders] = useContext(FolderContext);
  const folderNames = folders.map((folder) => folder.name);
  const [folderAlreadyExists, setFolderAlreadyExists] = useState(false);
  const [open, setOpen] = useState(false);
  const [folderName, setFolderName] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const createFolder = async () => {
    try {
      const { data } = await axios.post(FOLDERS_PATH, {
        name: folderName,
        userId: authContext.user?._id,
      });
      setFolders([data, ...folders]);
      setOpen(false);
      setFolderName("");
    } catch {
      console.error("couldnt create folder");
    }
  };

  const handleInputChange = (e) => {
    if (folderAlreadyExists) {
      // clear error when user starts typing again
      setFolderAlreadyExists(false);
    }
    setFolderName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (folderNames.includes(folderName)) {
      setFolderAlreadyExists(true);
      return;
    }
    createFolder();
  };
  return (
    <>
      <Button
        onClick={handleOpen}
        variant="contained"
        fullWidth
        sx={{ marginBottom: 2 }}
      >
        Create Folder
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create Folder
          </Typography>
          <form onSubmit={handleSubmit}>
            <FormControl
              sx={{
                padding: 2,
                paddingLeft: 0,
                borderRadius: 2,
                width: "100%",
              }}
            >
              <TextField
                label="Enter name of new folder"
                variant="outlined"
                required
                value={folderName}
                fullWidth
                sx={{ paddingBottom: 2 }}
                error={folderAlreadyExists}
                helperText={
                  folderAlreadyExists &&
                  "Folder by that name already exists, use a different name"
                }
                onChange={handleInputChange}
              />
              <Button
                variant="contained"
                fullWidth
                disabled={!folderName}
                type="submit"
              >
                Make Folder
              </Button>
            </FormControl>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default CreateFolder;
