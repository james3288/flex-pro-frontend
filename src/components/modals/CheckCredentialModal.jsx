import React, { useEffect } from "react";
import useCheckCredential from "../mySection/activeUser/hooks/useCheckCredential";
import TextFieldModalComponent from "./TextFieldModalComponent";
import { useClearCredentialTextField } from "../../store/useClearCredentialTextField";

const { checkCredential } = useCheckCredential();

const InvalidCredentialComponent = ({ isValid }) => {
  return (
    !isValid && (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "10px",
        }}
      >
        <p style={{ color: "red" }}>Invalid Admin Credentials..</p>
      </div>
    )
  );
};

const CheckCredentialModal = ({ id }) => {
  const [userName, setUserName] = React.useState("admin");
  const [password, setPassword] = React.useState("");
  const [isValid, setIsValid] = React.useState(false);

  const [cIsClear, cSetIsClear] = useClearCredentialTextField((state) => [
    state.isClear,
    state.setIsClear,
  ]);

  const isCredentialValid = async ({ username, password }) => {
    const result = await checkCredential({ username, password });

    if (result) {
      setIsValid(result?.valid);
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
              User Validation
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
          <InvalidCredentialComponent isValid={isValid} />
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
              onClick={() =>
                isCredentialValid({ username: userName, password: password })
              }
            >
              Validate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckCredentialModal;
