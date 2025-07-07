import React, { useEffect, useState } from "react";
import FaceScannerNew from "../face-scanner/FaceScannerNew";
import { NavLink } from "react-router-dom";
import { useUserStore } from "../../store/useUserStore";
import { useDayPassStore } from "../../store/useDayPassStore";
import UserLoginModal from "../modals/UserLoginModal";
import DayPassLoginModal from "../modals/DayPassLoginModal";
import LoginMessageAlert from "../LoginMessageAlert/LoginMessageAlert";
import LoginMessageAlertDayPass from "../LoginMessageAlert/LoginMessageAlertDayPass";
import Pic from "../../assets/img/dummy.png";
import getImagePath from "../../getData/getImagePath";
import loadImageData from "../../getData/loadImageData";

const MyUserLoginSection = () => {
  const [play, setPlay] = useState(false);
  const [stop, setStop] = useState(false);
  const [disableBtn, setDisableBtn] = useState(false);
  const [userId, setUserId] = useState(0);
  const [userFoundWithImage, setUserFoundWithImage] = useState();
  const [userFound, setUserFound] = useState();
  const [isOnGoing, setIsOnGoing] = useState("");
  const [isExpired, setIsExpired] = useState();
  const [trainers, setTrainers] = useState();
  const [isLogin, setIsLogin] = useState(false);
  const [dayPassLogin, setDayPassLogin] = useState(false);
  const [subscriptionRecord, setSubscriptionRecord] = useState({});
  const [totalFreeTrainerLeft, setTotalFreeTrainerLeft] = useState(0);

  // Zustand stores
  const cUser = useUserStore((state) => state.user);
  const cTrainersRemainingDays = useUserStore(
    (state) => state.trainersRemainingDays
  );
  const cSessionDays = useUserStore((state) => state.sessionDays);
  const cExtendedTrainer = useUserStore((state) => state.extendedTrainer);
  const cDateSubscribed = useUserStore((state) => state.dateSubscribed);
  const cSubscriptionRemainingDays = useUserStore(
    (state) => state.subscriptionRemainingDays
  );
  const cExtendedSubscription = useUserStore(
    (state) => state.extendedSubscription
  );
  const cLoginUsingId = useUserStore((state) => state.loginUsingId);

  // Day pass store
  const {
    isLogin: islogin2,
    dayPassName,
    isAlreadyLogin,
    remainingHours,
    personalTrainer,
    subscriptionName,
    setDayPassUserId,
    setModalTitle,
    setIsAlreadyLogin,
    setIsLogin: setIsLogin2,
  } = useDayPassStore((state) => ({
    isLogin: state.isLogin,
    dayPassName: state.dayPassName,
    isAlreadyLogin: state.isAlreadyLogin,
    remainingHours: state.remainingHours,
    personalTrainer: state.personalTrainer,
    subscriptionName: state.subscriptionName,
    setDayPassUserId: state.setDayPassUserId,
    setModalTitle: state.setModalTitle,
    setIsAlreadyLogin: state.setIsAlreadyLogin,
    setIsLogin: state.setIsLogin,
  }));

  // Handlers
  const handlePlayClick = () => {
    setPlay((prev) => !prev);
    setDisableBtn(true);
  };

  const handleStopClick = () => {
    setStop((prev) => !prev);
  };

  const handleRefresh = (e) => {
    if (e) e.preventDefault();
    setUserId(0);
    setIsOnGoing("");
    setIsAlreadyLogin(false);
    setIsLogin2(false);
    setDisableBtn(false);
    setPlay(false);
    setStop(false);
    setUserFoundWithImage(undefined);
    setUserFound(undefined);
    setTrainers(undefined);
    setIsExpired(undefined);
    setSubscriptionRecord({});
    setDayPassLogin(false);
  };

  const handleDayPassLoginClick = async () => {
    await setDayPassUserId("daypass-login-modal");
    await setModalTitle("Daypass Login");
  };

  useEffect(() => {
    // Simulate fetching user image data when userId changes
    const userWithImg = async () => {
      // Replace with your actual image fetching logic
      let imgData = await getImagePath(userId);
      const imageDataUrl = await loadImageData(imgData?.image1);
      let newImgData = { ...imgData, image: imageDataUrl };
      setUserFoundWithImage(newImgData);
    };
    if (userId) userWithImg();
  }, [userId]);

  // Props for child components
  const props = {
    userFoundWithImage,
    cUser,
    cTrainersRemainingDays,
    cSessionDays,
    cExtendedTrainer,
    cDateSubscribed,
    totalFreeTrainerLeft,
    setTotalFreeTrainerLeft,
    handleRefresh,
    isOnGoing,
    subscriptionRecord,
  };

  const daypassProps = {
    pic: Pic,
    isOnGoing,
    dayPassName,
    personalTrainer,
    handleRefresh,
    remainingHours,
    subscriptionName,
  };

  return (
    <div className="container-fluid content-margin">
      <div className="row">
        {/* scan face section */}
        <div className="col-lg-6 col-xs-12">
          <div className="dashboard-col">
            <span>
              <strong>SCAN TO</strong> LOGIN USER
            </span>
            <div className="camera-wrapper">
              {play && (
                <FaceScannerNew
                  playNow={play}
                  stopNow={stop}
                  setPlay={setPlay}
                  setUserId={setUserId}
                  setUserFound={setUserFound}
                  setIsOnGoing={setIsOnGoing}
                  isOnGoing={isOnGoing}
                  setIsLogin={setIsLogin}
                  setTrainers={setTrainers}
                  isLogin={isLogin}
                  setIsExpired={setIsExpired}
                  setSubscriptionRecord={setSubscriptionRecord}
                />
              )}
            </div>
            <div className="camera-btn">
              <button
                className="btn btn-success enabled"
                onClick={handlePlayClick}
                disabled={disableBtn}
                style={{ zIndex: "9999" }}
                type="button"
              >
                Face Recognition
              </button>
              <button
                className="btn btn-success enabled"
                data-toggle="modal"
                data-target=".bd-example-modal-lg"
                style={{ zIndex: "9999" }}
                type="button"
              >
                Login User ID
              </button>
              <button
                className="btn btn-success enabled"
                data-toggle="modal"
                data-target="#daypass-login-modal"
                onClick={handleDayPassLoginClick}
                style={{ zIndex: "9999" }}
                type="button"
              >
                Login Daypass
              </button>
              <button
                className="btn btn-danger"
                onClick={handleRefresh}
                style={{ zIndex: "9999" }}
                type="button"
              >
                Refresh
              </button>
            </div>
          </div>
        </div>
        {/* end scan face section */}

        {/* scan result section */}
        {isOnGoing === "on-going" && userId > 0 ? (
          <LoginMessageAlert {...props} message={"Successfully login!"} />
        ) : isOnGoing === "already-login" && dayPassLogin === false ? (
          <LoginMessageAlert
            {...props}
            message={"You are currently logged in!"}
          />
        ) : isOnGoing === "on-going" &&
          dayPassLogin === true &&
          isAlreadyLogin === false ? (
          <LoginMessageAlertDayPass
            {...daypassProps}
            message="Daypass successfully login!"
          />
        ) : isOnGoing === "already-login" &&
          dayPassLogin === true &&
          isAlreadyLogin === true ? (
          <LoginMessageAlertDayPass
            {...daypassProps}
            message={"You are currently logged in!"}
          />
        ) : (
          <div className="col-lg-6 col-xs-12">
            <div className="dashboard-col">
              <span>
                <strong>LOGIN</strong> STATUS
              </span>
              <div className="scan-profile-wrapper">
                <div className="scan-profile-name">
                  <h5>Waiting for user...</h5>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* end scan result section */}
      </div>

      <UserLoginModal
        setUserId={setUserId}
        setIsOnGoing={setIsOnGoing}
        setIsLogin={setIsLogin}
        setTrainers={setTrainers}
        setUserFound={setUserFound}
        setSubscriptionRecord={setSubscriptionRecord}
      />

      <DayPassLoginModal
        setIsOnGoing={setIsOnGoing}
        setDayPassLogin={setDayPassLogin}
      />
    </div>
  );
};

export default MyUserLoginSection;
