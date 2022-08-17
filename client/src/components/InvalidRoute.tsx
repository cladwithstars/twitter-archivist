import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/auth/authContext";

const InvalidRoute = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const { isAuthenticated } = authContext;
  const handleClick = () => {
    if (isAuthenticated) {
      navigate("/");
    }
    navigate("/login");
  };
  return (
    <div style={{ marginTop: "10px" }}>
      Invalid Route. <button onClick={handleClick}>Return Home </button>
    </div>
  );
};

export default InvalidRoute;
