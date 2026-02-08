import { memo, useEffect, useMemo, useState } from "react";
import useDashboardDatas from "./useDashboardDatas";
import { getRemainingDaysLeft } from "../get/getRemainingDaysLeft";
import LoadingEffect from "@components/mySection/loadingEffect/LoadingEffect";
import RemainingDaysLeftComponent from "@components/mySection/forRenewal/RemainingDaysLeftComponent";
import PersonalTrainerComponent from "../components/PersonalTrainerComponent";
import dayPassImage from "@assets/img/dummy.png";
import Loader2 from "@components/ui/loader2/Loader2";
import Loader3 from "@components/ui/loader3/loader3";
import formatTime from "@others/ReadableFormatTime";
import CardSkeleton from "@components/ui/CardSkeleton/CardSkeleton";

// 🔹 Child Components moved outside for stability
const UserImage = memo(({ src }) => (
  <div className="col-3 user-image">
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
    <p style={{ color: "yellow", fontSize: "18px", lineHeight: "19px" }}>
      {gymRate}
    </p>
  </>
));

const MembershipUserInfo = memo(({ name, id, gymRate }) => (
  <>
    <h5>{name}</h5>
    <p>ID: {id}</p>
    <p style={{ color: "red", fontSize: "18px", lineHeight: "19px" }}>
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
    daysOnly={false}
  />
));

const RemainingDaysDayPassWrapper = memo(({ userSub }) => (
  <RemainingDaysLeftComponent
    date_subscribed={userSub?.date_subscribed}
    per={userSub?.subscription?.per?.per}
    user_id={userSub?.id}
    session_days={1}
    subscriptionId={userSub?.subscription?.id}
    id={userSub?.id}
    fullname={userSub?.name}
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

const ActiveMembershipUserCard = memo(({ user }) => {
  const sub = user;

  return (
    <div className="clients-online">
      <div className="row row2">
        <UserImage src={dayPassImage} />
        <div className="col-7">
          <div className="clients-flex">
            <MembershipUserInfo
              name={sub?.name}
              id={sub?.id}
              gymRate={sub?.subscription?.gym_rate_desc}
            />
            <RemainingDaysDayPassWrapper userSub={sub} />
          </div>
        </div>
      </div>
    </div>
  );
});

// 🔹 Main Hook
const useUsersRenewal = () => {
  const [usersWithRemaining, setUsersWithRemaining] = useState([]);
  const [dayPassUserWithRemaining, setDayPassUserWithRemaining] = useState([]);
  const [membershipUserWithRemaining, setMembershipUserWithRemaining] =
    useState([]);

  const { activeAndInactiveDatas, isLoading, isPending } = useDashboardDatas();

  const { dayPassUser, renewalUser, membershipUser } =
    activeAndInactiveDatas || {};

  // 🔹 Effect to compute remaining days for renewal users
  useEffect(() => {
    let isMounted = true;

    const addRemainingDays = async () => {
      const users = renewalUser;
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
              true,
            ).then((remaining) => ({
              ...user,
              remainingDays: remaining,
            })),
          ),
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
  }, [renewalUser, isLoading]);

  // 🔹 Effect to compute remaining days for daypassUser
  useEffect(() => {
    let isMounted = true;

    const addRemainingDays = async () => {
      const users = dayPassUser;
      if (!users) return;

      try {
        const processed = await Promise.all(
          users.map((user) =>
            getRemainingDaysLeft(
              user?.date_subscribed,
              user?.subscription?.per?.per,
              user?.id,
              1,
              user?.subscription?.id,
              false,
            ).then((remaining) => ({
              ...user,
              remainingDays: remaining,
            })),
          ),
        );
        if (isMounted) setDayPassUserWithRemaining(processed);
      } catch (e) {
        console.error("Error processing remaining days:", e);
      }
    };

    if (!isLoading) addRemainingDays();

    return () => {
      isMounted = false; // cleanup to prevent memory leaks
    };
  }, [dayPassUser, isLoading]);

  // 🔹 Effect to compute remaining days for membership renewal users
  useEffect(() => {
    let isMounted = true;

    const addRemainingDays = async () => {
      const users = membershipUser;
      if (!users) return;

      try {
        const processed = await Promise.all(
          users.map((user) =>
            getRemainingDaysLeft(
              user?.date_subscribed,
              user?.subscription?.per?.per,
              user?.id,
              1,
              user?.subscription?.id,
              false,
            ).then((remaining) => ({
              ...user,
              remainingDays: remaining,
            })),
          ),
        );
        if (isMounted) setMembershipUserWithRemaining(processed);
      } catch (e) {
        console.error("Error processing remaining days:", e);
      }
    };

    if (!isLoading) addRemainingDays();

    return () => {
      isMounted = false; // cleanup to prevent memory leaks
    };
  }, [membershipUser, isLoading]);

  // 🔹 Memoize filtered renewal users
  const activeUsers = useMemo(
    () => usersWithRemaining.filter((user) => user.remainingDays <= 2),
    [usersWithRemaining],
  );

  // 🔹 Memoize filtered membership renewal users
  const activeMembershipUsers = useMemo(
    () =>
      membershipUserWithRemaining.filter((user) => {
        const remainingMembershipHours = formatTime(
          user?.remaining,
          "days-only",
        );
        return remainingMembershipHours <= 2;
      }),
    [membershipUserWithRemaining],
  );

  const ActiveUsersComponent = memo(() => {
    if (isLoading || isPending) return <CardSkeleton />;
    return (
      <div className="scrollable-list-of-user">
        {activeUsers.map((user) => (
          <ActiveUserCard user={user} key={user?.id} />
        ))}
        {activeMembershipUsers.map((user) => (
          <ActiveMembershipUserCard user={user} key={user?.id} />
        ))}
      </div>
    );
  });

  const NoOfActiveUsers = () =>
    isLoading ? <Loader3 /> : activeUsers.length + activeMembershipUsers.length;

  return {
    usersWithRemaining,
    isLoading,
    ActiveUsersComponent,
    NoOfActiveUsers,
  };
};

export default useUsersRenewal;
