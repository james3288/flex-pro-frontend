import React, { useEffect, useState, useMemo } from "react";
import YearValidation from "../../../others/YearValidation";
import FormatDate from "../../../others/FormatDate";
import ReactTimeAgo from "react-time-ago";
import formatTimeToString from "../../../others/formatTimeToString";
import { useLogoutStore } from "../../../store/useLogoutStore";
import LogoutButton from "./LogoutButton";
import useRemainingDaysLeft from "../../../hooks/useRemainingDaysLeft";
import LoadingEffect from "../loadingEffect/LoadingEffect";

const ClientsOnWorkoutNew = ({ online }) => {
  const [remainingDaysLeftNew, setRemainingDaysLeftNew] = useState();
  const [localTimeOut, setLocalTimeOut] = useState(online.time_out);
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  // Early destructuring for performance and clarity
  const userSub = online?.usersubscription;
  const user = userSub?.flexprouser;
  const subscription = userSub?.subscription;

  const yearValidation = YearValidation(online.time_out);

  // Stable timestamp
  const timestamp = useMemo(
    () => new Date(online.date_log).getTime(),
    [online.date_log]
  );

  // Custom hook for remaining days
  const { isLoading, remainingDaysLeft } = useRemainingDaysLeft(
    userSub?.date_subscribed,
    subscription?.per?.per,
    user?.id,
    userSub?.sub_session_days,
    userSub?.id
  );

  // Async fetch remaining days safely
  useEffect(() => {
    let isMounted = true;

    const fetchDays = async () => {
      try {
        const result = await remainingDaysLeft();
        if (isMounted) setRemainingDaysLeftNew(result);
      } catch (err) {
        console.error("Failed to fetch remaining days:", err);
      }
    };

    fetchDays();
    return () => {
      isMounted = false;
    };
  }, [remainingDaysLeft]);

  const isFromOnlineToLogout = () => {
    return isOnline && !isLoggedOut;
  };

  const isOnline = yearValidation === 1990;

  // Memoized computed values
  const styles = useMemo(() => {
    const base = {};
    if (remainingDaysLeftNew === "Expired" && isOnline)
      base.border = "2px solid red";
    return base;
  }, [remainingDaysLeftNew, isOnline]);

  const imageStyle = useMemo(
    () =>
      isFromOnlineToLogout() ? { color: "green" } : { border: "2px solid red" },
    [isOnline, isLoggedOut]
  );

  const onlineOfflineClass = isFromOnlineToLogout() ? "online" : "offline";
  const onlineOfflineBtnClass =
    remainingDaysLeftNew === "Expired" && isFromOnlineToLogout()
      ? "btn btn-danger"
      : "btn btn-warning";

  // Memoize extended subscriptions to prevent re-render
  const extendedSubs = useMemo(
    () =>
      online.extendedSubscriptions?.map((extended, idx) => (
        <p key={idx} style={{ color: "yellowgreen", margin: 0 }}>
          - {extended.subscription.gym_rate_desc} / extend{" "}
          {extended.extended_session_day} day/s
        </p>
      )),
    [online.extendedSubscriptions]
  );

  return (
    <div className="col-lg-3 col-xs-12">
      <div className="c-col" style={styles}>
        <div className={onlineOfflineClass}></div>

        <div className="c-col-name">
          <img src={online.image} alt="" style={imageStyle} />
          <div className="col-name">
            <h4>
              <span>ID:{user?.id}</span> {user?.name}
            </h4>
          </div>
        </div>

        <div className="c-col-time-in-out">
          <h4>
            Time In: {formatTimeToString(online.time_in)} <br />
            Time Out:{" "}
            {isFromOnlineToLogout()
              ? "--:--"
              : formatTimeToString(online.time_out)}
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
            {subscription?.gym_rate_desc}
          </h3>

          {extendedSubs}

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
          setLocalTimeOut={setLocalTimeOut}
          setIsLoggedOut={setIsLoggedOut}
          isFromOnlineToLogout={isFromOnlineToLogout}
        />
      </div>
    </div>
  );
};

// ✅ Memoized child avoids unnecessary re-renders
const RemainingDaysComponent = React.memo(
  ({ remainingDaysLeft, isLoading }) => {
    if (isLoading) return <LoadingEffect />;
    return (
      <h5 style={{ color: "orange" }}>
        {remainingDaysLeft === "0 day, 0 hours"
          ? "initializing..."
          : remainingDaysLeft}
      </h5>
    );
  }
);

export default ClientsOnWorkoutNew;
