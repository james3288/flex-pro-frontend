import FormatDate from "../../../others/FormatDate";
import { useClearCredentialTextField } from "../../../store/useClearCredentialTextField";
import useCheckCredential from "../activeUser/hooks/useCheckCredential";

const TrashIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    className="bi bi-trash"
    viewBox="0 0 16 16"
  >
    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
  </svg>
);

const SubscriptionComponents = ({
  date_subscribed,
  packages_details,
  extendedSubscript,
  handleExtendSubscriptions,
  handleUpdateExtendSubscriptions,
  handleRemoveExtendedSub,
  subscription,
  isExpired,
}) => {
  const [cSetIsClear] = useClearCredentialTextField((state) => [
    state.setIsClear,
  ]);

  const clearPasswordTextField = () => {
    cSetIsClear(true);
  };

  // Build package details as a single string
  const packageText = packages_details
    ?.map((pkg) => pkg.packages_details)
    .join(" ▐ ");

  return (
    <>
      <div style={{ margin: "10px 0" }}>
        <h5>DATE SUBSCRIBED</h5>
        <h4>{FormatDate(date_subscribed)}</h4>

        {/* MAIN SUBSCRIPTION */}
        <h3>{subscription}</h3>

        {/* PACKAGES DETAILS */}
        {packageText && (
          <span style={{ fontSize: "12px", color: "yellowgreen" }}>
            {packageText}
          </span>
        )}
        {/* EXTENDED SUBSCRIPTIONS */}
        {extendedSubscript?.map((ex) => (
          <div
            key={ex.id}
            style={{
              display: "flex",
              alignItems: "start",
              justifyContent: "center",
              gap: "2px",
            }}
          >
            <a
              className="extendSubscript"
              data-toggle="modal"
              data-target="#extendSubscriptionModal"
              data-whatever="@mdo"
              onClick={() => handleUpdateExtendSubscriptions(ex.id)}
            >
              - {ex?.subscription.gym_rate_desc} / extend{" "}
              {ex?.extended_session_day} days{" "}
              {ex?.options === "promo" && `- (${ex.options})`}
            </a>
            <a
              className="removeExtendedSubs"
              data-toggle="modal"
              data-target="#removeExtendedSubModal"
              data-whatever="@mdo"
              onClick={() => handleRemoveExtendedSub(ex.id)}
            >
              <TrashIcon />
            </a>
          </div>
        ))}

        {/* EXTEND SUBSCRIPTION BUTTON */}
        {!isExpired && (
          <button
            type="button"
            className="btn btn-secondary btn-sm extend-subscription"
            data-toggle="modal"
            data-target="#extendSubscriptionModal"
            data-whatever="@mdo"
            onClick={() => {
              clearPasswordTextField();
              handleExtendSubscriptions();
            }}
            // onClick={clearPasswordTextField}
            style={{ width: "100%" }}
          >
            Extend Subscription
          </button>
        )}
      </div>
    </>
  );
};

export default SubscriptionComponents;
