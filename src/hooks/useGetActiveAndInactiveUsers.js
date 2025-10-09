import { useQuery } from "@tanstack/react-query";
import getActiveAndInactiveUsers from "../getData/getActiveAndInactiveUsers";
import useGetActiveUsers from "./useGetActiveUsers";
import useGetDayPassUsers from "./useGetDayPassUsers";

const useGetActiveAndInactiveUsers = () => {
  // const queryKey = ["forActiveAndInactiveUsers"];
  // const { isPending, error, data, fetchStatus, isLoading } = useQuery({
  //   queryKey,
  //   queryFn: async () => {
  //     const activeAndInactiveUsers = await getActiveAndInactiveUsers(); //getActiveUser();
  //     return {
  //       activeAndInactiveUsers: activeAndInactiveUsers,
  //     };
  //   },
  //   refetchOnWindowFocus: false, // don’t refetch on tab focus
  //   refetchOnMount: false, // don’t refetch when component remounts
  //   staleTime: 1000 * 60 * 5, // ✅ 5 minutes - data stays "fresh"
  //   cacheTime: 1000 * 60 * 30, // ✅ 30 minutes - data kept in cache even if unused
  // });

  const { getActiveUsers } = useGetActiveUsers();
  const { getDayPassUserActive } = useGetDayPassUsers();

  const { isPending, error, data, fetchStatus, isLoading } = useQuery({
    queryKey: ["forActiveAndInactiveUsers"],
    queryFn: async () => {
      const activeUser = await getActiveUsers();
      // const dayPassUser = await getDayPassUserActive();
      return { activeAndInactiveUsers: activeUser };
    },
  });

  return { isPending, data, fetchStatus, isLoading };
};

export default useGetActiveAndInactiveUsers;
