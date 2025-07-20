import { useEffect } from "react";
import getExtendedSubscription from "../getData/getExtendedSubscription";
import getSubscriptionDaysLeft from "../getData/getSubscriptionDaysLeft";
import remainingDays from "../others/GetRemainingDays";
import { useQuery } from "@tanstack/react-query";

const useRemainingDaysLeft = (
  date_subscribed,
  per,
  flexProUserId,
  sub_session_days,
  userSubscriptionId
) => {
  const queryKey = [`extendedSubData_${flexProUserId}`];
  const { isPending, error, data, isLoading } = useQuery({
    queryKey,
    queryFn: async () => {
      const extSub = await getExtendedSubscription(userSubscriptionId);
      const remDays = await remainingDays(
        date_subscribed,
        per,
        flexProUserId,
        sub_session_days === 0 ? 1 : sub_session_days
      );
      return {
        extendedSub: extSub,
        remainingDays: remDays,
      };
    },
    refetchInterval: 1000,
  });

  const remainingDaysLeft = async () => {
    return getSubscriptionDaysLeft(
      data?.remainingDays,
      data?.extendedSub,
      date_subscribed,
      false
    );
  };

  return { data, isLoading, isPending, error, remainingDaysLeft };
};

export default useRemainingDaysLeft;
