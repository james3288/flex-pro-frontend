import React, { memo, useEffect, useState } from "react";
import useUserLoginModalNumpad from "../hooks/useUserLoginModalNumpad";
import useGetActiveAndInactiveUsers from "../../../hooks/useGetActiveAndInactiveUsers";
import NumpadButton from "../../modals/NumpadButton";
import { useCurrentlyLoginStore } from "../store/currentlyLoginStore";
import { useNumpadStore } from "../store/numpadStore";

const UserLoginIDVerificationModal = memo(
  ({
    setUserId,
    setIsOnGoing,
    setIsLogin,
    setTrainers,
    setUserFound,
    setSubscriptionRecord,
    users,
    // setFlexProUserId,
  }) => {
    const {
      // numpadResult,
      // userFound,
      flexProUserIdStorage,
      handleNumpadOnClick,
      handleDelOnClick,
      handleClearOnClick,
      handleEnterOnClick,
      handleLoginOnclick,
    } = useUserLoginModalNumpad();

    const [cUserFound] = useCurrentlyLoginStore((state) => [state.userFound]);
    const [cNumpadResult] = useNumpadStore((state) => [state.numpadResult]);

    const UserFoundComponent = () => {
      return (
        <>
          <h5>Check if it's you?</h5>
          <div className="existing-user-result">
            <img
              src={cUserFound?.image}
              alt=""
              className="existing-user-result-img"
            />
            <div>
              <h3>
                {cUserFound?.usersubscription.flexprouser?.id}
                {" - "}
                {cUserFound?.usersubscription.flexprouser?.name}
              </h3>
              <h5>
                {cUserFound?.usersubscription?.subscription?.gym_rate_desc}
              </h5>
              <div>
                <button
                  className="btn btn-success"
                  data-dismiss="modal"
                  onClick={handleLoginOnclick}
                >
                  LOGIN
                </button>{" "}
                <button className="btn btn-danger" onClick={handleClearOnClick}>
                  CANCEL
                </button>
              </div>
            </div>
          </div>
        </>
      );
    };

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
                  {cUserFound ? (
                    <UserFoundComponent />
                  ) : (
                    <h4 className="text-danger">No User has been found!</h4>
                  )}
                </div>
              </div>
              <div className="row">
                {/* first row */}
                <NumpadButton
                  number="1"
                  handleNumpadOnClick={handleNumpadOnClick}
                />
                <NumpadButton
                  number="2"
                  handleNumpadOnClick={handleNumpadOnClick}
                />
                <NumpadButton
                  number="3"
                  handleNumpadOnClick={handleNumpadOnClick}
                />

                {/* second row */}
                <NumpadButton
                  number="4"
                  handleNumpadOnClick={handleNumpadOnClick}
                />
                <NumpadButton
                  number="5"
                  handleNumpadOnClick={handleNumpadOnClick}
                />
                <NumpadButton
                  number="6"
                  handleNumpadOnClick={handleNumpadOnClick}
                />

                {/* third row */}
                <NumpadButton
                  number="7"
                  handleNumpadOnClick={handleNumpadOnClick}
                />
                <NumpadButton
                  number="8"
                  handleNumpadOnClick={handleNumpadOnClick}
                />
                <NumpadButton
                  number="9"
                  handleNumpadOnClick={handleNumpadOnClick}
                />
                <NumpadButton
                  number="0"
                  handleNumpadOnClick={handleNumpadOnClick}
                />

                {/* clear or delete */}
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
                    onClick={() =>
                      handleEnterOnClick({
                        activeAndInactiveUsers: users?.activeAndInactiveUsers,
                        flexProUserId: cNumpadResult,
                      })
                    }
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
  }
);

export default UserLoginIDVerificationModal;
