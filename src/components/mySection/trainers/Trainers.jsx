import React, { useCallback } from "react";
import { NavLink } from "react-router-dom";

const Trainers = ({ name, position, image, trainor, setSelectedTrainer }) => {
  const handleSelect = useCallback(() => {
    setSelectedTrainer(trainor);
  }, [setSelectedTrainer, trainor]);

  return (
    <div className="col-lg-2 col-sm-3">
      <div className="ts-item set-bg bg">
        <img src={image} alt={name} className="img" loading="lazy" />
        <div className="ts_text">
          <h4>{name}</h4>
          <span>{position}</span>

          <button
            type="button"
            className="btn btn-success ts-button text-white"
            onClick={handleSelect}
            data-toggle="modal"
            data-target="#trainersModal2"
            data-whatever="@mdo"
          >
            Edit
          </button>

          <NavLink
            className="btn btn-primary ts-button text-white"
            to={`/trainer-history/?q=${name}`} // use destructured name
          >
            History
          </NavLink>

          <button
            type="button"
            className="btn btn-danger ts-button text-white"
            onClick={handleSelect}
            data-toggle="modal"
            data-target="#deleteTrainersModal"
            data-whatever="@mdo"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default Trainers;
