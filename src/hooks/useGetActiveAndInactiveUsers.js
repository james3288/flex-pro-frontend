import { useQuery } from "@tanstack/react-query";
import getActiveAndInactiveUsers from "../getData/getActiveAndInactiveUsers";
import useGetActiveUsers from "./useGetActiveUsers";
import useGetDayPassUsers from "./useGetDayPassUsers";
import getForRenewalUsers from "../getData/getForRenewalUsers";
import useClientsOnWorkout2 from "./useClientsOnWorkout2";

const useGetActiveAndInactiveUsers = () => {
  const { getActiveUsers } = useGetActiveUsers();
  const { getDayPassUserActive } = useGetDayPassUsers();

  const { isPending, error, data, fetchStatus, isLoading, refetch } = useQuery({
    queryKey: ["forActiveAndInactiveUsers"],
    queryFn: async () => {
      const activeUser = await getActiveUsers();
      const dayPassUser = await getDayPassUserActive();
      const renewalUser = await getForRenewalUsers();

      return {
        activeAndInactiveUsers: activeUser,
        dayPassUser: dayPassUser,
        renewalUser: renewalUser,
      };
    },
  });

  return { isPending, data, fetchStatus, isLoading, refetch };
};

export default useGetActiveAndInactiveUsers;
