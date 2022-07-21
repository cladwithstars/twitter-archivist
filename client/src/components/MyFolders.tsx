import React, { useContext } from "react";
import { FolderContext } from "../context/FolderContext";
import { Link } from "react-router-dom";

const MyFolders = () => {
  const [folders] = useContext(FolderContext);
  return (
    <div>
      <h2>MyFolders</h2>
      <ul>
        {folders?.length &&
          folders.map(({ name }) => (
            <li key={name}>
              <Link to={`/folder/${name}`}>{name}</Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default MyFolders;
