import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import AuthContext from "../../context/auth/authContext";
import "./styles.css";

const Register = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const { register, error, clearErrors, isAuthenticated } = authContext;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
    if (error === "User already exists") {
      clearErrors();
    }
  }, [error, isAuthenticated, clearErrors, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    register({ email, password });
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
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        type="submit"
        color="primary"
        variant="contained"
        value={password}
        sx={{ marginTop: 2 }}
      >
        Register
      </Button>
    </form>
  );
};

export default Register;
