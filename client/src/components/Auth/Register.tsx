import { TextField, Button } from "@mui/material";
import React from "react";

const Register = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
  };
  return (
    <form className="form" onSubmit={handleSubmit}>
      <TextField label="Email" id="email" type="text" />
      <TextField label="Password" id="password" type="password" />
      <Button type="button" color="primary" className="form__custom-button">
        Register
      </Button>
    </form>
  );
};

export default Register;
