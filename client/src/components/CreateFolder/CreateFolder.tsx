import React, { useState } from "react";
import {
  Modal,
  Button,
  Box,
  Typography,
  FormControl,
  TextField,
} from "@mui/material";

import { CREATE_FOLDER_PATH, COLOURS } from "../../shared/constants";

import axios from "axios";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: `2px solid ${COLOURS.darkPurple} `,
  boxShadow: 24,
  p: 4,
};

const CreateFolder = () => {
  const [open, setOpen] = useState(false);
  const [folderName, setFolderName] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const createFolder = async () => {
    try {
      await axios.post(CREATE_FOLDER_PATH, { name: folderName });
      setOpen(false);
      setFolderName("");
    } catch {
      console.error("couldnt create folder");
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    createFolder();
  };
  return (
    <>
      <Button onClick={handleOpen} variant="contained" sx={{ width: "80%" }}>
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
                // borderColor: "primary.main",
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
                onChange={(e) => setFolderName(e.target.value)}
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
