import { useState, useMemo, useEffect } from "react";
import useDebounce from "./useDebounce";
import getUsersOnlineByDate from "../getData/getUserOnlineByDate";
import getDayPassUserOnline from "../getData/getDayPassUserOnline";
import { useQuery } from "@tanstack/react-query";
import { useLogoutStore } from "@store/useLogoutStore";
import { getFormattedDate } from "@others/dateUtilities";
import useOnWorkOutData from "./useOnWorkOutData";

const useClientsOnWorkout2 = () => {
  const [search, setSearch] = useState("");
  const [date, setDate] = useState(getFormattedDate());
  const [refreshKey, setRefreshKey] = useState(0);

  const debounceValue = useDebounce(search);
  const trigger = useLogoutStore((state) => state.trigger);

  const handleSearchOnWorkout = (e) => setSearch(e.target.value);
  const handleDateChange = (e) => setDate(e.target.value);

  const { data, isLoading, error, isPending } = useOnWorkOutData({
    date: date,
    trigger: trigger,
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
