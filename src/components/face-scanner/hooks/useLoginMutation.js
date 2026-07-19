import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import useSaveTimeRecords from "../../mySection/users/hooks/useSaveTimeRecords";
import { useCurrentlyLoginStore } from "../store/currentlyLoginStore";
import useFetchLoginUser from "../../../hooks/useFetchLoginUser";
import formatTimeToString from "../../../others/formatTimeToString";

const useLoginMutation = () => {
  const queryClient = useQueryClient();
  const cCurrentlyLogin = useCurrentlyLoginStore(
    (state) => state.currentlyLogin
  );
  const { saveTimeRecords } = useSaveTimeRecords();

  // Get user id from currentlyLogin
  const userId = cCurrentlyLogin?.usersubscription?.flexprouser?.id;
  const { loginUser } = useFetchLoginUser({ user_id: userId });

  const getTimeInRecord = async () => {
    if (cCurrentlyLogin) {
      const { usersubscription: usersSub } = cCurrentlyLogin;
      return {
        id: usersSub?.id,
        time_in: new Date(),
        time_out: new Date(1990, 0, 1, 0, 0),
        date_subscribed: usersSub?.date_subscribed,
        per: usersSub?.subscription?.per?.per,
        flexProUserId: usersSub?.flexprouser?.id,
        session_days: usersSub?.session_days,
        userSubscriptionId: usersSub?.id,
        sub_session_days: usersSub?.sub_session_days,
      };
    }
    return null;
  };

  // Helper to check if already logged in
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
  return useMutation({
    mutationFn: async () => {
      if (isAlreadyLoggedIn(loginUser)) {
        throw new Error(
          `User already logged at ${formatTimeToString(
            loginUser.loginUser[0].time_in
          )}`
        );
      }
      const timeRecord = await getTimeInRecord();
      return await saveTimeRecords(timeRecord);
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["timeRecordUser"] });
    },
  });
};

export default useLoginMutation;
