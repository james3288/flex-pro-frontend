import React, { useCallback, useEffect, useState } from "react";
import { useCurrentlyLoginStore } from "../store/currentlyLoginStore";
import { useNumpadStore } from "../store/numpadStore";
import { useActiveCameraStore } from "../../../store/useActiveCamera";
import { useLoginWithoutCameraStore } from "../../../store/useLoginWithoutCamera";

const useUserLoginModalNumpad = () => {
  // const [numpadResult, setNumpadResult] = useState("");
  // const [userFound, setUserFound] = useState(0);
  const [flexProUserIdStorage, setFlexProUserIdStorage] = useState(0);
  const [
    cSetCurrentlyLogin,
    cSetUserFound,
    cUserFound,
    cSetLoginAttempt,
    cSetUserSubscriptionFound,
  ] = useCurrentlyLoginStore((state) => [
    state.setCurrentlyLogin,
    state.setUserFound,
    state.userFound,
    state.setLoginAttempt,
    state.setUserSubscriptionFound,
  ]);

  const cSetNumpadResult = useNumpadStore((state) => state.setNumpadResult);
  const [cHasVideoOutput] = useActiveCameraStore((state) => [
    state.hasVideoOutput,
  ]);
  const [cSetIsLoginWithoutCamera] = useLoginWithoutCameraStore((state) => [
    state.setIsLoginWithoutCamera,
  ]);

  const handleNumpadOnClick = (e) => {
    // setNumpadResult((prev) => prev + e.target.value);
    const value = e.target.value;
    const current = useNumpadStore.getState().numpadResult;
    cSetNumpadResult(current + value);
  };

  const handleDelOnClick = () => {
    // setNumpadResult((prev) => prev.slice(0, -1));

    const current = useNumpadStore.getState().numpadResult;
    cSetNumpadResult(current.slice(0, -1));
  };

  const handleClearOnClick = () => {
    // setNumpadResult("");
    cSetNumpadResult("");
    cSetUserFound(null);
    cSetUserSubscriptionFound([]);
  };

  const handleEnterOnClick = useCallback(
    async ({ activeAndInactiveUsers, flexProUserId }) => {
      const newUser = await activeAndInactiveUsers?.find(
        (user) =>
          String(user.usersubscription.flexprouser?.id) ===
          String(flexProUserId),
      );

      // setUserFound(newUser);
      cSetUserFound(newUser);
    },
  );

  const handleEnterOnClick2 = useCallback(
    async ({ activeAndInactiveUsers, flexProUserId }) => {
      const newUsers = await activeAndInactiveUsers?.filter(
        (user) =>
          String(user.usersubscription.flexprouser?.id) ===
          String(flexProUserId),
      );

      cSetUserSubscriptionFound(newUsers);
    },
  );

  const handleLoginOnclick = async ({ userFound }) => {
    if (cUserFound && cHasVideoOutput) {
      setFlexProUserIdStorage(cUserFound?.usersubscription.flexprouser?.id);
      cSetCurrentlyLogin(userFound);
    } else if (cUserFound && !cHasVideoOutput) {
      // alert("No camera found on this device.");
      setFlexProUserIdStorage(cUserFound?.usersubscription.flexprouser?.id);
      cSetCurrentlyLogin(userFound);
      cSetIsLoginWithoutCamera(true);
    }
  };

  return {
    // numpadResult,
    // userFound,
    flexProUserIdStorage,
    handleNumpadOnClick,
    handleDelOnClick,
    handleClearOnClick,
    handleEnterOnClick,
    handleEnterOnClick2,
    handleLoginOnclick,
  };
};

export default useUserLoginModalNumpad;
