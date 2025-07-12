import UserLoginModal from "../modals/UserLoginModal";
import FaceScannerNew from "../face-scanner/FaceScannerNew";
import DayPassLoginModal from "../modals/DayPassLoginModal";
import LoginMessageAlert from "../LoginMessageAlert/LoginMessageAlert";
import LoginMessageAlertDayPass from "../LoginMessageAlert/LoginMessageAlertDayPass";
import useMyUserLoginSection from "./users/hooks/useMyUserLoginSection";

const MyUserLoginSection = () => {
  const {
    setPlay,
    setUserId,
    setUserFound,
    setIsOnGoing,
    setIsLogin,
    setTrainers,
    setIsExpired,
    setSubscriptionRecord,
    handlePlayClick,
    handleDayPassLoginClick,
    setDayPassLogin,
    disableBtn,
    play,
    stop,
    isLogin,
    isOnGoing,
    props,
    userId,
    dayPassLogin,
    isAlreadyLogin,
    daypassProps,
  } = useMyUserLoginSection();

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
            <>
              <LoginMessageAlert {...props} message={"Successfully login!"} />
            </>
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
          setSubscriptionRecord={setSubscriptionRecord}
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
