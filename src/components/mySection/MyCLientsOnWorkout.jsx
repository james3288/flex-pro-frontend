import React, { useEffect, useMemo, useRef, useState } from "react";

import ClientsOnWorkout from "./clientsOnWorkout/ClientsOnWorkout";
import { useQuery } from "@tanstack/react-query";
import instance from "../../others/axiosInstance";
import getUsersOnline from "../../getData/getUserOnline";
import YearValidation from "../../others/YearValidation";
import FormatDate from "../../others/FormatDate";

const MyCLientsOnWorkout = () => {
  let value = false;
  const queryKey = useMemo(() => ["onWorkoutData"], []);
  const { isPending, error, data } = useQuery({
    queryKey,
    queryFn: () => getUsersOnline(),
    // refetchInterval: 1000,
  });

  const [date, setDate] = useState(getFormattedDate());
  const [data2, setData2] = useState([]);
  const [triggerLogout, setTriggerLogout] = useState(false);

  function getFormattedDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1;
    month = month < 10 ? "0" + month : month;
    let day = currentDate.getDate();
    day = day < 10 ? "0" + day : day;
    return `${year}-${month}-${day}`;
  }

  if (isPending)
    return (
      <div id="preloder">
        <div class="loader"></div>
      </div>
    );

  if (error) return "An error has occurred: " + error.message;

  const data1 = data?.filter((user) => user?.date_log.includes(date));
  console.log(data1, value);
  function handleChange(e) {
    const value = e.target.value;
    setDate(value); // Update state with the new value
  }

  return (
    <>
      <div className="container-fluid content-margin c-col-scrollbar">
        <div className="row">
          <div className="form-floating dateTimePicker">
            <input
              type="date"
              className="form-control"
              id="floatingTurnoverDate"
              name="turnover_date"
              onChange={handleChange}
              defaultValue={date}
            />
            <h1>
              CLIENTS ON <span>WORKOUT</span>
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="c-col-wrapper">
            {value === false ? (
              data1?.map((online) => (
                <ClientsOnWorkout
                  key={online.id}
                  id={online.id}
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
                />
              ))
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
