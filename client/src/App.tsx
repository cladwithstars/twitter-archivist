import React, { useContext, useEffect } from "react";
import "./App.css";
import HomePage from "./pages/HomePage";
import FolderPage from "./pages/FolderPage";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Auth/Login";
import InvalidRoute from "./components/InvalidRoute";
import Register from "./components/Auth/Register";
import { FolderContext } from "./context/FolderContext";
import AuthContext from "./context/auth/authContext";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import BrowseLikes from "./pages/LikesPage";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, loading, loadUser } = authContext;
  const [folders] = useContext(FolderContext);

  useEffect(() => {
    if (localStorage.token && !isAuthenticated) {
      loadUser();
    }
  }, [loadUser, isAuthenticated]);

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
          <Route
            path="/likes"
            element={
              <PrivateRoute>
                <BrowseLikes />
              </PrivateRoute>
            }
          />
          {folders.map(({ name, _id }) => (
            <Route key={_id} path={`/folder/:_id`} element={<FolderPage />} />
          ))}
          <Route path="*" element={<InvalidRoute />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
