import React, { useMemo } from "react";
import YearValidation from "../../../others/YearValidation";
import FormatDate from "../../../others/FormatDate";
import ReactTimeAgo from "react-time-ago";
import formatTimeToString from "../../../others/formatTimeToString";
import { useLogoutStore } from "../../../store/useLogoutStore";
import LogoutButton from "./LogoutButton";
import useRemainingDaysLeft from "../../../hooks/useRemainingDaysLeft";
import LoadingEffect from "../loadingEffect/LoadingEffect";

const ClientsOnWorkoutNew = ({ online }) => {
  const [remainingDaysLeftNew, setRemainingDaysLeftNew] = React.useState();
  const yearValidation = useMemo(
    () => YearValidation(online.time_out),
    [online.time_out]
  );
  const timestamp = useMemo(
    () => new Date(online.date_log).getTime(),
    [online.date_log]
  );
  const trigger = useLogoutStore((state) => state.trigger);

  const { isLoading, remainingDaysLeft } = useRemainingDaysLeft(
    online.usersubscription.date_subscribed,
    online.usersubscription.subscription.per.per,
    online.usersubscription.flexprouser.id,
    online.usersubscription.sub_session_days,
    online.usersubscription.id
  );

  const remDaysResult = async () => {
    const result = await remainingDaysLeft();
    setRemainingDaysLeftNew(result);
  };

  remDaysResult();

  const onlineOfflineClass = useMemo(
    () => (yearValidation === 1990 ? "online" : "offline"),
    [yearValidation]
  );

  const onlineOfflineBtnClass = useMemo(
    () =>
      remainingDaysLeftNew === "Expired" && yearValidation === 1990
        ? "btn btn-danger"
        : "btn btn-warning",
    [remainingDaysLeftNew, yearValidation]
  );

  const expiredStyle = useMemo(
    () =>
      remainingDaysLeftNew === "Expired" && yearValidation === 1990
        ? { border: "2px solid red" }
        : { border: "0px solid black" },
    [remainingDaysLeftNew, yearValidation]
  );

  return (
    <div className="col-lg-3 col-xs-12">
      <div className="c-col" style={expiredStyle}>
        <div className={onlineOfflineClass}></div>
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
            Time In: {formatTimeToString(online.time_in)} <br />
            Time Out:{" "}
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

          {online.extendedSubscriptions?.map((extended, idx) => (
            <p key={idx} style={{ color: "yellowgreen", margin: "0" }}>
              - {extended.subscription.gym_rate_desc} / extend{" "}
              {extended.extended_session_day} day/s
            </p>
          ))}

          <h5>Remaining Days:</h5>
          <RemainingDaysComponent
            remainingDaysLeft={remainingDaysLeftNew}
            isLoading={isLoading}
          />
        </div>

        <LogoutButton
          onlineOfflineBtnClass={onlineOfflineBtnClass}
          id={online.id}
          time_in={online.time_in}
          yearValidation={yearValidation}
        />
      </div>
    </div>
  );
};

const RemainingDaysComponent = ({ remainingDaysLeft, isLoading }) => {
  return isLoading ? (
    <LoadingEffect />
  ) : (
    <h5 style={{ color: "orange" }}>
      {remainingDaysLeft === "0 day, 0 hours"
        ? "initializing..."
        : remainingDaysLeft}
    </h5>
  );
};

export default ClientsOnWorkoutNew;
