import { useContext } from "react";
import { ExtendedSubscriptionContext } from "../../context/ExtendedSubscriptionContext";

const ExtendSubscriptionModal2 = ({ id }) => {
  // const { myData } = useContext(ExtendedSubscriptionContext);

  return (
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
              Extend Subscription
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
            <input
              type="text"
              className="form-control"
              id="personal-training-session"
              name="session_days"
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
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExtendSubscriptionModal2;
