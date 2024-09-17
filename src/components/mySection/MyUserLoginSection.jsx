import React, { useEffect, useState } from "react";
import FaceScanner from "../face-scanner/FaceScanner";
import Pic3 from "../../assets/img/team/team-3.jpg";
import instance from "../../others/axiosInstance";
import { NavLink } from "react-router-dom";
import getImagePath from "../../getData/getImagePath";
import loadImageData from "../../getData/loadImageData";
import FormatDate from "../../others/FormatDate";
import UserLoginModal from "../modals/UserLoginModal";
import FaceScannerNew from "../face-scanner/FaceScannerNew";
import { useUserStore } from "../../store/useUserStore";
import personalTrainerDaysLeft from "../../getData/personalTrainerDaysLeft";
import getExtendedTrainer from "../../getData/getExtendedTrainer";
import TrainerRemainingDays from "./forRenewal/TrainerRemainingDays";
import getSubscriptionDaysLeft from "../../getData/getSubscriptionDaysLeft";
import { useDayPassStore } from "../../store/useDayPassStore";
import DayPassLoginModal from "../modals/DayPassLoginModal";
import Pic from "./../../../src/assets/img/dummy.png";
import ExclamationSvg from "./../svg/exclamationSvg";
import CheckCircleFillSvg from "./../svg/checkCircleFillSvg";
import LoadingEffect from "./loadingEffect/LoadingEffect";
import LoginMessageAlert from "../LoginMessageAlert/LoginMessageAlert";
import LoginMessageAlertDayPass from "../LoginMessageAlert/LoginMessageAlertDayPass";

