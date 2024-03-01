import React from "react";

import ClientsOnWorkout from "./clientsOnWorkout/ClientsOnWorkout";
import { useQuery } from "@tanstack/react-query";
import instance from "../../others/axiosInstance";
import getUsersOnline from "../../getData/getUserOnline";

const MyCLientsOnWorkout = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () => getUsersOnline(),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;
  return (
    <>
      <div className="container-fluid content-margin c-col-scrollbar">
        <div className="row">
          <div className="c-col-wrapper">
            {data?.map((online) => (
              <ClientsOnWorkout
                key={online.id}
                id={online.id}
                name={online.usersubscription.flexprouser.name}
                subscription={
                  online.usersubscription.subscription.gym_rate_desc
                }
                timeIn={online.time_in}
                timeOut={online.time_out}
                date_log={online.date_log}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyCLientsOnWorkout;
