import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import AuthState from "./context/auth/AuthState";
import { FolderProvider } from "./context/FolderContext";
import setAuthToken from "./utils/setAuthToken";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
root.render(
  <React.StrictMode>
    <AuthState>
      <FolderProvider>
        <App />
      </FolderProvider>
    </AuthState>
  </React.StrictMode>
);
