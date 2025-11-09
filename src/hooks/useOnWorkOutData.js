import { useQuery } from "@tanstack/react-query";
import getUsersOnlineByDate from "@getData/getUserOnlineByDate";
import getDayPassUserOnline from "@getData/getDayPassUserOnline";

const useOnWorkOutData = ({ date, trigger = false }) => {
  const queryKey = ["onWorkoutData", date, trigger]; // refetch automatically when date changes

  const { data, isLoading, error, isPending } = useQuery({
    queryKey,
    queryFn: async () => {
      const [usersOnline, dayPassUsersOnline] = await Promise.all([
        getUsersOnlineByDate(date),
        getDayPassUserOnline(date),
      ]);
      return { usersOnline, dayPassUsersOnline };
    },
  });
  return { data, isLoading, error, isPending };
};

export default useOnWorkOutData;
