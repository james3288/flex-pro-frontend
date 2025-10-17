import { useState, useMemo, useEffect } from "react";
import useDebounce from "./useDebounce";
import getUsersOnlineByDate from "../getData/getUserOnlineByDate";
import getDayPassUserOnline from "../getData/getDayPassUserOnline";
import { useQuery } from "@tanstack/react-query";
import { useLogoutStore } from "../store/useLogoutStore";

const getFormattedDate = () => {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

const useClientsOnWorkout2 = () => {
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
        getUsersOnlineByDate(date),
        getDayPassUserOnline(date),
      ]);
      return { usersOnline, dayPassUsersOnline };
    },

    // refetchOnWindowFocus: false,
    // refetchInterval: 30000, // Refetch every 30 seconds
  });

  const onlineUsers = useMemo(() => {
    return data?.usersOnline?.filter((user) =>
      user?.usersubscription?.flexprouser?.name
        ?.toLowerCase()
        .includes(debounceValue.toLowerCase())
    );
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

export default useClientsOnWorkout2;
