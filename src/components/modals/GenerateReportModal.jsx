import React from "react";

const GenerateReportModal = ({ id, modalTitle }) => {
  return (
    <>
      <div
        className="modal fade"
        id={id}
        role="dialog"
        aria-labelledby="exampleModalLongTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                {modalTitle}
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
              <label className="col-form-label">Subscription</label>
              <div>
                <select className="mySelect" name="subscriptionId">
                  <option value={0}>-- Select Extended Subscription --</option>
                  <option value="">Hello World</option>
                </select>

                <br />
                <span style={{ color: "red" }}>select trainers</span>
              </div>
              <label className="col-form-label">Extended (days):</label>
              <input
                type="text"
                className="form-control"
                id="personal-training-session"
                name="session_days"
              />
              <label className="col-form-label">Training Date Started:</label>
              <input
                type="datetime-local"
                className="form-control"
                name="trainer_date_started"
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

              <button type="button" className="btn btn-primary">
                Update changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GenerateReportModal;
