const ExtendSubscriptionModal = ({ id, modalTitle }) => {
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
              <label className="col-form-label">Personal Trainer:</label>
              <div>
                <select
                  className="mySelect"
                  name="trainersName"
                  //   onChange={handleChange}
                >
                  {/* <option value="day">King James Uayan</option>
                  <option value="month">John Mayer</option>
                  <option value="year">Jeoseph Bejec</option> */}
                  {/* {trainers.map((trainer) => (
                    <option key={trainer?.id} value={trainer?.id}>
                      {trainer?.name}
                    </option>
                  ))} */}
                </select>
                <br />
                {/* {state.trainersName == 0 && (
                  <span style={{ color: "red" }}>select trainers</span>
                )} */}
              </div>
              <label className="col-form-label">
                Personal Training Session (days):
              </label>
              <input
                type="text"
                className="form-control"
                id="personal-training-session"
                name="session_days"
              />
              {/* {state.session_days == "" ? (
                <span style={{ color: "red" }}>Fill session days</span>
              ) : (
                isNaN(state.session_days) && (
                  <span style={{ color: "red" }}>input must day/s</span>
                )
              )} */}
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
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExtendSubscriptionModal;
