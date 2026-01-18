import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import useExtendSubscriptionModal from "../../../hooks/useExtendSubscriptionModal";
import TextFieldModalComponent from "../../modals/TextFieldModalComponent";
import useCheckCredential from "./hooks/useCheckCredential";
import { useClearCredentialTextField } from "../../../store/useClearCredentialTextField";

// Error message helper outside component to avoid recreation on each render
const ErrorMessage = ({ msg }) => (
  <div className="alert alert-warning mt-2">
    <span style={{ color: "red" }}>{msg}</span>
  </div>
);

const { checkCredential } = useCheckCredential();

const InvalidCredentialComponent = ({ isValid }) => {
  return !isValid && <ErrorMessage msg={"Invalid Admin Credentials..."} />;
};

const ExtendSubscriptionModal = ({
  show,
  onHide,
  modalTitle,
  userSubscriptionId,
}) => {
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

  const [userName, setUserName] = useState("admin");
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState(false);

  console.log(onHide);

  const [cIsClear, cSetIsClear] = useClearCredentialTextField((state) => [
    state.isClear,
    state.setIsClear,
  ]);

  const isExtend = modalTitle === "Extend Subscriptions";
  const actionHandler = isExtend ? handleSave : handleUpdate;
  const actionLabel = isExtend ? "Save changes" : "Update changes";

  const setCredentialValidOrInvalid = async ({ username, password }) => {
    const result = await checkCredential({ username, password });

    if (result) {
      setIsValid(result?.valid);

      //✅ save or update function
      actionHandler();
    } else {
      setIsValid(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    if (cIsClear) {
      setPassword("");
    }
    return () => {
      isMounted = false;
    };
  }, [cIsClear]);

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
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
                {subs?.gym_rate_desc} / {subs?.rate.toLocaleString("en-US")} per{" "}
                {subs?.per.per}
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

        <TextFieldModalComponent
          label={"Username:"}
          id={"credential-username"}
          name={"username"}
          setText={setUserName}
          text={userName}
          type={"text"}
          isDisable={true}
        />
        <TextFieldModalComponent
          label={"Password:"}
          id={"credential-password"}
          name={"password"}
          setText={setPassword}
          text={password}
          type={"password"}
        />
        <InvalidCredentialComponent isValid={isValid} />
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() =>
            setCredentialValidOrInvalid({
              username: userName,
              password: password,
            })
          }
        >
          {actionLabel}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ExtendSubscriptionModal;
