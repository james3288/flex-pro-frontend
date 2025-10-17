import { memo, useMemo } from "react";
import dayPassImage from "@assets/img/dummy.png";
import SpinnerComponent from "../../../components/spinner/SpinnerComponent";
import useClientsOnWorkout2 from "../../../hooks/useClientsOnWorkout2";
import formatTimeToString from "../../../others/formatTimeToString";
import ReactTimeAgo from "react-time-ago";
import YearValidation from "../../../others/YearValidation";
import FormatDate from "../../../others/FormatDate";

// 🔹 Child Components moved outside for stability

const isUserOnline = ({ user }) => {
  const yearValidation = YearValidation(user.time_out);
  if (yearValidation === 1990) {
    return true;
  }
  return false;
};

const UserImage = memo(({ src, isOnline }) => (
  <div className="col-3">
    <img
      src={src}
      alt=""
      className="circle"
      style={{ border: "2px solid green" }}
    />
  </div>
));

const UserInfo = memo(({ name, id, gymRate }) => (
  <>
    <h5>{name}</h5>
    <p>ID: {id}</p>
    <p style={{ color: "yellow", fontSize: "18px", lineHeight: "14px" }}>
      {gymRate}
    </p>
  </>
));

const LoginTimeStatus = memo(({ user }) => {
  const yearValidation = YearValidation(user.time_out);

  // Stable timestamp
  const timestamp = useMemo(
    () => new Date(user?.date_log).getTime(),
    [user?.date_log]
  );

  const isOnline = isUserOnline({ user });

  return (
    <div className="c-col-time-in-out">
      <p style={{ lineHeight: "18px", color: "orange" }}>
        Time In: {formatTimeToString(user.time_in)} <br />
        Time Out: {isOnline ? "--:--" : formatTimeToString(user.time_out)}
      </p>

      <p>{FormatDate(user.date_log)}</p>

      {isOnline && (
        <p>
          <ReactTimeAgo date={timestamp} locale="en-US" timeStyle="twitter" />{" "}
          ago
        </p>
      )}
    </div>
  );
});

const OnlineUserCard = memo(({ user }) => {
  const sub = user?.usersubscription;

  return !isUserOnline({ user }) ? (
    ""
  ) : (
    <div className="clients-online">
      <div className="row row2">
        <UserImage src={user?.image} isOnline={isUserOnline({ user })} />
        <div className="col-7">
          <div className="clients-flex">
            <UserInfo
              name={sub?.flexprouser?.name}
              id={sub?.flexprouser?.id}
              gymRate={sub?.subscription?.gym_rate_desc}
            />
            <LoginTimeStatus user={user} />
          </div>
        </div>
      </div>
    </div>
  );
});

const OnlineDayPassCard = memo(({ user }) => {
  const sub = user?.flexprouserdaypass;

  return (
    <div className="clients-online">
      <div className="row row2">
        <UserImage src={dayPassImage} />
        <div className="col-7">
          <div className="clients-flex">
            <UserInfo
              name={sub?.name}
              id={sub?.id}
              gymRate={sub?.subscription?.gym_rate_desc}
            />
          </div>
        </div>
      </div>
    </div>
  );
});

// 🔹 Main Hook
const useOnlineUsersData = () => {
  const {
    onlineUsers = [],
    onlineDayPassUsers = [],
    isLoading,
    isPending,
  } = useClientsOnWorkout2();

  const OnlineUserComponent = memo(() => {
    if (isLoading || isPending) return <span>initializing...</span>;
    return (
      <div className="scrollable-list-of-user">
        {onlineUsers.map((user) => (
          <OnlineUserCard user={user} key={user?.id} />
        ))}
        {onlineDayPassUsers.map((user) => (
          <OnlineDayPassCard user={user} key={user?.id} />
        ))}
      </div>
    );
  });

  const NoOfOnlineUsers = () => {
    const countOnlineUsers = onlineUsers?.filter((user) =>
      isUserOnline({ user })
    );

    const countDaypassUsers = onlineDayPassUsers?.filter((user) =>
      isUserOnline({ user })
    );

    return countOnlineUsers?.length + countDaypassUsers?.length;
  };

  return {
    isLoading,
    OnlineUserComponent,
    NoOfOnlineUsers,
  };
};

export default useOnlineUsersData;
