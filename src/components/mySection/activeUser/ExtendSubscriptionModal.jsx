import useExtendSubscriptionModal from "../../../hooks/useExtendSubscriptionModal";

// Error message helper outside component to avoid recreation on each render
const ErrorMessage = ({ msg }) => <span style={{ color: "red" }}>{msg}</span>;

const ExtendSubscriptionModal = ({ id, modalTitle, userSubscriptionId }) => {
  const {
    subscription,
    extendedSubcription,
    refTrainingSession,
    refPromoRate,
    refOption,
    state,
    promoRateEnable,
    handleChange,
    handleSave,
    handleUpdate,
  } = useExtendSubscriptionModal({ userSubscriptionId }); // ✅ fixed parameter passing

  const isExtend = modalTitle === "Extend Subscriptions";
  const actionHandler = isExtend ? handleSave : handleUpdate;
  const actionLabel = isExtend ? "Save changes" : "Update changes";

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
          {/* Header */}
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

          {/* Body */}
          <div className="modal-body">
            {/* Subscription Select */}
            <label className="col-form-label">Subscription</label>
            <div>
              <select
                className="mySelect"
                name="subscriptionId"
                onChange={handleChange}
                value={state.subscriptionId ?? "0"}
              >
                <option value="0">-- Select Extended Subscription --</option>
                {subscription?.map((subs) => (
                  <option key={subs?.id} value={subs?.id}>
                    {subs?.gym_rate_desc} / {subs?.rate.toLocaleString("en-US")}{" "}
                    per {subs?.per.per}
                  </option>
                ))}
              </select>
              {state.subscriptionId == 0 && (
                <ErrorMessage msg="You must select a subscription first.." />
              )}
            </div>

            {/* Extended Days */}
            <label className="col-form-label">Extended (days):</label>
            <div>
              <input
                type="text"
                className="form-control"
                name="session_days"
                onChange={handleChange}
                ref={refTrainingSession}
                value={state.session_days ?? ""}
              />
              {state.session_days && isNaN(state.session_days) && (
                <ErrorMessage msg="Extended days must be numeric..." />
              )}
            </div>

            {/* Promo Option */}
            <label className="col-form-label">Promo options:</label>
            <div>
              <select
                className="mySelect"
                name="promo_option"
                onChange={handleChange}
                value={state.promo_option ?? ""}
              >
                <option value="">-- Select Options --</option>
                <option value="promo">Promo</option>
              </select>
            </div>

            {/* Promo Rate */}
            <label className="col-form-label">Promo rate:</label>
            <div>
              <input
                type="text"
                className="form-control"
                name="promo_rate"
                onChange={handleChange}
                disabled={promoRateEnable}
                ref={refPromoRate}
                value={state.promo_rate ?? ""}
              />
              {state.promo_rate && isNaN(state.promo_rate) && (
                <ErrorMessage msg="Promo rate must be numeric..." />
              )}
            </div>
          </div>

          {/* Footer */}
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
              onClick={actionHandler}
            >
              {actionLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExtendSubscriptionModal;
