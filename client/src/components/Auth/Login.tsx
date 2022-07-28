import { TextField, Button } from "@mui/material";
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import AuthContext from "../../context/auth/authContext";

const Login = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const { login, error, clearErrors, isAuthenticated } = authContext;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
    if (error === "Invalid Credentials") {
      clearErrors();
    }
  }, [error, isAuthenticated, clearErrors, navigate]);
  const handleSubmit = (e) => {
    e.preventDefault();
    login({
      email,
      password,
    });
  };
  return (
    <form className="form" onSubmit={handleSubmit}>
      <TextField
        label="Email"
        id="email"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={{ paddingBottom: 2 }}
      />
      <TextField
        label="Password"
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        type="submit"
        color="primary"
        sx={{ marginTop: 2 }}
        variant="contained"
      >
        Log in
      </Button>
      <Button
        type="button"
        color="primary"
        sx={{ marginTop: 2 }}
        variant="contained"
        onClick={(e) => navigate("/register")}
      >
        Register
      </Button>
    </form>
  );
};

export default Login;
