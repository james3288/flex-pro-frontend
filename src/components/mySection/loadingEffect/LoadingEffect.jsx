import React from "react";

const LoadingEffect = ({ color }) => {
  return (
    <>
      <div
        className="spinner-border spinner-border-sm text-warning"
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
      <div className="spinner-grow spinner-grow-sm text-warning" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </>
  );
};

export default LoadingEffect;
