import { useEffect, useState } from "react";
import getSubscriptions from "../../../getData/getSubscriptions";

const ExtendSubscriptionModal = ({ id, modalTitle, userSubscriptionId }) => {
  const [subscription, setSubscription] = useState([]);
  useEffect(() => {
    const getsubscript = async () => {
      let data = await getSubscriptions();
      console.log("subscription", data);
      setSubscription(data);
    };
    getsubscript();
  }, [userSubscriptionId]);

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
                  {subscription.map((subs) => (
                    <option key={subs?.id} value={subs?.id}>
                      {subs?.gym_rate_desc} / {subs?.rate} per {subs?.per.per}
                    </option>
                  ))}
                </select>

                <br />
                {/* {state.trainersName == 0 && (
                  <span style={{ color: "red" }}>select trainers</span>
                )} */}
              </div>

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
