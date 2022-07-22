import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";

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
        backgroundColor: "lightblue",
      }}
    >
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
        {/* <hr style={{ color: "lightgrey" }} />
        <Typography variant="h5" color="text.secondary" component="div">
          @{username}
        </Typography>
        <Typography variant="body2">
          <a target="__blank" href={url}>
            {url}
          </a>
        </Typography> */}
      </CardContent>
    </Card>
  );
};

export default FolderCard;
