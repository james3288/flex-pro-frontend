import React, { useCallback, useEffect, useState } from "react";
import { useCurrentlyLoginStore } from "../store/currentlyLoginStore";
import { useNumpadStore } from "../store/numpadStore";

const useUserLoginModalNumpad = () => {
  // const [numpadResult, setNumpadResult] = useState("");
  // const [userFound, setUserFound] = useState(0);
  const [flexProUserIdStorage, setFlexProUserIdStorage] = useState(0);
  const [cSetCurrentlyLogin, cSetUserFound, cUserFound] =
    useCurrentlyLoginStore((state) => [
      state.setCurrentlyLogin,
      state.setUserFound,
      state.userFound,
    ]);

  const cSetNumpadResult = useNumpadStore((state) => state.setNumpadResult);

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
  };

  const handleEnterOnClick = useCallback(
    async ({ activeAndInactiveUsers, flexProUserId }) => {
      const newUser = await activeAndInactiveUsers?.find(
        (user) =>
          String(user.usersubscription.flexprouser?.id) ===
          String(flexProUserId)
      );

      // setUserFound(newUser);
      cSetUserFound(newUser);
    }
  );

  const handleLoginOnclick = async () => {
    if (cUserFound) {
      setFlexProUserIdStorage(cUserFound?.usersubscription.flexprouser?.id);
      cSetCurrentlyLogin(cUserFound);
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
    handleLoginOnclick,
  };
};

export default useUserLoginModalNumpad;
