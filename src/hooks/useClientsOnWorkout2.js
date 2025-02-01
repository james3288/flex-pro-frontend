import { useState } from "react";
import useDebounce from "./useDebounce";
import getUsersOnlineByDate from "../getData/getUserOnlineByDate";
import getDayPassUserOnline from "../getData/getDayPassUserOnline";
import { useQuery } from "@tanstack/react-query";

function getFormattedDate() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  let month = currentDate.getMonth() + 1;
  month = month < 10 ? "0" + month : month;
  let day = currentDate.getDate();
  day = day < 10 ? "0" + day : day;
  return `${year}-${month}-${day}`;
}

const useClientsOnWorkout2 = () => {
  const [search, setSearch] = useState("");
  const [date, setDate] = useState(getFormattedDate());

  const handleSearchOnWorkout = (e) => {
    setSearch(e.target.value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const queryKey = ["onWorkoutData", "dayPassOnWorkOutData"];
  const { isPending, error, data, isLoading } = useQuery({
    queryKey,
    queryFn: async () => {
      const usersOnline = await getUsersOnlineByDate(date);
      const dayPassUsersOnline = await getDayPassUserOnline(date);
      return {
        usersOnline: usersOnline,
        dayPassUsersOnline: dayPassUsersOnline,
      };
    },
    refetchInterval: 1000,
  });

  const debounceValue = useDebounce(search);

  const onlineUsers = data?.usersOnline.filter((user) =>
    user.usersubscription.flexprouser.name
      .toLowerCase()
      .includes(debounceValue.toLowerCase())
  );

  return {
    date,
    handleSearchOnWorkout,
    handleDateChange,
    onlineUsers,
    isLoading,
    isPending,
    debounceValue,
  };
};

export default useClientsOnWorkout2;
