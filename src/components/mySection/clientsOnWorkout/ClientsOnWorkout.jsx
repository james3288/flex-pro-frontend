import React, { useEffect, useMemo, useState } from "react";
import Pic1 from "../../../assets/img/team/team-1.jpg";
import { useQuery } from "@tanstack/react-query";
import instance from "../../../others/axiosInstance";
import formatTimeToString from "../../../others/formatTimeToString";
import YearValidation from "../../../others/YearValidation";
import ReactTimeAgo from "react-time-ago";
import remainingDays from "../../../others/GetRemainingDays";
import formatTime from "../../../others/ReadableFormatTime";
import UserLogout from "../clientsOnline/userLogout";

const ClientsOnWorkout = ({
  id,
  name,
  subscription,
  timeIn,
  timeOut,
  date_subscribed,
  date_log,
  blobPix,
  per,
  setTriggerLogout,
}) => {
  const time_in = formatTimeToString(timeIn);
  const time_out = formatTimeToString(timeOut);

  const yearValidation = YearValidation(timeOut);
  const [remaining, setRemaining] = useState(0);

  // get the remaining days
  const getRemainingDays = async () => {
    setRemaining(await remainingDays(date_subscribed, per));
  };

  const formatDateOnly = (dateLog) => {
    const dateOnly = new Date(dateLog).toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    return dateOnly; // Added return statement
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (formatTime(remaining, "minutes-left") < 0) {
        // setRefresher2(true);

        clearInterval(intervalId);
      } else {
        getRemainingDays();
      }
    }, 1000);

    // Clean up the interval when the component sunmounts
    return () => clearInterval(intervalId);
  }, [remaining]);

  const handleLogout = () => {
    const result = UserLogout(timeIn, id, setTriggerLogout);
    console.log(result);
  };

  return (
    <>
      <div className="col-lg-3 col-xs-12">
        <div className="c-col">
          <div className={yearValidation === 1990 ? "online" : "offline"}></div>
          <div className="c-col-name">
            <img src={blobPix} alt="" />
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
            <p>
              {" "}
              <ReactTimeAgo date={timeIn} locale="en-US" timeStyle="twitter" />
            </p>
            <h3>{subscription}</h3>
            <h5>Remaining Days:</h5>
            <h5>{remaining < 0 ? "Expired" : formatTime(remaining, "all")}</h5>
          </div>
          {yearValidation === 1990 && (
            <button className="btn btn-warning" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default ClientsOnWorkout;
