import React, { useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
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

const CheckCredentialModal = ({ show, onHide }) => {
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
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>User Validation</Modal.Title>
      </Modal.Header>

      <Modal.Body>
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
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() =>
            isCredentialValid({ username: userName, password: password })
          }
        >
          Validate
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CheckCredentialModal;
