import { useEffect, useReducer, useState } from "react";
import {
  clientsOnWorkOutReducer,
  INITIAL_STATE,
} from "../reducers/clientsOnWorkOutReducer";
import { useQuery } from "@tanstack/react-query";
import getDayPassUserOnline from "../getData/getDayPassUserOnline";
import getUsersOnlineByDate from "../getData/getUserOnlineByDate";
import useDebounce from "./useDebounce";

function getFormattedDate() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  let month = currentDate.getMonth() + 1;
  month = month < 10 ? "0" + month : month;
  let day = currentDate.getDate();
  day = day < 10 ? "0" + day : day;
  return `${year}-${month}-${day}`;
}

const useClientsOnWorkout = () => {
  const [date, setDate] = useState(getFormattedDate());
  const [newData, setNewData] = useState([]);
  const [newData2, setNewData2] = useState([]);
  const [state, dispatch] = useReducer(clientsOnWorkOutReducer, INITIAL_STATE);

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

  function handleChange(e) {
    const value = e.target.value;
    setDate(value); // Update state with the new value
  }

  const handleSearchOnWorkout = (e) => {
    // use reducer
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  // subscribed online users
  const data1 = data?.usersOnline?.filter((user) =>
    user?.date_log.includes(date)
  );

  // daypass online users
  const data3 = data?.dayPassUsersOnline?.filter((user) =>
    user?.date_log.includes(date)
  );

  let delay = 6000;
  const debounceValue = useDebounce(state.name, delay);

  useEffect(() => {
    // filter data from subscribed online users
    const filterData1 = data1?.filter((user) =>
      user.usersubscription.flexprouser.name
        .toLowerCase()
        .includes(debounceValue.toLowerCase())
    );
    // filter data from daypass online users
    const filterData2 = data3?.filter((user) =>
      user.flexprouserdaypass.name
        .toLowerCase()
        .includes(debounceValue.toLowerCase())
    );
    setNewData(filterData1);
    setNewData2(filterData2);
  }, [debounceValue, delay]);

  return {
    date,
    data1,
    data3,
    newData,
    newData2,
    state,
    isPending,
    error,
    handleChange,
    handleSearchOnWorkout,
    isLoading,
  };
};

export default useClientsOnWorkout;
