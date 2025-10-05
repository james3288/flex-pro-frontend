import React, { memo, useCallback } from "react";
import useUserLoginModalNumpad from "../hooks/useUserLoginModalNumpad";
import NumpadButton from "../../modals/NumpadButton";
import { useCurrentlyLoginStore } from "../store/currentlyLoginStore";
import { useNumpadStore } from "../store/numpadStore";

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
            <button
              className="btn btn-success"
              data-dismiss="modal"
              onClick={onLogin}
            >
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

const UserLoginIDVerificationModal = memo(({ users }) => {
  const {
    handleNumpadOnClick,
    handleDelOnClick,
    handleClearOnClick,
    handleEnterOnClick,
    handleLoginOnclick,
  } = useUserLoginModalNumpad();

  const [cUserFound] = useCurrentlyLoginStore((state) => [state.userFound]);
  const [cNumpadResult] = useNumpadStore((state) => [state.numpadResult]);

  // Avoid inline recreation for Enter handler
  const handleEnter = useCallback(() => {
    handleEnterOnClick({
      activeAndInactiveUsers: users?.activeAndInactiveUsers,
      flexProUserId: cNumpadResult,
    });
  }, [handleEnterOnClick, users, cNumpadResult]);

  const digits = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

  return (
    <div
      className="modal fade bd-example-modal-lg"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="myLargeModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content custom-modal-dialog">
          {/* header */}
          <div className="modal-header">
            <h5 className="modal-title">Enter your User ID here:</h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          {/* body */}
          <div className="modal-body">
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
                  onLogin={handleLoginOnclick}
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

          <div className="modal-footer"></div>
        </div>
      </div>
    </div>
  );
});

export default UserLoginIDVerificationModal;
