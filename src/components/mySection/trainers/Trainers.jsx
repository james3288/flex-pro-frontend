import React, { useState } from "react";

const Trainers = ({ name, position, image, trainer_id, trainor }) => {
  const handleEdit = () => {
    console.log(trainor);
  };
  return (
    <div className="col-lg-2 col-sm-3">
      <div className="ts-item set-bg bg">
        <img src={image} alt="" className="img" />
        <div className="ts_text">
          <h4>{name}</h4>
          <span>{position}</span>
          <a
            className="btn btn-success ts-button"
            // onClick={handleEdit}
            data-toggle="modal"
            data-target="#trainersModal2"
            data-whatever="@mdo"
          >
            Edit
          </a>
          <button className="btn btn-success ts-button">History</button>
          {/* <div className="tt_social"></div> */}
        </div>
      </div>
    </div>
  );
};

export default Trainers;
