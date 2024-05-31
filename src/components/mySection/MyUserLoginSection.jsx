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

const MyUserLoginSection = () => {
  const [play, setPlay] = useState(false);
  const [stop, setStop] = useState(false);
  const [disableBtn, setDisableBtn] = useState(false);
  const [userId, setUserId] = useState(0);
  const [userFoundWithImage, setUserFoundWithImage] = useState();
  const [userFound, setUserFound] = useState();
  const [isOnGoing, setIsOnGoing] = useState();
  const [trainers, setTrainers] = useState();
  const [isLogin, setIsLogin] = useState(false);
  const cUser = useUserStore((state) => state.user);
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

  const showUserIdModal = () => {};

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
                  // <FaceScanner
                  //   playNow={play}
                  //   stopNow={stop}
                  //   setPlay={setPlay}
                  //   setUserId={setUserId}
                  //   setUserFound={setUserFound}
                  //   setIsOnGoing={setIsOnGoing}
                  //   isOnGoing={isOnGoing}
                  //   setIsLogin={setIsLogin}
                  //   setTrainers={setTrainers}
                  // />
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
                  />
                )}
              </div>
              <div className="camera-btn">
                <button
                  className="btn btn-success enabled"
                  onClick={handlePlayClick}
                  disabled={disableBtn}
                >
                  Face Recognition
                </button>
                <button
                  className="btn btn-success enabled"
                  // onClick={handlePlayClick}
                  disabled={disableBtn}
                  data-toggle="modal"
                  data-target=".bd-example-modal-lg"
                >
                  Login User ID
                </button>
                {/* <button className="btn btn-success">QR Code</button> */}
                <form action="">
                  <button
                    className="btn btn-danger"
                    style={{ zIndex: "9999" }}
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

          {/* USER ID HAS BEEN FOUND */}
          {userId > 0 && isOnGoing === "on-going" ? (
            <div className="col-lg-6 col-xs-12">
              <>
                <div className="dashboard-col">
                  <span>
                    <strong>LOGIN</strong> STATUS
                  </span>
                  <div className="scan-profile-wrapper">
                    <img
                      src={userFoundWithImage?.image}
                      alt=""
                      className="scan-profile"
                    />
                    <div className="scan-profile-name">
                      <h3 style={{ color: "yellowgreen" }}>
                        YOU ARE LOGIN AS:
                      </h3>
                      <h5 style={{ color: "white" }}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="50"
                          height="50"
                          fill="currentColor"
                          className="bi bi-check-circle-fill"
                          viewBox="0 0 16 16"
                          style={{ color: "yellowgreen" }}
                        >
                          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                        </svg>{" "}
                        {userFoundWithImage.flex_pro_user?.name}
                      </h5>
                    </div>
                  </div>
                </div>
                <div className="dashboard-col">
                  <div className="personal-trainer">
                    <h5>Free Personal Trainer:</h5>
                    {/* <h3>
                      Jeoseph Bejec - <strong>CARDIO EXPERT</strong>
                    </h3> */}

                    <h3>
                      {trainers.usersubscription?.trainer?.name} -{" "}
                      <strong>
                        {trainers.usersubscription?.trainer?.position}
                      </strong>{" "}
                      <br />
                      <strong style={{ color: "orange" }}>
                        {personalTrainerDaysLeft(
                          trainers.usersubscription?.trainer?.name,
                          "remaining-days",
                          cTrainersRemainingDays,
                          cSessionDays
                        )}
                      </strong>
                    </h3>
                  </div>

                  <div className="personal-trainer">
                    <h5>Subscription Remaining Days:</h5>
                    <h3 style={{ color: "yellowgreen" }}>
                      {/* {trainers?.extendedSubDays} day/s  */}
                      {/* {cUser?.extendedSubDays} day/s */}
                      {cLoginUsingId === true
                        ? getSubscriptionDaysLeft(
                            cSubscriptionRemainingDays,
                            cExtendedSubscription,
                            cDateSubscribed,
                            false
                          )
                        : cUser?.extendedSubDays + " day/s"}
                    </h3>
                  </div>
                  <div className="personal-trainer">
                    <h5>Extended Trainer:</h5>
                    {trainers?.extendedTrainer?.map((extended) => (
                      <h6 style={{ color: "yellowgreen" }} key={extended?.id}>
                        {extended.trainer?.name} -{" "}
                        {FormatDate(extended?.date_extend)}
                      </h6>
                    ))}
                    <div className="trainerRemainingDays">
                      <TrainerRemainingDays
                        trainerRemainingDays={cTrainersRemainingDays}
                        session_days={cSessionDays}
                        extendedTrainer={cExtendedTrainer}
                        trainers={trainers.usersubscription?.trainer?.name}
                        totalFreeTrainerLeft={totalFreeTrainerLeft}
                        setTotalFreeTrainerLeft={setTotalFreeTrainerLeft}
                      />
                    </div>
                  </div>
                </div>
                <div class="back-to-dashboard">
                  {/* <NavLink className="btn btn-danger" to={"/"}>
                    Back to Dashboard
                  </NavLink> */}
                  {/* <form action=""> */}
                  <button className="btn btn-success" onClick={handleRefresh}>
                    PROCEED
                  </button>
                  {/* </form> */}
                </div>
              </>
            </div>
          ) : // EITHER EXPIRED OR NOT REGISTERED YET
          isOnGoing === "expired2" ? (
            <div className="col-lg-6 col-xs-12">
              <div className="dashboard-col">
                <span>
                  <strong>LOGIN</strong> STATUS
                </span>
                <div className="scan-profile-wrapper">
                  <img
                    src={userFoundWithImage?.image}
                    alt=""
                    className="scan-profile"
                  />
                  <div className="scan-profile-name">
                    <h5>
                      Oops, either you are expired or not registered in
                      subscription yet!
                    </h5>
                    <h3>{userFound}</h3>

                    <a
                      className="btn btn-success"
                      href=""
                      style={{ padding: "10px 20px", fontSize: "20px" }}
                    >
                      Refresh
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ) : // ALREADY LOGIN
          isOnGoing === "already-login" ? (
            <div className="col-lg-6 col-xs-12">
              <div className="dashboard-col">
                <span>
                  <strong>LOGIN</strong> STATUS
                </span>

                <div className="scan-profile-wrapper">
                  <img
                    src={userFoundWithImage?.image}
                    alt=""
                    className="scan-profile"
                  />
                  <div className="scan-profile-name">
                    <h5 style={{ color: "orange" }}>
                      <strong style={{ color: "white" }}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="32"
                          height="32"
                          fill="currentColor"
                          className="bi bi-exclamation-circle-fill"
                          viewBox="0 0 16 16"
                          style={{ color: "orange" }}
                        >
                          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4m.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2" />
                        </svg>{" "}
                        {userFoundWithImage.flex_pro_user?.name}
                      </strong>{" "}
                      has already login!
                    </h5>
                  </div>
                </div>
              </div>

              <div class="back-to-dashboard">
                {/* <NavLink className="btn btn-danger" to={"/"}>
                    Back to Dashboard
                  </NavLink> */}
                {/* <form action=""> */}
                <button className="btn btn-success" onClick={handleRefresh}>
                  PROCEED
                </button>
                {/* </form> */}
              </div>
            </div>
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
        />
      </div>
    </>
  );
};

export default MyUserLoginSection;
