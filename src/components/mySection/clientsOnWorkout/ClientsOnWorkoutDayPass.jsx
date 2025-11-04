import React, { useEffect, useMemo, useRef, useState } from "react";
import YearValidation from "../../../others/YearValidation";
import { useLogoutStore } from "../../../store/useLogoutStore";
import remainingDays from "../../../others/GetRemainingDays";
import UserDayPassLogout from "../clientsOnline/userDayPassLogout";
import getSubscriptionDaysLeft from "../../../getData/getSubscriptionDaysLeft";
import pic from "./../../../../src/assets/img/dummy.png";
import ReactTimeAgo from "react-time-ago";
import formatTimeToString from "../../../others/formatTimeToString";
import FormatDate from "../../../others/FormatDate";

const ClientsOnWorkoutDayPass = ({ online, setRefreshKey }) => {
  const [remaining, setRemaining] = useState(0);
  const yearValidation = YearValidation(online.time_out);
  const triggered = useLogoutStore((state) => state.trigger);
  const timestamp = new Date(online.date_log).getTime();

  const [localTimeOut, setLocalTimeOut] = useState(online.time_out);
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  const isMounted = useRef(true);

  // Optimized async function
  const getRemainingDays = async () => {
    const res = await remainingDays(
      online.flexprouserdaypass.date_subscribed,
      online.flexprouserdaypass.subscription?.per?.per,
      online.flexprouserdaypass.id
    );

    if (isMounted.current) setRemaining(res);
  };

  useEffect(() => {
    isMounted.current = true;
    getRemainingDays();

    const intervalId = setInterval(getRemainingDays, 30000); // call every 30s

    return () => {
      isMounted.current = false;
      clearInterval(intervalId);
    };
  }, [online.id]);

  const handleLogout = async () => {
    const result = await UserDayPassLogout(online.time_in, online.id);

    const now = new Date(); // local current time
    setLocalTimeOut(now); // update immediate UI
    setIsLoggedOut(true); // hide the button

    setRefreshKey((prev) => prev + 1);
  };

  const daysLeft = useMemo(() => {
    return getSubscriptionDaysLeft(
      remaining,
      [],
      online.flexprouserdaypass.date_subscribed,
      false
    );
  }, [remaining, online.flexprouserdaypass.date_subscribed]);

  const isExpired = daysLeft === "Expired" || remaining < 0;
  const isOnline = yearValidation === 1990;

  const isFromOnlineToLogout = () => {
    return isOnline && !isLoggedOut;
  };

  return (
    <div className="col-lg-3 col-xs-12">
      <div
        className="c-col"
        style={isOnline && isExpired ? { border: "2px solid red" } : {}}
      >
        <div className={isFromOnlineToLogout() ? "online" : "offline"}></div>

        <div className="c-col-name">
          <img
            src={pic}
            alt=""
            style={isFromOnlineToLogout() ? {} : { border: "2px solid red" }}
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
            Time In: {formatTimeToString(online.time_in)} <br />
            Time Out:{" "}
            {isFromOnlineToLogout()
              ? "--:--"
              : formatTimeToString(localTimeOut)}
          </h4>

          <p>{FormatDate(online.date_log)}</p>

          {isFromOnlineToLogout() && (
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
            {isExpired ? "Expired" : daysLeft}
          </h5>
        </div>

        {isFromOnlineToLogout() && (
          <button
            className={`btn ${isExpired ? "btn-danger" : "btn-warning"}`}
            onClick={handleLogout}
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default ClientsOnWorkoutDayPass;
