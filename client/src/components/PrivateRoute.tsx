import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/auth/authContext";
import InvalidRoute from "./InvalidRoute";

function PrivateRoute({ children }) {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, loading } = authContext;

  if (loading) {
    return <InvalidRoute />;
  }

  if (!isAuthenticated && !loading) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default PrivateRoute;
