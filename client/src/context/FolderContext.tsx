import React, { useState, createContext, useEffect } from "react";
import axios from "axios";
import { GET_FOLDERS_PATH } from "../shared/constants";
import type { Folder } from "../types";

export const FolderContext = createContext([] as any);

export const FolderProvider = (props) => {
  const [folders, setFolders] = useState<Array<Folder>>([]);
  const getFolders = async () => {
    try {
      const { data } = await axios.get(GET_FOLDERS_PATH);
      setFolders(data);
    } catch {
      console.error("could not fetch folders");
    }
  };
  useEffect(() => {
    getFolders();
  }, []);
  return (
    <FolderContext.Provider value={[folders, setFolders]}>
      {props.children}
    </FolderContext.Provider>
  );
};
