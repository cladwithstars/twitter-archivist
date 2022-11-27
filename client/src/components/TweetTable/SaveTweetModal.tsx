import React, { useState, useContext } from "react";
import axios from "axios";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { FolderContext } from "../../context/FolderContext";
import AuthContext from "../../context/auth/authContext";
import { TWEETS_PATH } from "../../shared/constants";

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

interface ModalProps {
  tweetId: string | null;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SaveTweetModal: React.FC<ModalProps> = ({ tweetId, open, setOpen }) => {
  const [folders, setFolders] = useContext(FolderContext);
  const authContext = useContext(AuthContext);
  const userId = authContext.user?._id;
  const [folderName, setFolderName] = useState("");
  const handleClose = () => setOpen(false);
  const handleFolderChange = (e) => setFolderName(e.target.value);
  const saveTweet = async () => {
    try {
      const { data } = await axios.post(TWEETS_PATH, {
        idOrUrl: tweetId,
        folder: folderName,
        isUrl: false,
        userId,
      });
      const folderToUpdate = folders.find(
        (folder) => folder.name === folderName && folder.userId === userId
      );
      const foldersTweets = folderToUpdate["tweets"];
      setFolders([
        { ...folderToUpdate, tweets: [data, ...foldersTweets] },
        ...folders.filter(
          (folder) => folder.name !== folderName || folder.userId !== userId
        ),
      ]);
    } catch {
      console.log("ERROR SAVING TWEET FROM MODAL");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveTweet();
    handleClose();
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Save Tweet
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
              id="demo-simple-select"
              value={folderName}
              select
              required
              disabled={!folders?.length}
              label="Select folder to save tweet to"
              onChange={handleFolderChange}
            >
              {folders.map(({ name, _id }) => (
                <MenuItem value={name} key={_id}>
                  {name}
                </MenuItem>
              ))}
            </TextField>
            <Button
              variant="contained"
              fullWidth
              type="submit"
              style={{ marginTop: "10px" }}
            >
              Save Tweet
            </Button>
          </FormControl>
        </form>
      </Box>
    </Modal>
  );
};

export default SaveTweetModal;
