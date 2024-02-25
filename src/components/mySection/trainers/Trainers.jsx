import React from "react";

const Trainers = ({ registeredName, pix, weights, blobPix }) => {
  return (
    <div className="clients-online">
      <div className="row row2">
        <div className="col-3">
          <img
            src={blobPix}
            alt=""
            className="circle"
            style={{ border: "2px solid red" }}
          />
        </div>
        <div className="col-7">
          <div className="clients-flex">
            <h5>{registeredName}</h5>
            <p>weights: {weights}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trainers;
