import { useEffect, useReducer, useState } from "react";
import getSubscriptions from "../../../getData/getSubscriptions";
import {
  INITIAL_STATE,
  extendSubscriptionReducer,
} from "../../../reducers/extendSubscriptionReducer";
import extendNewSubscription from "./extendNewSubscription";
import updateExtendSubscription from "./updateExtendSubscription";

const ExtendSubscriptionModal = ({ id, modalTitle, userSubscriptionId }) => {
  const [subscription, setSubscription] = useState([]);
  const [state, dispatch] = useReducer(
    extendSubscriptionReducer,
    INITIAL_STATE
  );

  useEffect(() => {
    const getsubscript = async () => {
      let data = await getSubscriptions();
      console.log("subscription", data);
      setSubscription(data);
    };
    getsubscript();
  }, [userSubscriptionId]);

  const handleChange = (e) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  const handleSave = () => {
    if (state.subscriptionId == 0) {
      return;
    } else if (userSubscriptionId == 0) {
      return;
    }

    const updateData = new FormData();
    updateData.append("userSubscriptionId", userSubscriptionId);
    updateData.append("subscriptionId", state.subscriptionId);

    extendNewSubscription(updateData);
  };

  const handleUpdate = () => {
    // NOTE: userSubscriptionId = extendedSubscriptionId
    if (state.subscriptionId == 0) {
      return;
    } else if (userSubscriptionId == 0) {
      return;
    }

    const updateData = new FormData();
    updateData.append("extendedSubscriptionId", userSubscriptionId);
    updateData.append("subscriptionId", state.subscriptionId);

    updateExtendSubscription(updateData);
  };

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
                  name="subscriptionId"
                  onChange={handleChange}
                >
                  <option value={0}>-- Select Extended Subscription --</option>
                  {subscription.map((subs) => (
                    <option key={subs?.id} value={subs?.id}>
                      {subs?.gym_rate_desc} /{" "}
                      {subs?.rate.toLocaleString("en-US")} per {subs?.per.per}
                    </option>
                  ))}
                </select>

                <br />
                {state.subscriptionId == 0 && (
                  <span style={{ color: "red" }}>select trainers</span>
                )}
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
              {modalTitle === "Extend Subscriptions" ? (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSave}
                >
                  Save changes
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleUpdate}
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

export default ExtendSubscriptionModal;
