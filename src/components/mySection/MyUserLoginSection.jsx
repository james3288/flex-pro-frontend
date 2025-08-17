import DayPassLoginModal from "../modals/DayPassLoginModal";
import LoginMessageAlert from "../LoginMessageAlert/LoginMessageAlert";
import LoginMessageAlertDayPass from "../LoginMessageAlert/LoginMessageAlertDayPass";
import useMyUserLoginSection from "./users/hooks/useMyUserLoginSection";
import FaceScannerNew3 from "../face-scanner/FaceScannerNew3";
import UserLoginIDVerificationModal from "../face-scanner/modals/UserLoginIDVerificationModal";
import useGetActiveAndInactiveUsers from "../../hooks/useGetActiveAndInactiveUsers";
import { memo, useEffect } from "react";
import { useCurrentlyLoginStore } from "../face-scanner/store/currentlyLoginStore";
import LoadingEffect from "./loadingEffect/LoadingEffect";
import { use } from "react";
import { useNumpadStore } from "../face-scanner/store/numpadStore";
import ProgressLine from "../progressbar/ProgressLine";
0;
const MyUserLoginSection = memo(() => {
  // const [flexProUserId, setFlexProUserId] = useState(0);

  const {
    isPending,
    data: users,
    fetchStatus,
    isLoading: isLoadingActiveAndInactiveUser,
  } = useGetActiveAndInactiveUsers();

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

  const [cCurrentlyLogin, cSetCurrentlyLogin, cSetUserFound] =
    useCurrentlyLoginStore((state) => [
      state.currentlyLogin,
      state.setCurrentlyLogin,
      state.setUserFound,
    ]);

  const cSetNumpadResult = useNumpadStore((state) => state.setNumpadResult);

  const handleUserRefresh = () => {
    cSetUserFound(null);
    cSetNumpadResult("");
  };

  const LoginUserIdButton = () => {
    return (
      <button
        className="btn btn-success enabled"
        // onClick={handlePlayClick}
        disabled={isLoadingActiveAndInactiveUser}
        data-toggle="modal"
        data-target=".bd-example-modal-lg"
        style={{ zIndex: "9999" }}
        onClick={handleUserRefresh}
      >
        Login User ID
      </button>
    );
  };

  const WaitForInitializingUsersComponent = () => {
    if (isLoadingActiveAndInactiveUser) {
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <LoadingEffect />
          <h3 style={{ color: "gray" }}>Initializing user images...</h3>
        </div>
      );
    }
    return "";
  };

  const handleCancelLogin = () => {
    cSetCurrentlyLogin(null);
    cSetUserFound(null);
  };

  const WaitingForFaceRecognitionComponent = () => {
    if (cCurrentlyLogin) {
      return (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: "20px",
              position: "relative",
            }}
          >
            <div>
              <img
                src={cCurrentlyLogin?.image}
                alt=""
                className="scan-profile"
              />
            </div>
            <div>
              <h3>Waiting for face authentication...</h3>
              <h5>{cCurrentlyLogin?.usersubscription?.flexprouser?.name}</h5>
              <div>
                <button className="btn btn-warning" onClick={handleCancelLogin}>
                  Cancel Login
                </button>
              </div>
            </div>
          </div>
        </>
      );
    }
  };

  useEffect(() => {
    if (isLoadingActiveAndInactiveUser) {
      setPlay(true);
    }
  }, [isLoadingActiveAndInactiveUser]);

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
                <div
                  style={{
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignContent: "center",
                  }}
                >
                  {<WaitForInitializingUsersComponent />}
                </div>
                {/* <FaceScanner playNow={play} /> */}
                {play && (
                  // <FaceScannerNew
                  //   playNow={play}
                  //   stopNow={stop}
                  //   setPlay={setPlay}
                  //   setUserId={setUserId}
                  //   setUserFound={setUserFound}
                  //   setIsOnGoing={setIsOnGoing}
                  //   isOnGoing={isOnGoing}
                  //   setIsLogin={setIsLogin}
                  //   setTrainers={setTrainers}
                  //   isLogin={isLogin}
                  //   setIsExpired={setIsExpired}
                  //   setSubscriptionRecord={setSubscriptionRecord}
                  // />
                  <FaceScannerNew3
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
                    users={users}
                    isLoadingActiveAndInactiveUser={
                      isLoadingActiveAndInactiveUser
                    }
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
                {/* login using id */}

                <LoginUserIdButton />
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
                {/* <form action="" style={{ zIndex: "9999" }}>
                  <button
                    className="btn btn-danger"
                    //onClick={handleStopClick}
                  >
                    Refresh
                  </button>
                </form> */}
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
                    <WaitingForFaceRecognitionComponent />

                    <ProgressLine
                      label="Full progressbar"
                      visualParts={[
                        {
                          percentage: "100%",
                          color: "red",
                        },
                      ]}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* end scan result section */}
        </div>
      </div>

      <DayPassLoginModal
        setIsOnGoing={setIsOnGoing}
        setDayPassLogin={setDayPassLogin}
      />

      <UserLoginIDVerificationModal
        setUserId={setUserId}
        setIsOnGoing={setIsOnGoing}
        setIsLogin={setIsLogin}
        setTrainers={setTrainers}
        setUserFound={setUserFound}
        setSubscriptionRecord={setSubscriptionRecord}
        users={users}
        // setFlexProUserId={setFlexProUserId}
      />
    </>
  );
});

export default MyUserLoginSection;
