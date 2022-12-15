import React, { useState, useContext } from "react";
import { FOLDERS_PATH } from "../../../shared/constants";
import { FolderContext } from "../../../context/FolderContext";
import axios from "axios";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Menu, IconButton, Typography } from "@mui/material";

interface Props {
  folderName: string;
  folderId: string;
  rename: boolean;
  setRename: React.Dispatch<React.SetStateAction<boolean>>;
}

const FolderActions: React.FC<Props> = ({
  folderName,
  folderId,
  rename,
  setRename,
}) => {
  const [folders, setFolders] = useContext(FolderContext);
  const [anchorElOptions, setAnchorElOptions] = useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setAnchorElOptions(e.currentTarget);
  };

  const handleCloseUserMenu = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setAnchorElOptions(null);
  };

  const handleEdit = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setRename(true);
    setAnchorElOptions(null);
  };

  const deleteFolder = async () => {
    try {
      await axios.delete(`${FOLDERS_PATH}/${folderId}`);
      setFolders(folders.filter((folder) => folder._id !== folderId));
    } catch {
      console.error("delete folder failed");
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    deleteFolder();
  };

  return (
    <div>
      <IconButton size="small" onClick={handleOpenUserMenu}>
        <MoreHorizIcon />
      </IconButton>
      <Menu
        sx={{ mt: "20px" }}
        id="menu-appbar"
        anchorEl={anchorElOptions}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElOptions)}
        onClose={handleCloseUserMenu}
      >
        <Typography
          noWrap
          component="button"
          onClick={handleEdit}
          sx={{
            display: "flex",
            fontFamily: "monospace",
            fontWeight: 700,
            fontSize: 14,
            color: "blue",
            textDecoration: "none",
            backgroundColor: "transparent",
            cursor: "pointer",
            border: "none",
            margin: "0 auto",
          }}
        >
          Rename
        </Typography>
        <hr />
        <Typography
          noWrap
          component="button"
          onClick={handleDelete}
          sx={{
            display: "flex",
            fontFamily: "monospace",
            fontWeight: 700,
            fontSize: 14,
            color: "red",
            textDecoration: "none",
            backgroundColor: "transparent",
            cursor: "pointer",
            border: "none",
            margin: "0 auto",
          }}
        >
          Delete
        </Typography>
      </Menu>
    </div>
  );
};

export default FolderActions;
