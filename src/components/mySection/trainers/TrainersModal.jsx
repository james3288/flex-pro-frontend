import React, { useRef, useState } from "react";
import SaveTrainers from "./saveTrainers";


const TrainersModal = () => {
  const [trainersName, setTrainersName] = useState("");
  const [position, setPosition] = useState("");
  const [image, setImage] = useState();
  const [contactNo, setContactNo] = useState("");

  const handleSave = async () => {
    const uploadData = new FormData();
    uploadData.append("trainersName", trainersName);
    uploadData.append("position", position);
    uploadData.append("image", image);
    uploadData.append("contactNo", contactNo);

    SaveTrainers(uploadData);

    setTrainersName("");
    setPosition("");
    setImage(null);
    setContactNo("");
    // const formData = new FormData();
    // formData.append("trainersName", nameRef.current.value);
    // formData.append("position", positionRef.current.value);
    // formData.append("image", imageRef.current.files[0]);
  };

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
                value={trainersName}
                onChange={(e) => setTrainersName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="col-form-label">Position:</label>
              <input
                type="text"
                className="form-control"
                id="recipient-position"
                onChange={(e) => setPosition(e.target.value)}
                value={position}
              />
            </div>
            <div className="form-group">
              <label className="col-form-label">Contact Number:</label>
              <input
                type="text"
                className="form-control"
                id="recipient-position"
                onChange={(e) => setContactNo(e.target.value)}
                value={contactNo}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Uploage Image:</label>
              <input
                className="form-control"
                type="file"
                id="formFile"
                onChange={(e) => setImage(e.target.files[0])}
              />
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
