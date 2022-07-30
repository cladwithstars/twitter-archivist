import { TextField, Button, Typography } from "@mui/material";
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
  const [loginError, setLoginError] = useState(false);

  useEffect(() => {
    console.log("error is: ", error);
    if (isAuthenticated) {
      navigate("/");
    }
    if (error) {
      setLoginError(true);
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
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={{ paddingBottom: 2 }}
        inputProps={{ maxLength: 40 }}
        error={loginError}
        helperText={loginError && "Invalid credentials"}
      />
      <TextField
        label="Password"
        id="password"
        type="password"
        required
        value={password}
        inputProps={{ maxLength: 40 }}
        error={loginError}
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
      <p>
        Don't have an account?{" "}
        <Typography
          variant="h6"
          noWrap
          component="button"
          onClick={() => navigate("/register")}
          sx={{
            display: "flex",
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "purple",
            textDecoration: "none",
            backgroundColor: "transparent",
            cursor: "pointer",
            border: "none",
            margin: "0 auto",
          }}
        >
          Register
        </Typography>
      </p>
    </form>
  );
};

export default Login;
