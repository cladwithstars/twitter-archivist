import React, { useEffect, useState } from "react";
import axios from "axios";
import { GET_FOLDERS_PATH } from "../shared/constants";

const MyFolders = () => {
  const [folders, setFolders] = useState<Array<any> | null>(null);
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
    <div>
      <h2>MyFolders</h2>
      <ul>
        {folders &&
          folders.length &&
          folders.map((folder) => <li>{folder.name}</li>)}
      </ul>
    </div>
  );
};

export default MyFolders;
