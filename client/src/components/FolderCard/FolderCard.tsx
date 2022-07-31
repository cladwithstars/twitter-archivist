import React from "react";
import { Card, CardContent, Typography, CardActions } from "@mui/material";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import FolderActions from "./FolderActions/FolderActions";

interface Props {
  folderName: string;
}

const FolderCard: React.FC<Props> = ({ folderName }) => {
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
        <FolderActions folderName={folderName} />
      </CardActions>
      <CardContent>
        <FolderOutlinedIcon />
        <Typography
          variant="h5"
          sx={{ fontSize: 16 }}
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
