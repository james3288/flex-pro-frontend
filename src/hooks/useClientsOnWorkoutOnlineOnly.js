import { useState, useMemo, useEffect } from "react";
import useDebounce from "./useDebounce";
import getDayPassUserOnline from "../getData/getDayPassUserOnline";
import { useQuery } from "@tanstack/react-query";
import { useLogoutStore } from "@store/useLogoutStore";
import { getFormattedDate } from "@others/dateUtilities";
import getUserOnlineNotIncludeOffline from "../getData/getUserOnlineNotIncludeOffline";

const useClientsOnWorkoutOnlineOnly = () => {
  const [search, setSearch] = useState("");
  const [date, setDate] = useState(getFormattedDate());
  const [refreshKey, setRefreshKey] = useState(0);

  const debounceValue = useDebounce(search);
  const trigger = useLogoutStore((state) => state.trigger);

  const handleSearchOnWorkout = (e) => setSearch(e.target.value);
  const handleDateChange = (e) => setDate(e.target.value);

  const queryKey = ["onWorkoutData", date, trigger]; // refetch automatically when date changes

  const { data, isLoading, error, isPending } = useQuery({
    queryKey,
    queryFn: async () => {
      const [usersOnline, dayPassUsersOnline] = await Promise.all([
        getUserOnlineNotIncludeOffline(),
        getDayPassUserOnline(date),
      ]);
      return { usersOnline, dayPassUsersOnline };
    },

    // refetchOnWindowFocus: false,
    // refetchInterval: 30000, // Refetch every 30 seconds
  });

  const onlineUsers = useMemo(() => {
    return data?.usersOnline;
  }, [data?.usersOnline, debounceValue, refreshKey]);

  const onlineDayPassUsers = useMemo(() => {
    return data?.dayPassUsersOnline?.filter((user) =>
      user?.flexprouserdaypass?.name
        ?.toLowerCase()
        .includes(debounceValue.toLowerCase())
    );
  }, [data?.dayPassUsersOnline, debounceValue, refreshKey]);

  return {
    date,
    handleSearchOnWorkout,
    handleDateChange,
    onlineUsers,
    onlineDayPassUsers,
    isLoading,
    isPending,
    error,
    debounceValue,
    setRefreshKey,
  };
};

export default useClientsOnWorkoutOnlineOnly;
