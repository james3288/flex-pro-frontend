import React, { useEffect, useMemo, useReducer, useRef, useState } from "react";

import ClientsOnWorkout from "./clientsOnWorkout/ClientsOnWorkout";
import { useQuery } from "@tanstack/react-query";
import instance from "../../others/axiosInstance";
import getUsersOnline from "../../getData/getUserOnline";
import YearValidation from "../../others/YearValidation";
import FormatDate from "../../others/FormatDate";
import NoDataFound from "./noDataFound/NoDataFound";
import {
  INITIAL_STATE,
  clientsOnWorkOutReducer,
} from "../../reducers/clientsOnWorkOutReducer";
import getUsersOnlineByDate from "../../getData/getUserOnlineByDate";
import remainingDays from "../../others/GetRemainingDays";
import ClientsOnWorkoutNew from "./clientsOnWorkout/ClientsOnWorkoutNew";
import getDayPassUserOnline from "../../getData/getDayPassUserOnline";

const MyCLientsOnWorkout = () => {
  const [date, setDate] = useState(getFormattedDate());
  const [data2, setData2] = useState([]);
  const [triggerLogout, setTriggerLogout] = useState(false);
  const [search, setSearch] = useState("");
  const [newData, setNewData] = useState([]);
  const [state, dispatch] = useReducer(clientsOnWorkOutReducer, INITIAL_STATE);
  // useEffect(() => {
  //   const newData = data1.filter((user) =>
  //     user.usersubscription.flexprouser.name.toLowerCase().includes(search)
  //   );
  //   console.log(newData);
  // }, [search]);

  let value = false;

  // const queryKey = useMemo(() => ["onWorkoutData"], []);
  const queryKey = ["onWorkoutData"];
  const { isPending, error, data } = useQuery({
    queryKey,
    queryFn: () => getUsersOnlineByDate(date),
    refetchInterval: 1000,
  });

  const queryKey2 = ["dayPassOnWorkOutData"];
  const { isPending2, error2, data3 } = useQuery({
    queryKey2,
    queryFn: () => getDayPassUserOnline(date),
    refecthInterval: 1000,
  });

  function getFormattedDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1;
    month = month < 10 ? "0" + month : month;
    let day = currentDate.getDate();
    day = day < 10 ? "0" + day : day;
    return `${year}-${month}-${day}`;
  }

  if (isPending || isPending2)
    return (
      <div id="preloder">
        <div className="loader"></div>
      </div>
    );

  if (error || error2)
    return <NoDataFound caption="No Data has been found..." />;

  const data1 = data?.filter((user) => user?.date_log.includes(date));
  const dayPassData = data3?.filter((user) => user?.date_log.includes(date));

  function handleChange(e) {
    const value = e.target.value;
    setDate(value); // Update state with the new value
  }

  const handleSearchOnWorkout = (e) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });

    const newData = data1.filter((user) =>
      user.usersubscription.flexprouser.name
        .toLowerCase()
        .includes(e.target.value.toLowerCase())
    );

    setNewData(newData);
  };

  return (
    <>
      <div className="container-fluid content-margin c-col-scrollbar">
        <div className="row dateTimePicker">
          <div className="col-lg-2">
            <input
              type="date"
              className="form-control"
              id="floatingTurnoverDate"
              name="turnover_date"
              onChange={handleChange}
              defaultValue={date}
            />
          </div>
          <div className="col-lg-4">
            <div className="searchuser">
              <div className="search-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="currentColor"
                  className="bi bi-search"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                </svg>
              </div>
              <div className="searchinput">
                <input
                  // ref={searchRef}
                  type="text"
                  placeholder="search user here..."
                  onChange={handleSearchOnWorkout}
                  name="name"
                />
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <h1>
              CLIENTS ON <span>WORKOUT</span>
            </h1>
          </div>
          <div className="form-floating dateTimePicker"></div>
        </div>

        <div className="row">
          <div className="c-col-wrapper">
            {value === false ? (
              state.name === "" ? ( // IF search is empty
                data1?.map((online) => (
                  // <ClientsOnWorkout
                  //   key={online.id}
                  //   id={online.id}
                  //   user_id={online.usersubscription.flexprouser.id}
                  //   name={online.usersubscription.flexprouser.name}
                  //   subscription={
                  //     online.usersubscription.subscription.gym_rate_desc
                  //   }
                  //   timeIn={online.time_in}
                  //   timeOut={online.time_out}
                  //   date_subscribed={online.usersubscription.date_subscribed}
                  //   date_log={online.date_log}
                  //   blobPix={online.image}
                  //   per={online.usersubscription.subscription.per.per}
                  //   setTriggerLogout={setTriggerLogout}
                  //   extendedSubDays={online.extendedSubDays}
                  //   extendedSubscriptions={online.extendedSubscriptions}
                  // />
                  <ClientsOnWorkoutNew online={online} key={online.id} />
                ))
              ) : (
                newData?.map((online) => (
                  <ClientsOnWorkout
                    key={online.id}
                    id={online.id}
                    user_id={online.usersubscription.flexprouser.id}
                    name={online.usersubscription.flexprouser.name}
                    subscription={
                      online.usersubscription.subscription.gym_rate_desc
                    }
                    timeIn={online.time_in}
                    timeOut={online.time_out}
                    date_subscribed={online.usersubscription.date_subscribed}
                    date_log={online.date_log}
                    blobPix={online.image}
                    per={online.usersubscription.subscription.per.per}
                    setTriggerLogout={setTriggerLogout}
                    extendedSubDays={online.extendedSubDays}
                    extendedSubscriptions={online.extendedSubscriptions}
                    subscription_id={online.usersubscription.subscription.id}
                  />
                ))
              )
            ) : (
              <h1>hello world 123</h1>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyCLientsOnWorkout;
