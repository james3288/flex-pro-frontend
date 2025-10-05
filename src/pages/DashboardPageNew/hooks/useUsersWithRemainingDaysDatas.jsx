import { memo, useEffect, useMemo, useState } from "react";
import useDashboardDatas from "./useDashboardDatas";
import { getRemainingDaysLeft } from "../get/getRemainingDaysLeft";
import LoadingEffect from "../../../components/mySection/loadingEffect/LoadingEffect";
import RemainingDaysLeftComponent from "@components/mySection/forRenewal/RemainingDaysLeftComponent";
import PersonalTrainerComponent from "../components/PersonalTrainerComponent";

// 🔹 Child Components moved outside for stability
const UserImage = memo(({ src }) => (
  <div className="col-3">
    <img
      src={src}
      alt=""
      className="circle"
      style={{ border: "2px solid yellowGreen" }}
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

const RemainingDaysWrapper = memo(({ userSub }) => (
  <RemainingDaysLeftComponent
    date_subscribed={userSub?.date_subscribed}
    per={userSub?.subscription?.per?.per}
    user_id={userSub?.flexprouser?.id}
    session_days={userSub?.sub_session_days}
    subscriptionId={userSub?.id}
    id={userSub?.flexprouser?.id}
    fullname={userSub?.flexprouser?.name}
    fontColor="orange"
    fontSize="14px"
  />
));

const ActiveUserCard = memo(({ user }) => {
  const sub = user?.usersubscription;
  return (
    <div className="clients-online">
      <div className="row row2">
        <UserImage src={user?.image} />
        <div className="col-7">
          <div className="clients-flex">
            <UserInfo
              name={sub?.flexprouser?.name}
              id={sub?.flexprouser?.id}
              gymRate={sub?.subscription?.gym_rate_desc}
            />
            <RemainingDaysWrapper userSub={sub} />
            <PersonalTrainerComponent
              trainers={sub?.trainer?.name}
              trainerRemainingDays={user?.trainersRemainingDays}
              session_days={sub?.session_days}
              user_id={sub?.flexprouser?.id}
              id={user.id}
            />
          </div>
        </div>
      </div>
    </div>
  );
});

// 🔹 Main Hook
const useUsersWithRemainingDaysDatas = () => {
  const [usersWithRemaining, setUsersWithRemaining] = useState([]);
  const { activeAndInactiveDatas, isLoading, isPending } = useDashboardDatas();

  useEffect(() => {
    let isMounted = true;

    const addRemainingDays = async () => {
      const users = activeAndInactiveDatas?.activeAndInactiveUsers;
      if (!users) return;

      try {
        const processed = await Promise.all(
          users.map((user) =>
            getRemainingDaysLeft(
              user?.usersubscription?.date_subscribed,
              user?.usersubscription?.subscription?.per?.per,
              user?.usersubscription?.flexprouser?.user_id,
              user?.usersubscription?.session_days,
              user?.usersubscription?.id,
              false
            ).then((remaining) => ({
              ...user,
              remainingDays: remaining,
            }))
          )
        );
        if (isMounted) setUsersWithRemaining(processed);
      } catch (e) {
        console.error("Error processing remaining days:", e);
      }
    };

    if (!isLoading) addRemainingDays();

    return () => {
      isMounted = false; // cleanup to prevent memory leaks
    };
  }, [activeAndInactiveDatas, isLoading]);

  // 🔹 Memoize filtered active users
  const activeUsers = useMemo(
    () => usersWithRemaining.filter((user) => user.remainingDays !== "Expired"),
    [usersWithRemaining]
  );

  const ActiveUsersComponent = memo(() => {
    if (isLoading || isPending) return <span>initializing...</span>;
    return (
      <div className="scrollable-list-of-user">
        {activeUsers.map((user) => (
          <ActiveUserCard user={user} key={user?.id} />
        ))}
      </div>
    );
  });

  const NoOfActiveUsers = () =>
    isLoading ? <LoadingEffect /> : activeUsers.length;

  return {
    usersWithRemaining,
    isLoading,
    ActiveUsersComponent,
    NoOfActiveUsers,
  };
};

export default useUsersWithRemainingDaysDatas;
