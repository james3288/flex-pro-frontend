import { useEffect, useState } from "react";
import useExtendSubscriptionModal from "../../../hooks/useExtendSubscriptionModal";

const ExtendSubscriptionModal = ({ id, modalTitle, userSubscriptionId }) => {
  const {
    subscription,
    extendedSubcription,
    refTrainingSession,
    refPromoRate,
    refOption,
    state,
    handleChange,
    handleSave,
    handleUpdate,
  } = useExtendSubscriptionModal((userSubscriptionId = { userSubscriptionId }));

  function errorMessage(errorMsg) {
    return <span style={{ color: "red" }}>{errorMsg}</span>;
  }

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
                  {subscription?.map((subs) => (
                    <option key={subs?.id} value={subs?.id}>
                      {subs?.gym_rate_desc} /{" "}
                      {subs?.rate.toLocaleString("en-US")} per {subs?.per.per}
                    </option>
                  ))}
                </select>
                {state.subscriptionId == 0 &&
                  errorMessage("You must select a subscription first..")}
              </div>
              {/* extended days inputbox */}
              <label className="col-form-label">Extended (days):</label>
              <div>
                <input
                  type="text"
                  className="form-control"
                  id="personal-training-session"
                  name="session_days"
                  onChange={handleChange}
                  ref={refTrainingSession}
                />
                {isNaN(state.session_days) &&
                  errorMessage("extended days must be numeric...")}
              </div>
              <label className="col-form-label">Promo options:</label>
              <div>
                <select
                  className="mySelect"
                  name="promo_option"
                  onChange={handleChange}
                  id={"status"}
                  value={state?.promo_option}
                >
                  <option value={""}>-- Select Options --</option>
                  <option value={"promo"}>Promo</option>
                </select>
              </div>

              {/* promo rate inputbox */}
              <label className="col-form-label">Promo rate:</label>
              <div>
                <input
                  type="text"
                  className="form-control"
                  name="promo_rate"
                  onChange={handleChange}
                  disabled={state.promo_option == "" ? true : false}
                  ref={refPromoRate}
                />
                {isNaN(state.promo_rate) &&
                  errorMessage("promo rate must be numeric...")}
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
