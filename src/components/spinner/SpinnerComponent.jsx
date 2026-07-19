import React from "react";
import "./spinnerComponent.scss";

const SpinnerComponent = () => {
  return (
    <div className="spinner" style={{ marginTop: "25px" }}>
      <div className="spinnerin"></div>
    </div>
  );
};

export default SpinnerComponent;
