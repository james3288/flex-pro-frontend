import React, { useEffect, useState } from "react";
import FaceScanner from "../face-scanner/FaceScanner";
import Pic3 from "../../assets/img/team/team-3.jpg";
import instance from "../../others/axiosInstance";
import { NavLink } from "react-router-dom";
import getImagePath from "../../getData/getImagePath";
import loadImageData from "../../getData/loadImageData";

const MyUserLoginSection = () => {
  const [play, setPlay] = useState(false);
  const [stop, setStop] = useState(false);
  const [disableBtn, setDisableBtn] = useState(false);
  const [userId, setUserId] = useState(0);
  const [userFoundWithImage, setUserFoundWithImage] = useState();
  const [userFound, setUserFound] = useState();
  const [isOnGoing, setIsOnGoing] = useState();
  const [isLogin, setIsLogin] = useState(false);

  const handlePlayClick = () => {
    setPlay(() => !play);
    setDisableBtn(true);
  };

  const handleStopClick = () => {
    // setPlay(() => !play);
    setStop(() => !stop);
  };

  useEffect(() => {
    console.log(play);
  }, [play, stop, userId]);

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

  return (
    <>
      <div className="container content-margin">
        <div className="row">
          {/* scan face section */}
          <div className="col-lg-6 col-xs-12">
            {userId === 0 ? (
              <div className="dashboard-col">
                <span>
                  <strong>SCAN TO</strong> LOGIN USER
                </span>
                <div className="camera-wrapper">
                  {/* <FaceScanner playNow={play} /> */}
                  {play && (
                    <FaceScanner
                      playNow={play}
                      stopNow={stop}
                      setPlay={setPlay}
                      setUserId={setUserId}
                      setUserFound={setUserFound}
                      setIsOnGoing={setIsOnGoing}
                      isOnGoing={isOnGoing}
                      setIsLogin={setIsLogin}
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
                  <button className="btn btn-success">QR Code</button>
                  <button className="btn btn-danger" onClick={handleStopClick}>
                    Stop
                  </button>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
          {/* end scan face section */}

          {/* scan result section */}

          {userId > 0 && isOnGoing === "on-going" ? (
            <div className="col-lg-12 col-xs-12">
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
                      <h5>You are login as:</h5>
                      <h3>{userFoundWithImage.flex_pro_user?.name}</h3>
                    </div>
                  </div>
                </div>
                <div className="dashboard-col">
                  <div className="personal-trainer">
                    <h5>Personal Trainer</h5>
                    <h3>
                      Jeoseph Bejec - <strong>CARDIO EXPERT</strong>
                    </h3>
                  </div>

                  <div className="personal-trainer">
                    <h5>Subscription Remaining Days</h5>
                    <h3>10 DAYS</h3>
                  </div>
                </div>
                <NavLink className="btn btn-danger" to={"/"}>
                  Back to Dashboard
                </NavLink>
              </>
            </div>
          ) : isOnGoing === "expired" ? (
            <div className="col-lg-12 col-xs-12">
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

                    <a className="daypass-link">
                      Do you want to bypass and continue as Day Pass
                      Subscription?
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ) : isOnGoing === "already-login" ? (
            <div className="col-lg-12 col-xs-12">
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
                      <strong style={{ color: "orange" }}>
                        {userFoundWithImage.flex_pro_user?.name}
                      </strong>{" "}
                      has already login!
                    </h5>
                    <NavLink className="btn btn-danger" to={"/"}>
                      Back to Dashboard
                    </NavLink>
                  </div>
                </div>
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
      </div>
    </>
  );
};

export default MyUserLoginSection;
