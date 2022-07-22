import { TextField, Button } from "@mui/material";
import React from "react";
import "./styles.css";

const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
  };
  return (
    <form className="form" onSubmit={handleSubmit}>
      <TextField
        label="Email"
        id="email"
        type="text"
        sx={{ paddingBottom: 2 }}
      />
      <TextField label="Password" id="password" type="password" />
      <Button
        type="button"
        color="primary"
        sx={{ marginTop: 2 }}
        variant="contained"
      >
        Log in
      </Button>
    </form>
  );
};

export default Login;
