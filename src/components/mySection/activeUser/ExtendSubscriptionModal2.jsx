const ExtendSubscriptionModal2 = ({ id, modalTitle, userSubscriptionId }) => {
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
                </select>
              </div>
              {/* extended days inputbox */}
              <label className="col-form-label">Extended (days):</label>
              <div>
                <input
                  type="text"
                  className="form-control"
                  id="personal-training-session"
                  name="session_days"
                />
              </div>
              <label className="col-form-label">Promo options:</label>
              <div>
                <select className="mySelect" name="promo_option" id={"status"}>
                  <option value={""}>-- Select Options --</option>
                  <option value={"promo"}>Promo</option>
                </select>
              </div>

              {/* promo rate inputbox */}
              <label className="col-form-label">Promo rate:</label>
              <div>
                <input type="text" className="form-control" name="promo_rate" />
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              {modalTitle === "Extend Subscriptions" ? (
                <button
                  type="button"
                  className="btn btn-primary"
                  // onClick={handleSave}
                >
                  Save changes
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-primary"
                  // onClick={handleUpdate}
                >
                  Update changes
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ExtendSubscriptionModal2;
