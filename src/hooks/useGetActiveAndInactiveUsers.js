import { useQuery } from "@tanstack/react-query";
import getActiveAndInactiveUsers from "../getData/getActiveAndInactiveUsers";
import useGetActiveUsers from "./useGetActiveUsers";
import useGetDayPassUsers from "./useGetDayPassUsers";
import getForRenewalUsers from "../getData/getForRenewalUsers";
import useClientsOnWorkout2 from "./useClientsOnWorkout2";
import useGetActiveMembership from "./useGetActiveMembership";

const useGetActiveAndInactiveUsers = () => {
  const { getActiveUsers } = useGetActiveUsers();
  const { getDayPassUserActive } = useGetDayPassUsers();
  const { getMembershipUserActive } = useGetActiveMembership();

  const { isPending, error, data, fetchStatus, isLoading, refetch } = useQuery({
    queryKey: ["forActiveAndInactiveUsers"],
    queryFn: async () => {
      const activeUser = await getActiveUsers();
      const dayPassUser = await getDayPassUserActive();
      const renewalUser = await getForRenewalUsers();
      const membershipUser = await getMembershipUserActive();

      return {
        activeAndInactiveUsers: activeUser,
        dayPassUser: dayPassUser,
        renewalUser: renewalUser,
        membershipUser: membershipUser,
      };
    },
  });

  return { isPending, data, fetchStatus, isLoading, refetch };
};

export default useGetActiveAndInactiveUsers;
