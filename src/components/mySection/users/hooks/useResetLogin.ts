import React, { useCallback } from "react";
import { useDayPassStore } from "../../../../store/useDayPassStore";
import { useCurrentlyLoginStore } from "../../../face-scanner/store/currentlyLoginStore";

const useResetLogin = () => {
  // 🔹 regular user store
  const [
    cSetCurrentlyLogin,
    cSetUserFound,
    cSetIsAlreadyLoginInDatabase,
    cSetLoginAttempt,
    cSetIsFound,
  ] = useCurrentlyLoginStore((state) => [
    state.setCurrentlyLogin,
    state.setUserFound,
    state.setIsAlreadyLoginInDatabase,
    state.setLoginAttempt,
    state.setIsFound,
  ]);

  // 🔹 daypass store
  const [
    cSetDayPassUser,
    cSetDayPassUserOnline,
    cSetIsLogin,
    cSetDayPassName,
    cSetIsAlreadyLogin,
    cSetSubscriptionName,
  ] = useDayPassStore((state) => [
    state.setDayPassUser,
    state.setDayPassUserOnline,
    state.setIsLogin,
    state.setDayPassName,
    state.setIsAlreadyLogin,
    state.setSubscriptionName,
  ]);

  const resetDayPassLogin = useCallback(() => {
    cSetDayPassUser(null);
    cSetDayPassUserOnline([]);
    cSetIsLogin(false);
    cSetDayPassName("");
    cSetIsAlreadyLogin(false);
    cSetSubscriptionName("");
  }, [
    cSetDayPassUser,
    cSetDayPassUserOnline,
    cSetIsLogin,
    cSetDayPassName,
    cSetIsAlreadyLogin,
    cSetSubscriptionName,
  ]);

  const resetRegularUserLogin = useCallback(() => {
    cSetCurrentlyLogin(null);
    cSetUserFound(null);
    cSetIsAlreadyLoginInDatabase(false);
    cSetLoginAttempt(0);
    cSetIsFound(false);
  }, [
    cSetCurrentlyLogin,
    cSetUserFound,
    cSetIsAlreadyLoginInDatabase,
    cSetLoginAttempt,
    cSetIsFound,
  ]);

  return { resetDayPassLogin, resetRegularUserLogin };
};

export default useResetLogin;
