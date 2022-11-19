import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import FolderSpecialIcon from "@mui/icons-material/FolderSpecial";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";

const Navbar = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const { user, logout } = authContext;

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
    handleCloseUserMenu();
  };

  const handleLogoClick = () => {
    if (!user) {
      navigate("/login");
    } else {
      navigate("/");
    }
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <HomeIcon
            onClick={handleLogoClick}
            sx={{ display: { xs: "flex", sm: "none" }, mr: 1 }}
          />
          <Typography
            variant="h6"
            noWrap
            component="button"
            onClick={handleLogoClick}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              backgroundColor: "transparent",
              cursor: "pointer",
              border: "none",
            }}
          >
            Super Twitmarks
          </Typography>

          <FolderSpecialIcon sx={{ display: { xs: "none", sm: "flex" } }} />
          <Typography
            variant="h5"
            noWrap
            component="button"
            onClick={handleLogoClick}
            sx={{
              mr: 2,
              display: { xs: "none", sm: "flex", md: "none" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              backgroundColor: "transparent",
              cursor: "pointer",
              border: "none",
              justifyContent: "center",
            }}
          >
            Super Twitmarks
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}></Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton
                onClick={handleOpenUserMenu}
                sx={{ p: 0, color: "white", fontSize: "16px" }}
              >
                {user?.email}
                {user && <SettingsIcon />}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <Typography
                variant="h6"
                noWrap
                component="button"
                onClick={handleLogout}
                sx={{
                  display: "flex",
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".1rem",
                  color: "purple",
                  textDecoration: "none",
                  backgroundColor: "transparent",
                  cursor: "pointer",
                  border: "none",
                  margin: "0 auto",
                  padding: "5px",
                }}
              >
                Logout
              </Typography>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
