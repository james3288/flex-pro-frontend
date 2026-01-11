import { useQuery } from "@tanstack/react-query";
import useGetDayPassUsers from "./useGetDayPassUsers";

const useGetDayPassActiveUsers = () => {
  const { getDayPassUserActive } = useGetDayPassUsers();

  const { isPending, error, data, fetchStatus, isLoading, refetch } = useQuery({
    queryKey: ["forActiveDayPassUsers"],
    queryFn: async () => {
      const dayPassUsers = await getDayPassUserActive();

      return {
        dayPassUsers: dayPassUsers,
      };
    },
    staleTime: 0, // always stale
  });

  return { isPending, data, fetchStatus, isLoading, refetch };
};

export default useGetDayPassActiveUsers;
