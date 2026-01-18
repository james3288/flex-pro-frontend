// Refactored MyUserLoginSection (keeps same exported name)
import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import DayPassLoginModal from "../modals/DayPassLoginModal";
import useGetActiveAndInactiveUsers from "../../hooks/useGetActiveAndInactiveUsers";
import { useCurrentlyLoginStore } from "../face-scanner/store/currentlyLoginStore";
import LoadingEffect from "./loadingEffect/LoadingEffect";
import { useNumpadStore } from "../face-scanner/store/numpadStore";
import RemainingDaysLeftComponent from "./forRenewal/RemainingDaysLeftComponent";
import useFetchLoginUser from "../../hooks/useFetchLoginUser";
import ExclamationSvg from "../svg/exclamationSvg";
import useLoginMutation from "../face-scanner/hooks/useLoginMutation";
import { useDayPassStore } from "../../store/useDayPassStore";
import Pic from "@assets/img/dummy.png";
import useResetLogin from "./users/hooks/useResetLogin";
import NeonCheckBox from "../ui/check/NeonCheckBox";
import ScanLoadingNew from "../ui/scan/ScanLoadingNew";
import useMyUserLoginSection from "./users/hooks/useMyUserLoginSection";
import useGetDayPassUsers from "../../hooks/useGetDayPassUsers";
import useGetDayPassActiveUsers from "../../hooks/useGetDayPassActiveUsers";
import Loading5 from "../ui/loading5/Loading5";
import Loading4 from "../ui/loading4/Loading4";
import { useIsFetching } from "@tanstack/react-query";

const CheckStatus = memo(() => (
  <h3 style={{ color: "yellowgreen" }}>
    {/* <CheckCircleFillSvg /> */}
    <NeonCheckBox />
    {/* {"  "} Login Successfully */}
  </h3>
));

const AlreadyLoginStatus = memo(() => (
  <h3 style={{ color: "red" }}>
    <ExclamationSvg />
    {"  "} Already login...
  </h3>
));

const DaypassUserInfo = ({ user }) => {
  return (
    <>
      <h4 style={{ color: "lightYellow", fontSize: 39 }}>{user.name}</h4>
      <h1 style={{ color: "white", fontSize: 22 }}>{user.remainingHours}</h1>
      <h4 style={{ color: "orange", fontSize: 35 }}>{user.subscription}</h4>
    </>
  );
};

// 🔹 MAIN COMPONENT
const MyUserDaypassLoginSection = memo(function MyUserDaypassLoginSection() {
  const myLogin = useMyUserLoginSection();
  const { handleDayPassLoginClick, setDayPassLogin, setIsOnGoing } = myLogin;

  const [loginError, setLoginError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // reset daypass and regular login hook
  const { resetDayPassLogin, resetRegularUserLogin } = useResetLogin();

  // Zustand currently login store - select needed fields individually to reduce re-renders
  const cCurrentlyLogin = useCurrentlyLoginStore((s) => s.currentlyLogin);

  // for daypass getter login store
  const [
    cIsDayPassLogin,
    cDayPassName,
    cDayPassRH,
    cDayPassSubscription,
    cDayPassIsAlreadyLogin,
  ] = useDayPassStore((state) => [
    state.isLogin,
    state.dayPassName,
    state.remainingHours,
    state.subscriptionName,
    state.isAlreadyLogin,
  ]);

  // numpad setter
  const cSetNumpadResult = useNumpadStore((s) => s.setNumpadResult);

  // login attempt hook
  const loginMutation = useLoginMutation();

  // // loginUser fetch — memoize user id param
  // const userSub = cCurrentlyLogin?.usersubscription;
  // const { loginUser } = useFetchLoginUser({
  //   user_id: userSub?.flexprouser?.id,
  // });

  // Active + Inactive users loader (assumed to return: { isPending, data, fetchStatus, isLoading })
  // const {
  //   isPending,
  //   data: users = [],
  //   fetchStatus,
  //   isLoading: isLoadingActiveAndInactiveUser,
  //   refetch,
  // } = useGetActiveAndInactiveUsers();

  const {
    isPending: isDayPassPending,
    data: dayPassActiveUsers = [],
    fetchStatus: dayPassFetchStatus,
    isLoading: isLoadingDayPass,
    refetch,
  } = useGetDayPassActiveUsers();

  console.log(dayPassActiveUsers);

  const RefreshButton = useCallback(() => (
    <button
      className="btn btn-success enabled"
      onClick={() => refetch()} //{handlePlayClick}
      disabled={isLoadingDayPass}
      style={{ zIndex: 9999 }}
    >
      Refresh
    </button>
  ));

  const LoginByDayPassButton = useCallback(
    ({ resetRegularUserLogin }) => (
      <button
        className="btn btn-success enabled"
        onClick={() => {
          handleDayPassLoginClick({ resetRegularUserLogin });
          setShowModal(true);
        }}
        style={{ zIndex: 9999 }}
        disabled={isLoadingDayPass}
      >
        Login Daypass
      </button>
    ),
    [handleDayPassLoginClick, isLoadingDayPass]
  );

  // side effects for login mutation status failed
  useEffect(() => {
    if (!loginMutation) return;

    if (loginMutation.isError) {
      setLoginError(
        loginMutation.error?.message || "Login failed. Please try again."
      );
    }

    if (loginMutation.isSuccess) {
      setLoginError(null);
    }
  }, [loginMutation.isError, loginMutation.isSuccess]);

  const WaitingForDayPassLogin = useMemo(() => {
    if (!cIsDayPassLogin) {
      return <h3>waiting for daypass user...</h3>;
    }

    const dayPassUserData = {
      name: cDayPassName,
      subscription: cDayPassSubscription,
      remainingHours: cDayPassRH,
    };
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
          <img src={Pic} alt="" className="scan-profile" />
        </div>
        <div>
          {cDayPassIsAlreadyLogin && cIsDayPassLogin === true && (
            <AlreadyLoginStatus />
          )}
          {cIsDayPassLogin && cDayPassIsAlreadyLogin === false && (
            <CheckStatus />
          )}
          <DaypassUserInfo user={dayPassUserData} />
          <div>
            <button
              className={`btn btn-success ${
                cDayPassIsAlreadyLogin && cIsDayPassLogin && "btn-danger"
              }`}
              onClick={() => resetDayPassLogin()}
            >
              Proceed
            </button>
          </div>
        </div>
      </div>
    );
  }, [cDayPassIsAlreadyLogin, cIsDayPassLogin]);

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
                {isLoadingDayPass ? <Loading4 /> : ""}
              </div>

              <div className="camera-btn">
                {/* <StartCamera /> */}
                <RefreshButton />
                <LoginByDayPassButton
                  resetRegularUserLogin={resetRegularUserLogin}
                />
              </div>
            </div>
          </div>

          {/* scan result section */}
          <div className="col-lg-6 col-xs-12">
            <div className="dashboard-col">
              <span>
                DAYPASS<strong> LOGIN</strong> STATUS
              </span>

              <div className="scan-profile-wrapper">
                <div className="scan-profile-name">
                  {WaitingForDayPassLogin}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <DayPassLoginModal
        show={showModal}
        onHide={() => setShowModal(false)}
        setIsOnGoing={setIsOnGoing}
        setDayPassLogin={setDayPassLogin}
        dayPassUsers={dayPassActiveUsers?.dayPassUsers || []}
      />
    </>
  );
});

export default MyUserDaypassLoginSection;
