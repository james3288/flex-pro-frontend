import getExtendedSubscription from "../getData/getExtendedSubscription";
import getSubscriptionDaysLeft from "../getData/getSubscriptionDaysLeft";
import remainingDays from "../others/GetRemainingDays";
import { useQuery } from "@tanstack/react-query";

const useRemainingDaysLeft = (
  date_subscribed,
  per,
  flexProUserId,
  sub_session_days,
  userSubscriptionId,
  daysOnly = false,
) => {
  // Normalize once at the start
  const normalizedSessionDays = sub_session_days === 0 ? 1 : sub_session_days;

  const queryKey = [`extendedSubData_${flexProUserId}_${userSubscriptionId}`];

  const { isPending, error, data, isLoading } = useQuery({
    queryKey,
    queryFn: async () => {
      // Run in parallel for efficiency
      const [extSub, remDays] = await Promise.all([
        getExtendedSubscription(userSubscriptionId),
        remainingDays(
          date_subscribed,
          per,
          flexProUserId,
          normalizedSessionDays,
        ),
      ]);

      return {
        extendedSub: extSub,
        remainingDays: remDays,
      };
    },
    // ⚡ Optimize fetching strategy
    staleTime: 1000 * 60, // cache 1 min
    refetchOnWindowFocus: true, // refresh only when focus
    retry: 1, // avoid endless retries
  });

  // Keep your original return signature
  const remainingDaysLeft = async () => {
    if (!data) return null; // safe guard
    return getSubscriptionDaysLeft(
      data.remainingDays,
      data.extendedSub,
      date_subscribed,
      daysOnly,
    );
  };

  return { data, isLoading, isPending, error, remainingDaysLeft };
};

export default useRemainingDaysLeft;
