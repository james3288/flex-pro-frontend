import React, { useEffect, useReducer, useRef, useState } from "react";
import SaveTrainers from "./saveTrainers";
import { INITIAL_STATE, formReducer } from "../../../reducers/trainorsReducer";

const TrainersModal = () => {
  const [state, dispatch] = useReducer(formReducer, INITIAL_STATE);

  const handleSave = async () => {
    if (state.trainersName == "" || !isNaN(state.trainersName)) {
      return;
    } else if (state.position == "" || !isNaN(state.position)) {
      return;
    } else if (state.contactNo == "" || isNaN(state.contactNo)) {
      return;
    } else if (state.image === null || state.image === undefined) {
      return;
    }

    const uploadData = new FormData();
    uploadData.append("trainersName", state.trainersName);
    uploadData.append("position", state.position);
    uploadData.append("image", state.image);
    uploadData.append("contactNo", state.contactNo);

    SaveTrainers(uploadData);

    dispatch({ type: "CLEAR" });
  };

  const handleChange = (e) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  const handleChangeImage = (e) => {
    dispatch({
      type: "CHANGE_IMAGE",
      payload: { name: e.target.name, value: e.target.files[0] },
    });
  };

  console.log(state);

  return (
    <div
      className="modal fade"
      id="trainersModal"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Trainers Info
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <label className="col-form-label">Name:</label>
              <input
                type="text"
                className="form-control"
                id="recipient-name"
                // value={trainersName}
                name="trainersName"
                // onChange={(e) => setTrainersName(e.target.value)}
                onChange={handleChange}
              />
              {state.trainersName == "" ? (
                <span style={{ color: "red" }}>Fill trainers name</span>
              ) : (
                !isNaN(state.trainersName) && (
                  <span style={{ color: "red" }}>must not numeric</span>
                )
              )}
            </div>
            <div className="form-group">
              <label className="col-form-label">Position:</label>
              <input
                type="text"
                className="form-control"
                id="recipient-position"
                // onChange={(e) => setPosition(e.target.value)}
                // value={position}
                onChange={handleChange}
                name="position"
              />
              {state.position == "" ? (
                <span style={{ color: "red" }}>Fill position</span>
              ) : (
                !isNaN(state.position) && (
                  <span style={{ color: "red" }}>must not numeric</span>
                )
              )}
            </div>
            <div className="form-group">
              <label className="col-form-label">Contact Number:</label>
              <input
                type="text"
                className="form-control"
                id="recipient-position"
                // onChange={(e) => setContactNo(e.target.value)}
                // value={contactNo}
                onChange={handleChange}
                name="contactNo"
                placeholder="09+"
              />
              {state.contactNo == "" ? (
                <span style={{ color: "red" }}>Fill contact No</span>
              ) : (
                isNaN(state.contactNo) && (
                  <span style={{ color: "red" }}>must be numeric</span>
                )
              )}
            </div>
            <div className="mb-3">
              <label className="form-label">Uploage Image:</label>
              <input
                className="form-control"
                type="file"
                id="formFile"
                name="image"
                // onChange={(e) => setImage(e.target.files[0])}
                onChange={handleChangeImage}
              />
              {state.image === null || state.image === undefined ? (
                <span style={{ color: "red" }}>Upload an image</span>
              ) : null}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainersModal;
