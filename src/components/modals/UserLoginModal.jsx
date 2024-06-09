import React, { useEffect, useState } from "react";
import NumpadButton from "./NumpadButton";
import getActiveUsers from "../../getData/getActiveUsers";
import remainingDays from "../../others/GetRemainingDays";
import GetUserStatus from "../../getData/getUserStatus";
import CheckIfAlreadyIn from "../../getData/checkIfAlreadyLogin";
import PostSaveTimeRecords from "../../postData/postSaveTimeRecords";
import LoadingEffect from "../mySection/loadingEffect/LoadingEffect";
import { useUserStore } from "../../store/useUserStore";
import getExtendedSubscription from "../../getData/getExtendedSubscription";
import getExtendedTrainer from "../../getData/getExtendedTrainer";

const UserLoginModal = ({
  setUserId,
  setIsOnGoing,
  setIsLogin,
  setTrainers,
  setUserFound,
}) => {
  const [numpadResult, setNumpadResult] = useState("");
  const [activeUser, setActiveUser] = useState(null);
  const [rDays, setRDays] = useState(null);
  const [savedTimeRecord, setSavedTimeRecord] = useState(false);
  const [timeInStatus, setTimeInStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const buttonStyle = "btn btn-success";

  const cSetUser = useUserStore((state) => state.setUser);
  const cSetTrainerRemainingDays = useUserStore(
    (state) => state.setTrainerRemainingDays
  );
  const cSetSessionDays = useUserStore((state) => state.setSessionDays);

  const cUser = useUserStore((state) => state.user);
  const cSetExtendedTrainer = useUserStore((state) => state.setExtendedTrainer);
  const cSetSubscriptionRemainingDays = useUserStore(
    (state) => state.setSubscriptionRemainingDays
  );
  const cSetExtendedSubscription = useUserStore(
    (state) => state.setExtendedSubscription
  );
  const cSetDateSubscribed = useUserStore((state) => state.setDateSubscribed);
  const cSetLoginUsingId = useUserStore((state) => state.setLoginUsingId);

  const handleNumpadOnClick = (e) => {
    setNumpadResult((prev) => prev + e.target.value);
  };

  const handleDelOnClick = () => {
    setNumpadResult((prev) => prev.slice(0, -1));
  };

  const handleClearOnClick = () => {
    setNumpadResult("");
    setActiveUser(null);
  };

  const get_active_user = async () => {
    return getActiveUsers();
  };

  const handleEnterOnClick = async (id) => {
    setIsLoading(true);
    const user = await get_active_user();

    const newUser = user.filter((u) => u.usersubscription.flexprouser?.id == id);
    setActiveUser(newUser);

    console.log("ACTIVE USER", newUser);
    setIsLoading(false);
  };

  const handleLoginOnclick = async () => {
    setUserId(activeUser[0]?.usersubscription.flexprouser?.id);
    setUserFound(activeUser[0]?.usersubscription.flexprouser?.name);

    // check if user have subscription
    const get_userStatus = await GetUserStatus(
      activeUser[0]?.usersubscription.flexprouser?.id
    );

    // already login function
    const isAlreadyLogin = await CheckIfAlreadyIn(
      activeUser[0]?.usersubscription.flexprouser?.id
    );

    // check if already login
    if (isAlreadyLogin?.length > 0) {
      setIsLogin(true);
      setIsOnGoing("already-login");
      return;
    }

    // og wala pa ka login
    const getUserStatus = async () => {
      let record = null;
      get_userStatus.map((userStatus) => {
        if (userStatus.status === "on-going") {
          record = {
            id: userStatus.usersubscription?.id,
            time_in: new Date(),
            time_out: new Date(1990, 0, 1, 0, 0),
          };

          // setTrainers(() => userStatus);
        }
      });
      return record;
    };

    const userStatusResult = await getUserStatus();

    if (userStatusResult != null && savedTimeRecord === false) {
      console.log(userStatusResult);
      const saved = await PostSaveTimeRecords(
        userStatusResult,
        setTimeInStatus,
        setIsOnGoing
      );
      setSavedTimeRecord(saved);

      return;
    } else {
      setIsOnGoing("expired");
    }
  };

  // get the remaining days
  const getRemainingDays = async (date_subscribed, per, user_id) => {
    // setRDays(await remainingDays(date_subscribed, per, user_id));

    cSetSubscriptionRemainingDays(
      await remainingDays(date_subscribed, per, user_id)
    );
  };

  const extendedSub = async (subscriptionId) => {
    try {
      const data = await getExtendedSubscription(subscriptionId);
      cSetExtendedSubscription(data);
    } catch (error) {
      console.error("Error in fetching Extended Subscription:", error);
    }
  };

  const extendedT = async (userSubscriptionId) => {
    try {
      const data = await getExtendedTrainer(userSubscriptionId);
      cSetExtendedTrainer(data);
    } catch (error) {
      console.error("Error in fetchData:", error);
    }
  };

  // USE EFFECT
  useEffect(() => {
    if (activeUser?.length > 0) {
      console.log("USE EFFECT ACTIVE USER", activeUser[0]);
      //get remaining subscription
      getRemainingDays(
        activeUser[0].usersubscription?.date_subscribed,
        activeUser[0].usersubscription?.subscription?.per?.per,
        activeUser[0].usersubscription?.flexprouser?.id
      );

      // get trainer remaining days
      cSetTrainerRemainingDays(activeUser[0].trainersRemainingDays);

      // get training session
      cSetSessionDays(activeUser[0].usersubscription.session_days);

      extendedT(activeUser[0].usersubscription.id);

      // get extended subscription
      extendedSub(activeUser[0].usersubscription?.id);

      // date subscribe
      cSetDateSubscribed(activeUser[0].usersubscription?.date_subscribed);

      //set if login using id
      cSetLoginUsingId(true);

      setTrainers(activeUser[0]);
    }
  }, [activeUser]);

  // END USEEFFECT

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
                  {/* <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="50"
                    height="50"
                    fill="currentColor"
                    className="bi bi-card-image"
                    style={{ color: "green" }}
                    viewBox="0 0 16 16"
                  >
                    <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                    <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54L1 12.5v-9a.5.5 0 0 1 .5-.5z" />
                  </svg>{" "} */}
                  <span style={{ fontSize: "2em" }}>{numpadResult}</span>
                </h4>
              </div>

              <div className="col-8 existing-user">
                {isLoading && <LoadingEffect />}
                {activeUser?.length > 0 ? (
                  <>
                    <h5>Check if it's you?</h5>
                    <div className="existing-user-result">
                      <img
                        src={activeUser[0]?.image}
                        alt=""
                        className="existing-user-result-img"
                      />
                      <div>
                        <h3>
                          {" "}
                          {activeUser[0]?.usersubscription.flexprouser?.id}
                          {" - "}
                          {activeUser[0]?.usersubscription.flexprouser?.name}
                        </h3>
                        <h5>
                          {
                            activeUser[0]?.usersubscription?.subscription
                              ?.gym_rate_desc
                          }
                        </h5>
                        <div>
                          <button
                            className="btn btn-success"
                            data-dismiss="modal"
                            onClick={handleLoginOnclick}
                          >
                            LOGIN
                          </button>{" "}
                          <button
                            className="btn btn-danger"
                            onClick={handleClearOnClick}
                          >
                            CANCEL
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  activeUser != null &&
                  activeUser.length === 0 && (
                    <h4 className="text-danger">No User has been found!</h4>
                  )
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
                  onClick={() => handleEnterOnClick(numpadResult)}
                >
                  Enter
                </button>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            {/* <button type="button" className="btn btn-primary">
              Save changes
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLoginModal;
