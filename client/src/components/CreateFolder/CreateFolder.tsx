import React, { useState } from "react";
import {
  Modal,
  Button,
  Box,
  Typography,
  FormControl,
  TextField,
} from "@mui/material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const CreateFolder = () => {
  const [open, setOpen] = useState(false);
  const [folderName, setFolderName] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };
  return (
    <>
      <Button onClick={handleOpen}>Create Folder</Button>
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
              fullWidth
              sx={{
                padding: 2,
                borderRadius: 2,
                borderColor: "primary.main",
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
