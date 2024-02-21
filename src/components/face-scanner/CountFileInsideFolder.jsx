import { readdir } from "fs";

import React from "react";

const CountFileInsideFolder = () => {
  const folderPath = "./../../../public/labels"; // Example folder path within your project

  readdir(folderPath, (err, files) => {
    if (err) {
      console.error("Error reading directory:", err);
      return;
    }
  });

  const fileCount = files.length;

  return (
    <div>
      <h1 style={{ color: "white" }}>{fileCount}</h1>
    </div>
  );
};

export default CountFileInsideFolder;
