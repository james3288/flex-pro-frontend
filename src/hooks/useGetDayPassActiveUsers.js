import { useQuery } from "@tanstack/react-query";
import useGetDayPassUsers from "./useGetDayPassUsers";

const useGetDayPassActiveUsers = () => {
  const { getDayPassUserActive } = useGetDayPassUsers();

  const { isPending, error, data, fetchStatus, isLoading, refetch, isFetching } = useQuery({
    queryKey: ["forActiveDayPassUsers"],
    queryFn: async () => {
      const dayPassUsers = await getDayPassUserActive();

      return {
        dayPassUsers: dayPassUsers,
      };
    },
    staleTime: 0, // always stale
    retry: 2,
    refetchOnWindowFocus: false,
    // staleTime: 10000,
    // refetchInterval: 30000,
  });

  return { isPending, data, fetchStatus, isLoading, refetch, isFetching };
};

export default useGetDayPassActiveUsers;
