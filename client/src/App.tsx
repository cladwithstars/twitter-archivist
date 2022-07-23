import React, { useContext } from "react";
import "./App.css";
import HomePage from "./pages/HomePage";
import FolderPage from "./pages/FolderPage";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Auth/Login";
import { FolderContext } from "./context/FolderContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const [folders] = useContext(FolderContext);
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          {folders.map(({ name }) => (
            <Route key={name} path="folder/:name" element={<FolderPage />} />
          ))}
        </Routes>
        <Login />
      </div>
    </BrowserRouter>
  );
}

export default App;
