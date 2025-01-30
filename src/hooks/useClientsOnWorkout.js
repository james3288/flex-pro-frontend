import { useReducer, useState } from "react";
import {
  clientsOnWorkOutReducer,
  INITIAL_STATE,
} from "../reducers/clientsOnWorkOutReducer";
import { useQuery } from "@tanstack/react-query";
import getDayPassUserOnline from "../getData/getDayPassUserOnline";
import getUsersOnlineByDate from "../getData/getUserOnlineByDate";

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

  const data1 = data?.usersOnline?.filter((user) =>
    user?.date_log.includes(date)
  );

  const data3 = data?.dayPassUsersOnline?.filter((user) =>
    user?.date_log.includes(date)
  );

  function handleChange(e) {
    const value = e.target.value;
    setDate(value); // Update state with the new value
  }

  const handleSearchOnWorkout = (e) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });

    const filterData1 = data1.filter((user) =>
      user.usersubscription.flexprouser.name
        .toLowerCase()
        .includes(e.target.value.toLowerCase())
    );

    const filterData2 = data3.filter((user) =>
      user.flexprouserdaypass.name
        .toLowerCase()
        .includes(e.target.value.toLowerCase())
    );

    setNewData(filterData1);
    setNewData2(filterData2);
  };

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
