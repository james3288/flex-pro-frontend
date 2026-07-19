import { useQuery } from "@tanstack/react-query";
import getUsersOnlineByDateRange from "@getData/getUsersOnlineByDateRange";
import getDayPassUserOnline from "@getData/getDayPassUserOnline";

const useOnWorkOutDataByDateRange = ({ dateFrom, dateTo, trigger = false }) => {
  const queryKey = ["onWorkoutData", dateFrom, dateTo, trigger]; // refetch automatically when date changes

  const { data, isLoading, error, isPending } = useQuery({
    queryKey,
    queryFn: async () => {
      const [usersOnline, dayPassUsersOnline] = await Promise.all([
        getUsersOnlineByDateRange(dateFrom, dateTo),
        getDayPassUserOnline(dateTo),
      ]);
      return { usersOnline, dayPassUsersOnline };
    },
  });
  return { data, isLoading, error, isPending };
};

export default useOnWorkOutDataByDateRange;
