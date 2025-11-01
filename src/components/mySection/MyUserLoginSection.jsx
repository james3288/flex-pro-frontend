// Refactored MyUserLoginSection (keeps same exported name)
import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import DayPassLoginModal from "../modals/DayPassLoginModal";
import LoginMessageAlert from "../LoginMessageAlert/LoginMessageAlert";
import LoginMessageAlertDayPass from "../LoginMessageAlert/LoginMessageAlertDayPass";
import useMyUserLoginSection from "./users/hooks/useMyUserLoginSection";
import FaceScannerNew3 from "../face-scanner/FaceScannerNew3";
import UserLoginIDVerificationModal from "../face-scanner/modals/UserLoginIDVerificationModal";
import useGetActiveAndInactiveUsers from "../../hooks/useGetActiveAndInactiveUsers";
import { useCurrentlyLoginStore } from "../face-scanner/store/currentlyLoginStore";
import LoadingEffect from "./loadingEffect/LoadingEffect";
import { useNumpadStore } from "../face-scanner/store/numpadStore";
import ProgressLine from "../progressbar/ProgressLine";
import RemainingDaysLeftComponent from "./forRenewal/RemainingDaysLeftComponent";
import CheckCircleFillSvg from "../svg/checkCircleFillSvg";
import useFetchLoginUser from "../../hooks/useFetchLoginUser";
import ExclamationSvg from "../svg/exclamationSvg";
import useLoginAttempt from "../face-scanner/hooks/useLoginAttempt";
import useLoginMutation from "../face-scanner/hooks/useLoginMutation";
import useSaveTimeRecords from "./users/hooks/useSaveTimeRecords";
import Loading4 from "../ui/loading4/Loading4";
import Loader3 from "../ui/loader3/Loader3";
const SmallCentered = ({ children, style }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      gap: " 10px",
      ...style,
    }}
  >
    {children}
  </div>
);

const CheckStatus = memo(() => (
  <h3 style={{ color: "yellowgreen" }}>
    <CheckCircleFillSvg />
    {"  "} Login Successfully
  </h3>
));

const AlreadyLoginStatus = memo(() => (
  <h3 style={{ color: "red" }}>
    <ExclamationSvg />
    {"  "} Already login...
  </h3>
));

const ScanLoading = memo(({ attempt }) => (
  <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
    <LoadingEffect />
    <h3>{attempt * 20}%</h3>
  </div>
));

const UserInfo = memo(({ user }) => (
  <h4 style={{ color: "white", fontSize: 22 }}>
    {user?.usersubscription?.flexprouser?.name?.toUpperCase()}
  </h4>
));

const PrivateRemainingDays = memo(({ userSub }) => (
  <RemainingDaysLeftComponent
    date_subscribed={userSub?.date_subscribed}
    per={userSub?.subscription?.per?.per}
    user_id={userSub?.flexprouser?.id}
    session_days={userSub?.sub_session_days}
    subscriptionId={userSub?.id}
    id={userSub?.flexprouser?.id}
    fullname={userSub?.flexprouser?.name}
    fontColor={"orange"}
    fontSize="26px"
  />
));

