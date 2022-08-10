import React, { useState, useContext } from "react";
import { FOLDERS_PATH } from "../../../shared/constants";
import { FolderContext } from "../../../context/FolderContext";
import axios from "axios";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Typography, Menu, IconButton } from "@mui/material";
import EditModal from "./EditModal";

interface Props {
  folderName: string;
}

const FolderActions: React.FC<Props> = ({ folderName }) => {
  const [folders, setFolders] = useContext(FolderContext);
  const [editModalOpen, setEditModalOpen] = useState(false);
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
    setEditModalOpen(true);
  };
  const updateContext = () => {
    const updatedFolders = folders.filter(
      (folder) => folder.name !== folderName
    );
    setFolders(updatedFolders);
  };
  const deleteFolder = async () => {
    try {
      await axios.delete(`${FOLDERS_PATH}/${folderName}`);
      updateContext();
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
      {editModalOpen && (
        <EditModal open={editModalOpen} setOpen={setEditModalOpen} />
      )}
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
