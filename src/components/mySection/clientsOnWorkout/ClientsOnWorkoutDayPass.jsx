import React, { useEffect, useState } from "react";
import YearValidation from "../../../others/YearValidation";
import { useLogoutStore } from "../../../store/useLogoutStore";
import remainingDays from "../../../others/GetRemainingDays";
import getExtendedSubscription from "../../../getData/getExtendedSubscription";
import UserLogout from "../clientsOnline/userLogout";
import getSubscriptionDaysLeft from "../../../getData/getSubscriptionDaysLeft";
import pic from "./../../../../src/assets/img/dummy.png";
import ReactTimeAgo from "react-time-ago";
import formatTimeToString from "../../../others/formatTimeToString";
import FormatDate from "../../../others/FormatDate";
import UserDayPassLogout from "../clientsOnline/userDayPassLogout";

const ClientsOnWorkoutDayPass = ({ online }) => {
  const [remaining, setRemaining] = useState(0);
  const [extendedSubscript, setExtendedSubscript] = useState([]);

  const yearValidation = YearValidation(online.time_out);
  const dateObj = new Date(online.date_log);
  const timestamp = dateObj.getTime(); // Convert Date object to timestamp in milliseconds

  const trigger = useLogoutStore((state) => state.trigger);

  // get the remaining days
  const getRemainingDays = async () => {
    setRemaining(
      await remainingDays(
        online.flexprouserdaypass.date_subscribed,
        online.flexprouserdaypass.subscription.per.per,
        online.flexprouserdaypass.id
      )
    );
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Your code to be executed every 1000ms
      getRemainingDays();
    }, 1000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []); // Add dependencies as needed

  const handleLogout = async () => {
    const result = await UserDayPassLogout(online.time_in, online.id);
    //   setRefresher((prev) => prev + 1);
    //   setTempTimeOut(formatTimeToString(Date()));

    console.log(result);
  };

  const onlineOfflineClass = () => {
    return yearValidation === 1990 ? "online" : "offline";
  };

  const onlineOfflineBtnClass = () => {
    return remainingDaysLeft() === "Expired" && yearValidation === 1990
      ? "btn btn-danger"
      : "btn btn-warning";
  };
  const expiredStyle = () => {
    return remainingDaysLeft() === "Expired" && yearValidation === 1990
      ? { border: "2px solid red" }
      : { border: "0px solid black" };
  };

  const remainingDaysLeft = () => {
    return getSubscriptionDaysLeft(
      remaining,
      extendedSubscript,
      online.flexprouserdaypass.date_subscribed,
      false
    );
  };

  return (
    <div className="col-lg-3 col-xs-12">
      <div className="c-col" style={expiredStyle()}>
        <div className={onlineOfflineClass()}></div>
        <div className="c-col-name">
          <img
            src={pic}
            alt=""
            style={
              yearValidation === 1990
                ? { color: "green" }
                : { border: "2px solid red" }
            }
          />
          <div className="col-name">
            <h4>
              <span>ID:{online.flexprouserdaypass.id}</span>{" "}
              {online.flexprouserdaypass.name}
            </h4>
          </div>
        </div>
        <div className="c-col-time-in-out">
          <h4>
            Time In: {formatTimeToString(online.time_in)} <br /> Time Out:{" "}
            {yearValidation === 1990
              ? "--:--"
              : formatTimeToString(online.time_out)}
          </h4>
          <p>{FormatDate(online.date_log)}</p>

          {yearValidation === 1990 && (
            <p>
              <ReactTimeAgo
                date={timestamp}
                locale="en-US"
                timeStyle="twitter"
              />{" "}
              ago
            </p>
          )}

          <h3 style={{ color: "yellowgreen" }}>
            {online.flexprouserdaypass.subscription.gym_rate_desc}
          </h3>

          <h5>Remaining Hours:</h5>
          <h5 style={{ color: "orange" }}>
            {/* {remaining < 0 ? "Expired" : remaining} */}
            {/* {formatTime(remaining, "all")} */}
            {remainingDaysLeft()}
          </h5>
        </div>

        {yearValidation === 1990 && (
          <button className={onlineOfflineBtnClass()} onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default ClientsOnWorkoutDayPass;
