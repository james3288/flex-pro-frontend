import React from "react";

const ExtendButton = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        textAlign: "center",
        fontSize: "8px",
        position: "relative",
        paddingBottom: "5px",
      }}
    >
      <button
        type="button"
        style={{ padding: "2px 5px" }}
        className="btn btn-primary btn-sm"
      >
        Extend
      </button>
    </div>
  );
};

export default ExtendButton;