const MyUserLoginSection = memo(function MyUserLoginSection() {
  // local UI state
  const [loginTrigger, setLoginTrigger] = useState(false);

  // Active + Inactive users loader (assumed to return: { isPending, data, fetchStatus, isLoading })
  const {
    isPending,
    data: users = [],
    fetchStatus,
    isLoading: isLoadingActiveAndInactiveUser,
    refetch,
  } = useGetActiveAndInactiveUsers();

  // login section hook (returns many callbacks/values) - keep stable by destructuring once
  const myLogin = useMyUserLoginSection();
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
    userId,
    dayPassLogin,
    isAlreadyLogin,
    daypassProps,
    handleProceedAfterLogin, // if exists
  } = myLogin;

  // Zustand currently login store - select needed fields individually to reduce re-renders
  const cCurrentlyLogin = useCurrentlyLoginStore((s) => s.currentlyLogin);
  const cSetCurrentlyLogin = useCurrentlyLoginStore((s) => s.setCurrentlyLogin);
  const cSetUserFound = useCurrentlyLoginStore((s) => s.setUserFound);
  const cSetIsAlreadyLoginInDatabase = useCurrentlyLoginStore(
    (s) => s.setIsAlreadyLoginInDatabase
  );
  const cIsAlreadyLoginInDatabase = useCurrentlyLoginStore(
    (s) => s.isAlreadyLoginInDatabase
  );

  const cLoginAttempt = useCurrentlyLoginStore((s) => s.loginAttempt);
  const cSetLoginAttempt = useCurrentlyLoginStore((s) => s.setLoginAttempt);
  const cSetIsFound = useCurrentlyLoginStore((s) => s.setIsFound);
  const cIsFound = useCurrentlyLoginStore((s) => s.isFound);

  // numpad setter
  const cSetNumpadResult = useNumpadStore((s) => s.setNumpadResult);

  // login attempt hook
  const { isThisYourFace, setIsThisYourFace } = useLoginAttempt();
  const loginMutation = useLoginMutation();

  // loginUser fetch — memoize user id param
  const userSub = cCurrentlyLogin?.usersubscription;
  const { loginUser } = useFetchLoginUser({
    user_id: userSub?.flexprouser?.id,
  });

  // derived: is user already logged in according to fetched loginUser
  const alreadyLoggedIn = useMemo(() => {
    if (!loginUser || !loginUser.loginUser) return false;
    return loginUser.loginUser.some((rec) => {
      const timeOut =
        typeof rec.time_out === "string"
          ? rec.time_out
          : rec.time_out?.toISOString?.();
      return timeOut?.startsWith("1990-01-01");
    });
  }, [loginUser]);

  // handlers: keep stable references
  const handleUserRefresh = useCallback(() => {
    cSetUserFound(null);
    cSetNumpadResult("");
    cSetIsFound(false);
  }, [cSetUserFound, cSetNumpadResult, cSetIsFound]);

  const handleCancelLogin = useCallback(() => {
    cSetCurrentlyLogin(null);
    cSetUserFound(null);
    cSetLoginAttempt(0);
    cSetIsFound(false);
    cSetIsAlreadyLoginInDatabase(false);
    setIsThisYourFace(false);
  }, [
    cSetCurrentlyLogin,
    cSetUserFound,
    cSetLoginAttempt,
    cSetIsFound,
    cSetIsAlreadyLoginInDatabase,
    setIsThisYourFace,
  ]);

  // side effects
  useEffect(() => {
    if (isThisYourFace) {
      // ensure loginMutation is stable or handles deduping
      loginMutation.mutate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isThisYourFace]); // loginMutation likely stable

  useEffect(() => {
    // Only set play true if it's currently false to avoid repeated re-renders
    if (isLoadingActiveAndInactiveUser) {
      setPlay((prev) => (prev ? prev : true));
    }
  }, [isLoadingActiveAndInactiveUser, setPlay]);

  // Stable props object for FaceScanner to avoid re-renders from new object each render
  const faceScannerProps = useMemo(
    () => ({
      playNow: play,
      stopNow: stop,
      setPlay,
      setUserId,
      setUserFound,
      setIsOnGoing,
      setIsLogin,
      setTrainers,
      isOnGoing,
      isLogin,
      setIsExpired,
      setSubscriptionRecord,
      users,
      isLoadingActiveAndInactiveUser,
    }),
    [
      play,
      stop,
      setPlay,
      setUserId,
      setUserFound,
      setIsOnGoing,
      setIsLogin,
      setTrainers,
      isOnGoing,
      isLogin,
      setIsExpired,
      setSubscriptionRecord,
      users,
      isLoadingActiveAndInactiveUser,
    ]
  );

  // small presentational components as callbacks to keep stable identity
  const LoginUserIdButton = useCallback(
    () => (
      <button
        className="btn btn-success enabled"
        disabled={isLoadingActiveAndInactiveUser}
        data-toggle="modal"
        data-target=".bd-example-modal-lg"
        style={{ zIndex: 9999 }}
        onClick={handleUserRefresh}
      >
        Login User ID
      </button>
    ),
    [isLoadingActiveAndInactiveUser, handleUserRefresh]
  );

  const RefreshButton = useCallback(() => {});

  const LoginByDayPassButton = useCallback(
    () => (
      <button
        className="btn btn-success enabled"
        data-toggle="modal"
        data-target="#daypass-login-modal"
        onClick={handleDayPassLoginClick}
        style={{ zIndex: 9999 }}
        disabled={isLoadingActiveAndInactiveUser}
      >
        Login Daypass
      </button>
    ),
    [handleDayPassLoginClick]
  );

  const WaitForInitializingUsersComponent = useCallback(() => {
    if (!isLoadingActiveAndInactiveUser) return null;
    return (
      <SmallCentered>
        {/* <Loading4 /> */}
        <Loader3 />
        <h5 style={{ color: "gray", marginTop: "20px" }}>
          Initializing user images...
        </h5>
      </SmallCentered>
    );
  }, [isLoadingActiveAndInactiveUser]);

  // render logic for waiting/scan state
  const WaitingForFaceRecognition = useMemo(() => {
    if (!cCurrentlyLogin) {
      return <h5>Waiting for user...</h5>;
    }

    // stable boolean for already logged in
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 20,
          position: "relative",
        }}
      >
        <div>
          <img src={cCurrentlyLogin?.image} alt="" className="scan-profile" />
        </div>

        <div>
          {!isThisYourFace && !alreadyLoggedIn && (
            <h3>Waiting for face authentication...</h3>
          )}
          <UserInfo user={cCurrentlyLogin} />
          {alreadyLoggedIn ? (
            <>
              <AlreadyLoginStatus />
              <PrivateRemainingDays
                userSub={cCurrentlyLogin?.usersubscription}
              />
              <div>
                <button className="btn btn-success" onClick={handleCancelLogin}>
                  Proceed
                </button>
              </div>
            </>
          ) : (
            <>
              {!isThisYourFace ? (
                <ScanLoading attempt={cLoginAttempt} />
              ) : (
                <CheckStatus />
              )}
              {isThisYourFace && (
                <>
                  <PrivateRemainingDays
                    userSub={cCurrentlyLogin?.usersubscription}
                  />
                  <div>
                    <button
                      className="btn btn-success"
                      onClick={handleCancelLogin}
                    >
                      Proceed
                    </button>
                  </div>
                </>
              )}
              {!isThisYourFace && (
                <div>
                  <button
                    className="btn btn-warning"
                    onClick={handleCancelLogin}
                  >
                    Cancel Login
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    cCurrentlyLogin,
    isThisYourFace,
    alreadyLoggedIn,
    cLoginAttempt,
    handleCancelLogin,
  ]);

  // top-level render
  return (
    <>
      <div className="container-fluid content-margin">
        <div className="row">
          {/* scan face section */}
          <div className="col-lg-6 col-xs-12">
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
                  }}
                >
                  <WaitForInitializingUsersComponent />
                </div>

                {play && <FaceScannerNew3 {...faceScannerProps} />}
              </div>

              <div className="camera-btn">
                <button
                  className="btn btn-success enabled"
                  onClick={() => refetch()} //{handlePlayClick}
                  disabled={disableBtn}
                  style={{ zIndex: 9999 }}
                >
                  Face Recognition
                </button>

                <LoginUserIdButton />
                <LoginByDayPassButton />
              </div>
            </div>
          </div>

          {/* scan result section */}
          <div className="col-lg-6 col-xs-12">
            <div className="dashboard-col">
              <span>
                <strong>LOGIN</strong> STATUS
              </span>

              <div className="scan-profile-wrapper">
                <div className="scan-profile-name">
                  {WaitingForFaceRecognition}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <DayPassLoginModal
        setIsOnGoing={setIsOnGoing}
        setDayPassLogin={setDayPassLogin}
        dayPassUsers={users?.dayPassUser || []}
      />
      <UserLoginIDVerificationModal
        setUserId={setUserId}
        setIsOnGoing={setIsOnGoing}
        setIsLogin={setIsLogin}
        setTrainers={setTrainers}
        setUserFound={setUserFound}
        setSubscriptionRecord={setSubscriptionRecord}
        users={users}
      />
    </>
  );
});

export default MyUserLoginSection;
