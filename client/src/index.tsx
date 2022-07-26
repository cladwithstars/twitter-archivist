import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import AuthState from "./context/auth/AuthState";
import { FolderProvider } from "./context/FolderContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <FolderProvider>
      <AuthState>
        <App />
      </AuthState>
    </FolderProvider>
  </React.StrictMode>
);
