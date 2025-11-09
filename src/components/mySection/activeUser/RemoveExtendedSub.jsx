import React, { useEffect, useState } from "react";
import deleteExtendedSub from "../../../deleteData/deleteExtendedSub";
import deleteExtendedTrainer from "../../../deleteData/deleteExtendedTrainer";
import TextFieldModalComponent from "../../modals/TextFieldModalComponent";
import { useClearCredentialTextField } from "../../../store/useClearCredentialTextField";
import useCheckCredential from "./hooks/useCheckCredential";

const ErrorMessage = ({ msg }) => (
  <div className="alert alert-warning mt-2">
    <span style={{ color: "red" }}>{msg}</span>
  </div>
);

const { checkCredential } = useCheckCredential();

const InvalidCredentialComponent = ({ isValid }) => {
  return !isValid && <ErrorMessage msg={"Invalid Admin Credentials..."} />;
};

const RemoveExtendedSub = ({
  id,
  extendedSubId,
  modalTitle,
  extendedTrainerId,
}) => {
  const [userName, setUserName] = useState("admin");
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState(false);

  const [cIsClear] = useClearCredentialTextField((state) => [
    state.isClear,
    state.setIsClear,
  ]);

  useEffect(() => {
    let isMounted = true;
    if (cIsClear) {
      setPassword("");
    }
    return () => {
      isMounted = false;
    };
  }, [cIsClear]);

  const isTrainer = modalTitle === "Remove Extended Trainers";

  // Precompute message & handler to avoid repeated conditionals in JSX
  const confirmMessage = isTrainer
    ? "Are you sure you want to delete the extended personal trainer?"
    : "Are you sure you want to delete the extended subscription?";

  const handleDelete = async () => {
    try {
      if (isTrainer) {
        await deleteExtendedTrainer(extendedTrainerId);
      } else {
        await deleteExtendedSub(extendedSubId);
      }
      // Optionally trigger UI feedback or close modal programmatically
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const setCredentialValidOrInvalid = async ({ username, password }) => {
    const result = await checkCredential({ username, password });

    if (result) {
      setIsValid(result?.valid);

      //✅ delete function
      handleDelete();
    } else {
      setIsValid(false);
    }
  };

  return (
    <div
      className="modal fade"
      id={id}
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          {/* Header */}
          <div className="modal-header">
            <h5 className="modal-title text-danger" id="exampleModalLabel">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-trash3-fill"
                viewBox="0 0 16 16"
              >
                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
              </svg>{" "}
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
          <div className="modal-body">{confirmMessage}</div>
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
              className="btn btn-danger"
              onClick={() =>
                setCredentialValidOrInvalid({
                  username: userName,
                  password: password,
                })
              }
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemoveExtendedSub;
