import React, { useContext, useEffect } from "react";
import "./App.css";
import HomePage from "./pages/HomePage";
import FolderPage from "./pages/FolderPage";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import { FolderContext } from "./context/FolderContext";
import AuthContext from "./context/auth/authContext";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

function App() {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, loading } = authContext;
  const [folders] = useContext(FolderContext);

  useEffect(() => {
    if (localStorage.token && !authContext.isAuthenticated) {
      authContext.loadUser();
    }
  }, [authContext]);

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              !isAuthenticated && !loading ? (
                <Navigate to="/login" />
              ) : (
                <HomePage />
              )
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          {folders.map(({ name, _id }) => (
            <Route key={_id} path={`/folder/:name`} element={<FolderPage />} />
          ))}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
