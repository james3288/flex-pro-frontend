import React, { useEffect, useState } from "react";
import FaceScanner from "../face-scanner/FaceScanner";
import Pic3 from "../../assets/img/team/team-3.jpg";
import instance from "../../others/axiosInstance";

const MyUserLoginSection = () => {
  const [play, setPlay] = useState(false);
  const [stop, setStop] = useState(false);
  const [disableBtn, setDisableBtn] = useState(false);
  const [userId, setUserId] = useState(0);
  const [sample, setSample] = useState(null);
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
                  {/* <svg
                  style={{ color: "gray" }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="100"
                  height="100"
                  fill="currentColor"
                  className="bi bi-camera-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                  <path d="M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4zm.5 2a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1m9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0" />
                </svg> */}
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
                    <img src={Pic3} alt="" className="scan-profile" />
                    <div className="scan-profile-name">
                      <h5>You are login as:</h5>
                      <h3>{userFound}</h3>

                      <h6>Time In: 2 minutes ago</h6>
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
                <button className="btn btn-danger">Back to Dashboard</button>
              </>
            </div>
          ) : isOnGoing === "expired" ? (
            <div className="col-lg-12 col-xs-12">
              <div className="dashboard-col">
                <span>
                  <strong>LOGIN</strong> STATUS
                </span>
                <div className="scan-profile-wrapper">
                  <img src={Pic3} alt="" className="scan-profile" />
                  <div className="scan-profile-name">
                    <h5>Oops, either you are expired or not registered yet!</h5>
                    <h3>{userFound}</h3>

                    <h6>
                      you may contact to the administrator for more info...
                    </h6>
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
