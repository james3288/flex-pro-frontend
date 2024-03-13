import React, { useEffect, useReducer, useRef, useState } from "react";
import SaveTrainers from "./saveTrainers";
import { INITIAL_STATE, formReducer } from "../../../reducers/trainorsReducer";

const TrainersModal = ({ id, option, selectedTrainer }) => {
  const [state, dispatch] = useReducer(formReducer, INITIAL_STATE);
  const refName = useRef(null);
  const refPosition = useRef(null);
  const refContactNo = useRef(null);
  const refImage = useRef(null);

  useEffect(() => {
    if (option === "Update") {
      // convert image to base64 file
      const filename = "1.jpg"; // You can set your desired filename here
      const mimeType = "image/jpeg"; // Mime type of the image
      const base64String = selectedTrainer?.image;
      const file =
        selectedTrainer?.image != undefined &&
        base64toFile(base64String, filename, mimeType);

      refName.current.value = selectedTrainer?.name;
      refPosition.current.value = selectedTrainer?.position;
      refContactNo.current.value = selectedTrainer?.contact_no;
      // refImage.current.value = file;

      // console.log(file);

      // FILL ALL DATA TO STATE
      dispatch({
        type: "CHANGE_INPUT",
        payload: {
          name: refName.current.name,
          value: refName.current.value,
        },
      });
      dispatch({
        type: "CHANGE_INPUT",
        payload: {
          name: refPosition.current.name,
          value: refPosition.current.value,
        },
      });
      dispatch({
        type: "CHANGE_INPUT",
        payload: {
          name: refContactNo.current.name,
          value: refContactNo.current.value,
        },
      });
      dispatch({
        type: "CHANGE_IMAGE",
        payload: {
          name: refImage.current.name,
          value: file,
        },
      });
      // END FILL ALL DATA TO STATE
    }
  }, [selectedTrainer]);

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

  const handleUpdate = async () => {
    console.log(state);
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

  // Function to convert base64 to File object
  const base64toFile = (base64String, filename, mimeType) => {
    const byteCharacters = atob(base64String.split(",")[1]);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const file = new File([byteArray], filename, { type: mimeType });
    return file;
  };

  // console.log(state);

  return (
    <div
      className="modal fade"
      id={id}
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
                ref={refName}
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
                ref={refPosition}
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
                ref={refContactNo}
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
                ref={refImage}
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
              {option === "Save" ? (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSave}
                >
                  Save
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleUpdate}
                >
                  Update
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainersModal;
