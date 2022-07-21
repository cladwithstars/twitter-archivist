import React, { useContext } from "react";
import "./App.css";
import HomePage from "./pages/HomePage";
import Folder from "./components/Folder";
import { FolderContext } from "./context/FolderContext";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

function App() {
  const [folders] = useContext(FolderContext);
  return (
    <BrowserRouter>
      <div className="App">
        <Link to="/">
          <h1>Super Twitter Bookmarks</h1>
        </Link>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {folders.map(({ name }) => (
            <Route
              key={name}
              path="folder/:name"
              element={<Folder name={name} />}
            />
          ))}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
