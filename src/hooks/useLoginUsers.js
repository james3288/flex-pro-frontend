import { useQuery } from "@tanstack/react-query";
import useGetActiveUsers from "./useGetActiveUsers";
import useGetDayPassUsers from "./useGetDayPassUsers";

const useLoginUsers = () => {
  const { getActiveUsers } = useGetActiveUsers();
  const { getDayPassUserActive } = useGetDayPassUsers();

  const {
    isPending,
    error,
    data,
    fetchStatus,
    isLoading,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["forLoginUsers"],
    queryFn: async () => {
      const [activeUser, dayPassUser] = await Promise.all([
        getActiveUsers(),
        getDayPassUserActive(),
      ]);

      return {
        activeAndInactiveUsers: activeUser,
        dayPassUser: dayPassUser,
      };
    },
    retry: 2,
    refetchOnWindowFocus: false,
    // staleTime: 10000,
    // refetchInterval: 30000,
  });

  return { isPending, data, fetchStatus, isLoading, refetch, isFetching };
};

export default useLoginUsers;
