import React from "react";

const LoadingEffect = ({ color }) => {
  return (
    <>
      <div
        className={"spinner-border text-warning"}
        style={{ width: "3rem", height: "3rem" }}
        role="status"
      >
        <span class="sr-only">Loading...</span>
      </div>
      <div
        className="spinner-grow text-warning"
        style={{ width: "3rem", height: "3rem" }}
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </>
  );
};

export default LoadingEffect;
