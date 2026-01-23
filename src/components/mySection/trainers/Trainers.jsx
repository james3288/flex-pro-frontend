import React, { useRef, useState } from "react";
import { NavLink } from "react-router-dom";

const Trainers = ({
  name,
  position,
  image,
  trainer_id,
  trainor,
  setSelectedTrainer,
  setShowTrainerModal,
  setShowDeleteTrainerModal,
}) => {
  const handleEdit = () => {
    setSelectedTrainer(trainor);
    setShowTrainerModal(true);
  };

  const handleRemove = () => {
    setSelectedTrainer(trainor);
    setShowDeleteTrainerModal(true);
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
            onClick={handleEdit}
            data-toggle="modal"
            data-target="#trainersModal2"
            data-whatever="@mdo"
            style={{ color: "white" }}
          >
            Edit
          </a>
          {/* <a className="btn btn-success ts-button" style={{ color: "white" }}>
            History
          </a> */}
          <NavLink
            className="btn btn-primary ts-button"
            to={`/trainer-history/?q=${trainor.name}`}
            style={{ color: "white" }}
          >
            History
          </NavLink>
          <a
            className="btn btn-danger ts-button"
            data-toggle="modal"
            data-target="#deleteTrainersModal"
            data-whatever="@mdo"
            style={{ color: "white" }}
            onClick={handleRemove}
          >
            Remove
          </a>
          {/* <div className="tt_social"></div> */}
        </div>
      </div>
    </div>
  );
};

export default Trainers;
