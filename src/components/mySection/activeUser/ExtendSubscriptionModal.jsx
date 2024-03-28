import { useEffect, useReducer, useRef, useState } from "react";
import getSubscriptions from "../../../getData/getSubscriptions";
import {
  INITIAL_STATE,
  extendSubscriptionReducer,
} from "../../../reducers/extendSubscriptionReducer";
import extendNewSubscription from "./extendNewSubscription";
import updateExtendSubscription from "./updateExtendSubscription";
import getExtendedSubscription from "../../../getData/getExtendedSubscription";
import getSpecificExtendedSubscription from "../../../getData/getSpecificExtendedSubscription";

const ExtendSubscriptionModal = ({ id, modalTitle, userSubscriptionId }) => {
  const [subscription, setSubscription] = useState([]);
  const [extendedSubcription, setExtendedSubscription] = useState({});

  const [state, dispatch] = useReducer(
    extendSubscriptionReducer,
    INITIAL_STATE
  );
  const refTrainingSession = useRef(null);

  useEffect(() => {
    const getsubscript = async () => {
      let data = await getSubscriptions();
      setSubscription(data);
    };
    getsubscript();
  }, [userSubscriptionId]);

  useEffect(() => {
    const getSpecificExtendSub = async () => {
      let data = await getSpecificExtendedSubscription(userSubscriptionId);
      console.log("specific Sub", data);
      setExtendedSubscription(data);

      refTrainingSession.current.value = data?.extended_session_day;

      // userSubscriptionId: 0,
      // subscriptionId: 0,
      // session_days: 0,

      dispatch({
        type: "CHANGE_INPUT",
        payload: {
          name: "subscriptionId",
          value: data?.subscription?.id,
        },
      });

      dispatch({
        type: "CHANGE_INPUT",
        payload: {
          name: "session_days",
          value: data?.extended_session_day,
        },
      });
    };

    getSpecificExtendSub();
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
    } else if (state.session_days == 0) {
      return;
    }

    const updateData = new FormData();
    updateData.append("userSubscriptionId", userSubscriptionId);
    updateData.append("subscriptionId", state.subscriptionId);
    updateData.append("session_days", state.session_days);

    extendNewSubscription(updateData);
  };

  const handleUpdate = () => {
    // NOTE: userSubscriptionId = extendedSubscriptionId
    console.log(state);
    if (state.subscriptionId == 0) {
      return;
    } else if (userSubscriptionId == 0) {
      return;
    } else if (state.session_days == 0) {
      return;
    }

    const updateData = new FormData();
    updateData.append("extendedSubscriptionId", userSubscriptionId);
    updateData.append("subscriptionId", state.subscriptionId);
    updateData.append("session_days", state.session_days);

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
              <label className="col-form-label">Subscription</label>
              <div>
                <select
                  className="mySelect"
                  name="subscriptionId"
                  onChange={handleChange}
                  value={
                    // extendedSubcription?.user_subscription?.subscription?.id
                    state.subscriptionId
                  }
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
              <label className="col-form-label">Extended (days):</label>
              <input
                type="text"
                className="form-control"
                id="personal-training-session"
                name="session_days"
                onChange={handleChange}
                ref={refTrainingSession}
              />
              {state.session_days == "" ? (
                <span style={{ color: "red" }}>Fill session days</span>
              ) : (
                isNaN(state.session_days) && (
                  <span style={{ color: "red" }}>input must day/s</span>
                )
              )}
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
