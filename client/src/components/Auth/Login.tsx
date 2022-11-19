import { TextField, Button, Typography, CircularProgress } from "@mui/material";
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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("loading: ", loading);
  }, [loading]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
    if (error) {
      setLoginError(true);
      clearErrors();
    }
  }, [error, isAuthenticated, clearErrors, navigate]);

  const Login = async () => {
    try {
      await login({
        email,
        password,
      });
    } catch {
      setLoginError(true);
    }

    setLoading(false);

    console.log("loading 2: ", loading);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("LOADING: ", loading);
    Login();
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

      {loading ? (
        <CircularProgress sx={{ margin: "0 auto", marginTop: "10px" }} />
      ) : (
        <Button
          type="submit"
          color="primary"
          sx={{ marginTop: 2 }}
          disabled={loading}
          variant="contained"
        >
          Log in
        </Button>
      )}
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
