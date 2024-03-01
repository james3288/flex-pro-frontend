import React from "react";
import Pic1 from "../../../assets/img/team/team-1.jpg";
import { useQuery } from "@tanstack/react-query";
import instance from "../../../others/axiosInstance";
import formatTimeToString from "../../../others/formatTimeToString";
import YearValidation from "../../../others/YearValidation";

const ClientsOnWorkout = ({
  id,
  name,
  subscription,
  timeIn,
  timeOut,
  date_log,
}) => {
  const time_in = formatTimeToString(timeIn);
  const time_out = formatTimeToString(timeOut);

  const yearValidation = YearValidation(timeOut);

  const formatDateOnly = (dateLog) => {
    const dateOnly = new Date(dateLog).toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    return dateOnly; // Added return statement
  };

  return (
    <>
      <div className="col-lg-3 col-xs-12">
        <div className="c-col">
          <div className="online"></div>
          <div className="c-col-name">
            <img src={Pic1} alt="" />
            <div className="col-name">
              <h4>
                <span>ID:{id}</span> {name}
              </h4>
            </div>
          </div>
          <div className="c-col-time-in-out">
            <h4>
              Time In: {time_in} <br /> Time Out:{" "}
              {yearValidation === 1990 ? "--:--" : time_out}
            </h4>
            <p>{formatDateOnly(date_log)}</p>
            <p>3 hours ago</p>
            <h3>{subscription}</h3>
            <h5>Remaining Days:</h5>
            <h5>1 Day</h5>
          </div>
          {yearValidation === 1990 && (
            <button className="btn btn-warning">Logout</button>
          )}
        </div>
      </div>
    </>
  );
};

export default ClientsOnWorkout;