const MyUserLoginSection = () => {
  const [play, setPlay] = useState(false);
  const [stop, setStop] = useState(false);
  const [disableBtn, setDisableBtn] = useState(false);
  const [userId, setUserId] = useState(0);
  const [userFoundWithImage, setUserFoundWithImage] = useState();
  const [userFound, setUserFound] = useState();
  const [isOnGoing, setIsOnGoing] = useState();
  const [isExpired, setIsExpired] = useState();
  const [trainers, setTrainers] = useState();
  const [isLogin, setIsLogin] = useState(false);
  const cUser = useUserStore((state) => state.user);
  const [dayPassLogin, setDayPassLogin] = useState(false);

  const cTrainersRemainingDays = useUserStore(
    (state) => state.trainersRemainingDays
  );

  const cSessionDays = useUserStore((state) => state.sessionDays);
  // const cSetExtendedTrainer = useUserStore((state) => state.setExtendedTrainer);
  const cExtendedTrainer = useUserStore((state) => state.extendedTrainer);
  const cSubscriptionRemainingDays = useUserStore(
    (state) => state.subscriptionRemainingDays
  );
  const cDateSubscribed = useUserStore((state) => state.dateSubscribed);
  const cExtendedSubscription = useUserStore(
    (state) => state.extendedSubscription
  );
  const cLoginUsingId = useUserStore((state) => state.loginUsingId);

  const [totalFreeTrainerLeft, setTotalFreeTrainerLeft] = useState(0);

  //getter
  const {
    isLogin: islogin2,
    dayPassName,
    isAlreadyLogin,
    remainingHours,
    personalTrainer,
    subscriptionName,
  } = useDayPassStore((state) => ({
    isLogin: state.isLogin,
    dayPassName: state.dayPassName,
    isAlreadyLogin: state.isAlreadyLogin,
    remainingHours: state.remainingHours,
    personalTrainer: state.personalTrainer,
    subscriptionName: state.subscriptionName,
  }));
  //setter
  const { setDayPassUserId, setModalTitle, setIsAlreadyLogin } =
    useDayPassStore((state) => ({
      setDayPassUserId: state.setDayPassUserId,
      setModalTitle: state.setModalTitle,
      setIsAlreadyLogin: state.setIsAlreadyLogin,
    }));

  const setIsLogin2 = useDayPassStore((state) => state.setIsLogin);

  const handlePlayClick = () => {
    setPlay(() => !play);
    setDisableBtn(true);
  };

  const handleStopClick = () => {
    // setPlay(() => !play);
    setStop(() => !stop);
  };

  const handleRefresh = () => {
    setUserId(0);
    setIsOnGoing("");
    setIsAlreadyLogin(false);
    setIsLogin2(false);
  };

  const handleDayPassLoginClick = async () => {
    await setDayPassUserId("daypass-login-modal");
    await setModalTitle("Daypass Login");
  };

  // useEffect(() => {
  //   console.log(play);
  // }, [play, stop, userId]);

  useEffect(() => {
    const userWithImg = async () => {
      let imgData = await getImagePath(userId);

      const imageDataUrl = await loadImageData(imgData?.image1);
      let newImgData = { ...imgData, image: imageDataUrl };
      setUserFoundWithImage(newImgData);
    };

    userWithImg();

    // trainer
  }, [userId]);

  // props
  const props = {
    userFoundWithImage: userFoundWithImage,
    cUser: cUser,
    cTrainersRemainingDays: cTrainersRemainingDays,
    cSessionDays: cSessionDays,
    cExtendedTrainer: cExtendedTrainer,
    cDateSubscribed: cDateSubscribed,
    totalFreeTrainerLeft: totalFreeTrainerLeft,
    setTotalFreeTrainerLeft: setTotalFreeTrainerLeft,
    handleRefresh: handleRefresh,
    isOnGoing: isOnGoing,
  };

  // daypass props
  const daypassProps = {
    pic: Pic,
    isOnGoing: isOnGoing,
    dayPassName: dayPassName,
    personalTrainer: personalTrainer,
    handleRefresh: handleRefresh,
    remainingHours: remainingHours,
    subscriptionName: subscriptionName,
  };

  return (
    <>
      <div className="container-fluid content-margin">
        <div className="row">
          {/* scan face section */}
          <div className="col-lg-6 col-xs-12">
            {/* {userId === 0 ? ( */}
            <div className="dashboard-col">
              <span>
                <strong>SCAN TO</strong> LOGIN USER
              </span>
              <div className="camera-wrapper">
                {/* <FaceScanner playNow={play} /> */}
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
                  />
                )}
              </div>
              <div className="camera-btn">
                <button
                  className="btn btn-success enabled"
                  onClick={handlePlayClick}
                  disabled={disableBtn}
                  style={{ zIndex: "9999" }}
                >
                  Face Recognition
                </button>
                <button
                  className="btn btn-success enabled"
                  // onClick={handlePlayClick}
                  // disabled={disableBtn}
                  data-toggle="modal"
                  data-target=".bd-example-modal-lg"
                  style={{ zIndex: "9999" }}
                >
                  Login User ID
                </button>
                <button
                  className="btn btn-success enabled"
                  data-toggle="modal"
                  data-target="#daypass-login-modal"
                  onClick={handleDayPassLoginClick}
                  style={{ zIndex: "9999" }}
                >
                  Login Daypass
                </button>
                {/* <button className="btn btn-success">QR Code</button> */}
                <form action="" style={{ zIndex: "9999" }}>
                  <button
                    className="btn btn-danger"
                    //onClick={handleStopClick}
                  >
                    Refresh
                  </button>
                </form>
              </div>
            </div>
            {/* ) : (
              ""
            )} */}
          </div>
          {/* end scan face section */}

          {/* scan result section */}

          {/* IF USER ID HAS BEEN FOUND AND NOT LOGIN YET*/}
          {isOnGoing === "on-going" && userId > 0 ? (
            <LoginMessageAlert {...props} message={"Successfully login!"} />
          ) : // IF USER HAS ALREADY LOGIN
          isOnGoing === "already-login" && dayPassLogin === false ? (
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
          ) : // DAYPASS ALREADY LOGIN
          isOnGoing === "already-login" &&
            dayPassLogin === true &&
            isAlreadyLogin === true ? (
            <LoginMessageAlertDayPass
              {...daypassProps}
              message={"You are currently logged in!"}
            />
          ) : (
            // DEFAULT
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
        />
      </div>

      <DayPassLoginModal
        setIsOnGoing={setIsOnGoing}
        setDayPassLogin={setDayPassLogin}
      />
    </>
  );
};

export default MyUserLoginSection;
