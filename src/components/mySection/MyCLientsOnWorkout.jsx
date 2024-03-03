import React, { useEffect, useRef, useState } from "react";

import ClientsOnWorkout from "./clientsOnWorkout/ClientsOnWorkout";
import { useQuery } from "@tanstack/react-query";
import instance from "../../others/axiosInstance";
import getUsersOnline from "../../getData/getUserOnline";

const MyCLientsOnWorkout = () => {
  const [value, setValue] = useState();
  const [data2, setData2] = useState([]);
  const { isPending, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () => getUsersOnline(),
  });

  const datePickerRef = useRef();

  useEffect(() => {
    // console.log(data);

    const data1 = data?.filter((user) => user.date_log.includes(value));
    console.log(data1);
    setData2(data1);
  }, [value]);

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;
  return (
    <>
      <div className="container-fluid content-margin c-col-scrollbar">
        <div className="form-floating dateTimePicker">
          <input
            type="date"
            className="form-control"
            id="floatingTurnoverDate"
            name="turnover_date"
            onChange={(e) => setValue(e.target.value)}
            ref={datePickerRef}
          />
        </div>
        <div className="row">
          <div className="c-col-wrapper">
            {data2?.map((online) => (
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
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyCLientsOnWorkout;
