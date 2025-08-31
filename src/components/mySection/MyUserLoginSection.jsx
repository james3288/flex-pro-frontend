import DayPassLoginModal from "../modals/DayPassLoginModal";
import LoginMessageAlert from "../LoginMessageAlert/LoginMessageAlert";
import LoginMessageAlertDayPass from "../LoginMessageAlert/LoginMessageAlertDayPass";
import useMyUserLoginSection from "./users/hooks/useMyUserLoginSection";
import FaceScannerNew3 from "../face-scanner/FaceScannerNew3";
import UserLoginIDVerificationModal from "../face-scanner/modals/UserLoginIDVerificationModal";
import useGetActiveAndInactiveUsers from "../../hooks/useGetActiveAndInactiveUsers";
import { memo, useEffect, useState } from "react";
import { useCurrentlyLoginStore } from "../face-scanner/store/currentlyLoginStore";
import LoadingEffect from "./loadingEffect/LoadingEffect";
import { use } from "react";
import { useNumpadStore } from "../face-scanner/store/numpadStore";
import ProgressLine from "../progressbar/ProgressLine";
import RemainingDaysLeftComponent from "./forRenewal/RemainingDaysLeftComponent";
import CheckCircleFillSvg from "../svg/checkCircleFillSvg";
import useFetchLoginUser from "../../hooks/useFetchLoginUser";
import ExclamationSvg from "../svg/exclamationSvg";
import useSaveTimeRecords from "./users/hooks/useSaveTimeRecords";
import useLoginAttempt from "../face-scanner/hooks/useLoginAttempt";
import useLoginMutation from "../face-scanner/hooks/useLoginMutation";

const MyUserLoginSection = memo(() => {
  // const [flexProUserId, setFlexProUserId] = useState(0);
  const [loginTrigger, setLoginTrigger] = useState(false);
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

  const [
    cCurrentlyLogin,
    cSetCurrentlyLogin,
    cSetUserFound,
    cSetIsAlreadyLoginInDatabase,
    cIsAlreadyLoginInDatabase,
  ] = useCurrentlyLoginStore((state) => [
    state.currentlyLogin,
    state.setCurrentlyLogin,
    state.setUserFound,
    state.setIsAlreadyLoginInDatabase,
    state.isAlreadyLoginInDatabase,
  ]);

  const { usersubscription: userSub } = cCurrentlyLogin || {};

  const cSetNumpadResult = useNumpadStore((state) => state.setNumpadResult);

  const [cLoginAttempt, cSetLoginAttempt, cSetIsFound, cIsFound] =
    useCurrentlyLoginStore((state) => [
      state.loginAttempt,
      state.setLoginAttempt,
      state.setIsFound,
      state.isFound,
    ]);

  const { isThisYourFace, setIsThisYourFace } = useLoginAttempt();
  const loginMutation = useLoginMutation();

  const { loginUser } = useFetchLoginUser({
    user_id: userSub?.flexprouser?.id,
  });

  function isAlreadyLoggedIn(loginUser) {
    if (!loginUser || !loginUser.loginUser) return false;
    return loginUser.loginUser.some((record) => {
      const timeOut =
        typeof record.time_out === "string"
          ? record.time_out
          : record.time_out?.toISOString();
      return timeOut?.startsWith("1990-01-01");
    });
  }

  const handleUserRefresh = () => {
    cSetUserFound(null);
    cSetNumpadResult("");
    cSetIsFound(false);
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

    cSetLoginAttempt(0);
    cSetIsFound(false);

    cSetIsAlreadyLoginInDatabase(false);
    setIsThisYourFace(false);
  };

  const UserFoundComponent = () => {
    if (!isThisYourFace) {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <LoadingEffect />
          <h3>{cLoginAttempt * 20}%</h3>
        </div>
      );
    } else {
      return (
        <div>
          <h3 style={{ color: "yellowgreen" }}>
            <CheckCircleFillSvg />
            {"  "} Login Successfully
          </h3>
          <div>
            <RemainingDaysLeftComponent
              date_subscribed={
                cCurrentlyLogin?.usersubscription?.date_subscribed
              }
              per={cCurrentlyLogin?.usersubscription?.subscription?.per?.per}
              user_id={cCurrentlyLogin?.usersubscription?.flexprouser?.id}
              session_days={cCurrentlyLogin?.usersubscription?.sub_session_days}
              subscriptionId={
                cCurrentlyLogin?.usersubscription?.subscription?.id
              }
              id={cCurrentlyLogin?.usersubscription?.flexprouser?.id}
              fullname={cCurrentlyLogin?.usersubscription?.flexprouser?.name}
              fontColor={"orange"}
              fontSize="26px"
            />
            <ProceedButtonComponent />
          </div>
        </div>
      );
    }
  };

  const AlreadyLoginComponent = () => {
    return (
      <div>
        <h3 style={{ color: "red" }}>
          <ExclamationSvg />
          {"  "} Already login...
        </h3>
        <RemainingDaysLeftComponent
          date_subscribed={userSub?.date_subscribed}
          per={userSub?.subscription?.per?.per}
          user_id={userSub?.flexprouser?.id}
          session_days={userSub?.sub_session_days}
          subscriptionId={userSub?.subscription?.id}
          id={userSub?.flexprouser?.id}
          fullname={userSub?.flexprouser?.name}
          fontColor={"orange"}
          fontSize="26px"
        />
        <ProceedButtonComponent />
      </div>
    );
  };

  const CancelLoginButtonComponent = () => {
    return (
      <div>
        <button className="btn btn-warning" onClick={handleCancelLogin}>
          Cancel Login
        </button>
      </div>
    );
  };

  const ProceedButtonComponent = () => {
    return (
      <div>
        <button className="btn btn-success" onClick={handleCancelLogin}>
          Proceed
        </button>
      </div>
    );
  };

  const ClientNameComponent = () => {
    return (
      <h4 style={{ color: "white", fontSize: "22px" }}>
        {cCurrentlyLogin?.usersubscription?.flexprouser?.name?.toUpperCase()}
      </h4>
    );
  };

  const WaitingForFaceRecognitionComponent = () => {
    if (cCurrentlyLogin) {
      const alreadyLoggedIn = isAlreadyLoggedIn(loginUser);
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
              {!isThisYourFace && !alreadyLoggedIn && (
                <h3>Waiting for face authentication...</h3>
              )}
              <ClientNameComponent />
              {alreadyLoggedIn ? (
                <AlreadyLoginComponent />
              ) : (
                <UserFoundComponent />
              )}
              {!isThisYourFace && !alreadyLoggedIn && (
                <CancelLoginButtonComponent />
              )}
            </div>
          </div>
        </>
      );
    } else {
      return <h5>Waiting for user...</h5>;
    }
  };

  useEffect(() => {
    if (isThisYourFace) {
      loginMutation.mutate();
    }
  }, [isThisYourFace]);

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
          </div>
          {/* end scan face section */}
          {/* scan result section */}
          <div className="col-lg-6 col-xs-12">
            <div className="dashboard-col">
              <span>
                <strong>LOGIN</strong> STATUS
              </span>

              <div className="scan-profile-wrapper">
                <div className="scan-profile-name">
                  <WaitingForFaceRecognitionComponent />
                </div>
              </div>
            </div>
          </div>
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
