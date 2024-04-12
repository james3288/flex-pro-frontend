import React from "react";
import LoadingEffect from "../loadingEffect/LoadingEffect";

const NoDataFound = () => {
  const errorStyle = {
    padding: "20px",
    borderRadius: "10px",
    background: "rgba(7, 7, 7, 0.7)",
  };

  return (
    <div className="container" style={errorStyle}>
      <div className="row">
        <div className="col-lg-12">
          <LoadingEffect />
          <h3 style={{ color: "white" }}>
            There is something wrong with your data...
          </h3>
        </div>
      </div>
    </div>
  );
};

export default NoDataFound;
