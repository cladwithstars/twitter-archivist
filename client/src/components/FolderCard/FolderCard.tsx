import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import { DELETE_FOLDER_PATH } from "../../shared/constants";
import axios from "axios";
import FolderIcon from "@mui/icons-material/Folder";

interface Props {
  folderName: string;
}

const FolderCard: React.FC<Props> = ({ folderName }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`${DELETE_FOLDER_PATH}/${folderName}`);
    } catch {
      console.error("delete folder failed");
    }
  };
  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleDelete();
  };
  return (
    <Card
      sx={{
        width: "80%",
        margin: "0 auto",
        marginBottom: "10px",
        backgroundColor: "lightblue",
      }}
    >
      <CardActions>
        <Button size="small" onClick={handleClick}>
          Delete
        </Button>
      </CardActions>
      <CardContent>
        <FolderIcon sx={{ color: "palegoldenrod" }} />
        <Typography
          variant="h5"
          sx={{ fontSize: 14 }}
          color="text.primary"
          gutterBottom
        >
          {folderName}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default FolderCard;
