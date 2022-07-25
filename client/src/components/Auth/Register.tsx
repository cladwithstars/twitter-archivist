import React, { useContext, useState } from "react";
import { TextField, Button } from "@mui/material";
import AuthContext from "../../context/auth/authContext";
import "./styles.css";

const Register = () => {
  const authContext = useContext(AuthContext);
  const { register, error, clearErrors, isAuthenticated } = authContext;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("register called");
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
