import React, { memo, useCallback, useEffect } from "react";
import { Modal } from "react-bootstrap";
import useUserLoginModalNumpad from "../hooks/useUserLoginModalNumpad";
import NumpadButton from "../../modals/NumpadButton";
import { useCurrentlyLoginStore } from "../store/currentlyLoginStore";
import { useNumpadStore } from "../store/numpadStore";
import { useActiveCameraStore } from "../../../store/useActiveCamera";
import useToastifyMessageComponent from "./../../../customHooks/useToastifyMessageComponent";
import "../../../pages/userLoginPage/userLoginPage.scss";
import RemainingDaysLeftComponent from "../../mySection/forRenewal/RemainingDaysLeftComponent";
import { toUpperCase } from "zod";

const UserSubscriptionFoundComponent = ({ users, onLogin, onCancel }) => {
  if (!users)
    return <h4 className="text-danger">No Subscription has been found!</h4>;

  return (
    <>
      <h5>Check your subscription</h5>
      <div className="existing-subscription-result">
        {users.map((user) => (
          <div key={user.id} style={{ marginBottom: "10px" }}>
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
        ))}
      </div>
    </>
  );
};

const isMembership = ({ subscription }) => {
  if (subscription.toUpperCase() === "MEMBERSHIP") {
    return true;
  }

  return false;
};

const PrivateRemainingDays = ({ userSub }) => {
  const sub_desc = userSub?.subscription?.gym_rate_desc;
  if (isMembership({ subscription: sub_desc })) {
    return null;
  }

  return (
    <RemainingDaysLeftComponent
      date_subscribed={userSub?.date_subscribed}
      per={userSub?.subscription?.per?.per}
      user_id={userSub?.flexprouser?.id}
      session_days={userSub?.sub_session_days}
      subscriptionId={userSub?.id}
      id={userSub?.flexprouser?.id}
      fullname={userSub?.flexprouser?.name}
      fontColor={"#499c0d"}
      fontSize="18px"
    />
  );
};

const UserFoundComponent = ({
  user,
  onLogin,
  onCancel,
  users,
  handleLoginOnclick,
}) => {
  if (!user) return <h4 className="text-danger">No User has been found!</h4>;

  const userInfo = user?.usersubscription?.flexprouser;

  return (
    <>
      <h5>Check if it's you?</h5>
      <div className="existing-user-result">
        <img src={user?.image} alt="" className="existing-user-result-img" />
        <div>
          <h3 style={{ color: "yellowGreen" }}>{userInfo?.name}</h3>
          <div className="existing-subscription-result">
            {users?.map((user) => {
              const userSub = user?.usersubscription;
              return (
                <div key={user.id} style={{ marginBottom: "10px" }}>
                  <h5
                    style={{
                      color: isMembership({
                        subscription: userSub?.subscription?.gym_rate_desc,
                      })
                        ? "orange"
                        : "green",
                      fontSize: "22px",
                    }}
                  >
                    {userSub?.subscription?.gym_rate_desc}
                  </h5>
                  <PrivateRemainingDays userSub={userSub} />
                  {!isMembership({
                    subscription: userSub?.subscription?.gym_rate_desc,
                  }) && (
                    <div style={{ display: "flex", gap: "5px" }}>
                      <button
                        className="btn btn-success"
                        onClick={() => {
                          handleLoginOnclick({ userFound: user });
                          onLogin && onLogin();
                        }}
                      >
                        LOGIN
                      </button>
                      <button className="btn btn-danger" onClick={onCancel}>
                        CANCEL
                      </button>
                    </div>
                  )}
                  <hr />
                </div>
              );
            })}
          </div>
          {/* <h5>{user?.usersubscription?.subscription?.gym_rate_desc}</h5> */}
          {/* <div>
            <button className="btn btn-success" onClick={onLogin}>
              LOGIN
            </button>{" "}
            <button className="btn btn-danger" onClick={onCancel}>
              CANCEL
            </button>
          </div> */}
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
      handleEnterOnClick2,
      handleLoginOnclick,
    } = useUserLoginModalNumpad();

    const [cUserFound, cUserSubscriptionFound] = useCurrentlyLoginStore(
      (state) => [state.userFound, state.userSubscriptionFound],
    );
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

    // Avoid inline recreation for Enter handler
    const handleEnter2 = useCallback(() => {
      handleEnterOnClick2({
        activeAndInactiveUsers: users?.activeAndInactiveUsers,
        flexProUserId: cNumpadResult,
      });

      handleEnterOnClick({
        activeAndInactiveUsers: users?.activeAndInactiveUsers,
        flexProUserId: cNumpadResult,
      });
    }, [handleEnterOnClick2, handleEnterOnClick, users, cNumpadResult]);

    const digits = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

    return (
      <Modal
        show={show}
        onHide={onHide}
        size="lg"
        centered
        style={{ zIndex: "9999" }}
      >
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
                    // handleLoginOnclick();
                    // onLogin && onLogin();
                    onHide();
                  }}
                  onCancel={handleClearOnClick}
                  users={cUserSubscriptionFound}
                  handleLoginOnclick={handleLoginOnclick}
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
                  onClick={handleEnter2}
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
