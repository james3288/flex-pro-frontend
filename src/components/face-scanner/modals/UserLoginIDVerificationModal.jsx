import React, { memo, useCallback } from "react";
import { Modal } from "react-bootstrap";
import useUserLoginModalNumpad from "../hooks/useUserLoginModalNumpad";
import NumpadButton from "../../modals/NumpadButton";
import { useCurrentlyLoginStore } from "../store/currentlyLoginStore";
import { useNumpadStore } from "../store/numpadStore";
import { useActiveCameraStore } from "../../../store/useActiveCamera";
import useToastifyMessageComponent from "./../../../customHooks/useToastifyMessageComponent";
import "../../../pages/userLoginPage/userLoginPage.scss";

const UserFoundComponent = ({ user, onLogin, onCancel }) => {
  if (!user) return <h4 className="text-danger">No User has been found!</h4>;

  return (
    <>
      <h5>Check if it's you?</h5>
      <div className="existing-user-result">
        <img src={user?.image} alt="" className="existing-user-result-img" />
        <div>
          <h3>
            {user?.usersubscription?.flexprouser?.id} -{" "}
            {user?.usersubscription?.flexprouser?.name}
          </h3>
          <h5>{user?.usersubscription?.subscription?.gym_rate_desc}</h5>
          <div>
            <button className="btn btn-success" onClick={onLogin}>
              LOGIN
            </button>{" "}
            <button className="btn btn-danger" onClick={onCancel}>
              CANCEL
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const UserLoginIDVerificationModal = memo(
  ({ show, onHide, users, onLogin }) => {
    const {
      handleNumpadOnClick,
      handleDelOnClick,
      handleClearOnClick,
      handleEnterOnClick,
      handleLoginOnclick,
    } = useUserLoginModalNumpad();

    const [cUserFound] = useCurrentlyLoginStore((state) => [state.userFound]);
    const [cNumpadResult] = useNumpadStore((state) => [state.numpadResult]);
    const [cHasVideoOutput] = useActiveCameraStore((state) => [
      state.hasVideoOutput,
    ]);

    // Avoid inline recreation for Enter handler
    const handleEnter = useCallback(() => {
      handleEnterOnClick({
        activeAndInactiveUsers: users?.activeAndInactiveUsers,
        flexProUserId: cNumpadResult,
      });
    }, [handleEnterOnClick, users, cNumpadResult]);

    const digits = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

    return (
      <Modal show={show} onHide={onHide} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Enter your User ID here:</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="custom-modal-dialog">
            <div className="row user-id-row">
              <div className="col-4">
                <h4>
                  USER ID:{" "}
                  <span style={{ fontSize: "2em" }}>{cNumpadResult}</span>
                </h4>
              </div>

              <div className="col-8 existing-user">
                <UserFoundComponent
                  user={cUserFound}
                  onLogin={() => {
                    handleLoginOnclick();
                    onLogin && onLogin();
                    onHide();
                  }}
                  onCancel={handleClearOnClick}
                />
              </div>
            </div>

            {/* numpad */}
            <div className="row">
              {digits.map((digit) => (
                <NumpadButton
                  key={digit}
                  number={digit}
                  handleNumpadOnClick={handleNumpadOnClick}
                />
              ))}

              {/* control buttons */}
              <div className="col-3 numpad-col">
                <button
                  className="btn btn-secondary numpad"
                  onClick={handleDelOnClick}
                >
                  Del
                </button>
              </div>
              <div className="col-3 numpad-col">
                <button
                  className="btn btn-success numpad"
                  onClick={handleClearOnClick}
                >
                  Clear
                </button>
              </div>
              <div className="col-6 numpad-col">
                <button
                  className="btn btn-warning numpad"
                  onClick={handleEnter}
                >
                  Enter
                </button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    );
  },
);

export default UserLoginIDVerificationModal;
