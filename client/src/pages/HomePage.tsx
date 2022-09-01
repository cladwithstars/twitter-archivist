import React, { useContext, useEffect } from "react";
import SaveTweetForm from "../components/SaveTweetForm/SaveTweetForm";
import MyFolders from "../components/MyFolders/MyFolders";
import CreateFolder from "../components/CreateFolder/CreateFolder";
import { Container } from "@mui/material";
import AuthContext from "../context/auth/authContext";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const { isAuthenticated, loading, logout } = authContext;

  useEffect(() => {
    if (!isAuthenticated && !loading) {
      logout();
      navigate("/login");
    }
  }, [isAuthenticated, loading, navigate, logout]);

  return (
    <Container sx={{ width: "95%" }}>
      <SaveTweetForm />
      <CreateFolder />
      <MyFolders />
    </Container>
  );
};

export default HomePage;
