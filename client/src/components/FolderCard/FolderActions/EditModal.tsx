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
  border: `2px solid black `,
  boxShadow: 24,
  p: 4,
};

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditModal: React.FC<Props> = ({ open, setOpen }) => {
  const [folderName, setFolderName] = useState("");

  const handleSubmit = () => {};
  const handleInputChange = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setFolderName(e.target.value);
  };
  const handleClose = () => setOpen(false);
  return (
    <Modal
      // disableBackdropClick
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Rename Folder
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
              label="Enter new name"
              variant="outlined"
              required
              value={folderName}
              fullWidth
              sx={{ paddingBottom: 2 }}
              //   error={folderAlreadyExists}
              //   helperText={
              //     folderAlreadyExists &&
              //     "Folder by that name already exists, use a different name"
              //   }
              onChange={handleInputChange}
            />
            <Button
              variant="contained"
              fullWidth
              disabled={!folderName}
              type="submit"
            >
              Save
            </Button>
          </FormControl>
        </form>
      </Box>
    </Modal>
  );
};

export default EditModal;
