import React, { useEffect, useState } from "react";
import YearValidation from "../../../others/YearValidation";
import FormatDate from "../../../others/FormatDate";
import ReactTimeAgo from "react-time-ago";
import formatTimeToString from "../../../others/formatTimeToString";
import { useQuery } from "@tanstack/react-query";
import getSubscriptionDaysLeft from "../../../getData/getSubscriptionDaysLeft";
import remainingDays from "../../../others/GetRemainingDays";
import formatTime from "../../../others/ReadableFormatTime";
import getExtendedSubscription from "../../../getData/getExtendedSubscription";
import UserLogout from "../clientsOnline/userLogout";
import { useLogoutStore } from "../../../store/useLogoutStore";
import LoadingEffect from "../loadingEffect/LoadingEffect";
import LogoutButton from "./LogoutButton";

const ClientsOnWorkoutNew = ({ online }) => {
  const [remaining, setRemaining] = useState(0);
  const [extendedSubscript, setExtendedSubscript] = useState([]);
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const yearValidation = YearValidation(online.time_out);
  const dateObj = new Date(online.date_log);
  const timestamp = dateObj.getTime(); // Convert Date object to timestamp in milliseconds

  const trigger = useLogoutStore((state) => state.trigger);

  // get the remaining days
  const getRemainingDays = async () => {
    const rd = await remainingDays(
      online.usersubscription.date_subscribed,
      online.usersubscription.subscription.per.per,
      online.usersubscription.flexprouser.id,
      online.usersubscription.sub_session_days === 0
        ? 1
        : online.usersubscription.sub_session_days
    );

    // console.log(rd);
    setRemaining(rd);
  };

  const extendedSub = async () => {
    const data = await getExtendedSubscription(online.usersubscription.id);
    setExtendedSubscript(data);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Your code to be executed every 1000ms
      getRemainingDays();
      extendedSub();
    }, 1000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []); // Add dependencies as needed

  useEffect(() => {
    console.log(isButtonLoading);
  }, [isButtonLoading]);

  // //handles logout events
  // const handleLogout = async () => {
  //   setIsButtonLoading(true);
  //   const result = await UserLogout(online.time_in, online.id);
  //   //   setRefresher((prev) => prev + 1);
  //   //   setTempTimeOut(formatTimeToString(Date()));
  //   setIsButtonLoading(false);

  //   console.log("logout result:", result);
  // };

  // online/offline class
  const onlineOfflineClass = () => {
    return yearValidation === 1990 ? "online" : "offline";
  };
  //online/offline button class
  const onlineOfflineBtnClass = () => {
    return remainingDaysLeft() === "Expired" && yearValidation === 1990
      ? "btn btn-danger"
      : "btn btn-warning";
  };

  //expired class
  const expiredStyle = () => {
    return remainingDaysLeft() === "Expired" && yearValidation === 1990
      ? { border: "2px solid red" }
      : { border: "0px solid black" };
  };

  const remainingDaysLeft = () => {
    return getSubscriptionDaysLeft(
      remaining,
      extendedSubscript,
      online.usersubscription.date_subscribed,
      false
    );
  };

  return (
    <div className="col-lg-3 col-xs-12">
      <div className="c-col" style={expiredStyle()}>
        <div className={onlineOfflineClass()}></div>
        <div className="c-col-name">
          <img
            src={online.image}
            alt=""
            style={
              yearValidation === 1990
                ? { color: "green" }
                : { border: "2px solid red" }
            }
          />
          <div className="col-name">
            <h4>
              <span>ID:{online.usersubscription.flexprouser.id}</span>{" "}
              {online.usersubscription.flexprouser.name}
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
            {online.usersubscription.subscription.gym_rate_desc}
          </h3>
          {online.extendedSubscriptions?.map((extended) => (
            <p style={{ color: "yellowgreen", margin: "0" }}>
              {" "}
              - {extended.subscription.gym_rate_desc} / extend{" "}
              {extended.extended_session_day} day/s
            </p>
          ))}
          <h5>Remaining Days:</h5>
          <h5 style={{ color: "orange" }}>
            {remainingDaysLeft() === "0 day, 0 hours"
              ? "initializing..."
              : remainingDaysLeft()}
          </h5>
        </div>

        {/* {yearValidation === 1990 && isButtonLoading === false && (
          <button className={onlineOfflineBtnClass()} onClick={handleLogout}>
            Logout
          </button>
        )} */}

        <LogoutButton
          onlineOfflineBtnClass={onlineOfflineBtnClass()}
          id={online.id}
          time_in={online.time_in}
          yearValidation={yearValidation}
        />
      </div>
    </div>
  );
};

export default ClientsOnWorkoutNew;
