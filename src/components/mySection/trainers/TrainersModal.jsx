import React, { useRef, useState } from "react";
import SaveTrainers from "./saveTrainers";

const TrainersModal = () => {
  const [form, setForm] = useState({
    trainersName: "",
    position: "",
    image: "",
  });
  const nameRef = useRef();
  const positionRef = useRef();
  const imageRef = useRef();

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("trainersName", nameRef.current.value);
    formData.append("position", positionRef.current.value);
    formData.append("image", imageRef.current.files[0]);

    // const formData = {
    //   trainersName: nameRef.current.value,
    //   position: positionRef.current.value,
    //   image: imageRef.current.files[0],
    // };

    SaveTrainers(formData);
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
            <form onSubmit={handleOnSubmit}>
              <div className="form-group">
                <label className="col-form-label">Name:</label>
                <input
                  type="text"
                  className="form-control"
                  id="recipient-name"
                  ref={nameRef}
                />
              </div>
              <div className="form-group">
                <label className="col-form-label">Position:</label>
                <input
                  type="text"
                  className="form-control"
                  id="recipient-position"
                  ref={positionRef}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Default file input example</label>
                <input
                  className="form-control"
                  type="file"
                  id="formFile"
                  ref={imageRef}
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
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainersModal;
