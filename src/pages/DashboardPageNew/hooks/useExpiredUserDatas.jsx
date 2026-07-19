import React, { useEffect, useState, useMemo } from "react";
import useDashboardDatas from "./useDashboardDatas";
import { getRemainingDaysLeft } from "../get/getRemainingDaysLeft";
import LoadingEffect from "../../../components/mySection/loadingEffect/LoadingEffect";

const useExpiredUserDatas = () => {
  const [expiredUsers, setExpiredUsers] = useState([]);
  const { activeAndInactiveDatas, isLoading } = useDashboardDatas();

  useEffect(() => {
    let isMounted = true;

    const addRemainingDays = async () => {
      if (!activeAndInactiveDatas?.activeAndInactiveUsers) return;

      try {
        const users = await Promise.all(
          activeAndInactiveDatas.activeAndInactiveUsers.map(async (user) => {
            try {
              const remaining = await getRemainingDaysLeft(
                user?.usersubscription?.date_subscribed,
                user?.usersubscription?.subscription?.per?.per,
                user?.usersubscription?.flexprouser?.user_id,
                user?.usersubscription?.session_days,
                user?.usersubscription?.id
              );
              return { ...user, remainingDays: remaining };
            } catch (err) {
              console.error(
                "Error fetching remaining days for user:",
                user?.id,
                err
              );
              return { ...user, remainingDays: "N/A" }; // fallback value
            }
          })
        );

        if (isMounted) {
          setExpiredUsers(users);
        }
      } catch (error) {
        console.error("Error processing expired users:", error);
      }
    };

    if (!isLoading) {
      addRemainingDays();
    }

    return () => {
      isMounted = false;
    };
  }, [activeAndInactiveDatas, isLoading]);

  // ✅ Memoize filtered results to avoid recalculation
  const expiredOnly = useMemo(
    () => expiredUsers.filter((user) => user.remainingDays === "Expired"),
    [expiredUsers]
  );

  const ExpiredUsersComponent = () => {
    if (isLoading) return <LoadingEffect />;
    return (
      <div className="scrollable-list-of-user">
        {expiredOnly.slice(0, 5).map((user) => (
          <div className="clients-online" key={user?.id}>
            <div className="row row2">
              <div className="col-3">
                <img
                  src={user?.image}
                  alt=""
                  className="circle"
                  style={{ border: "2px solid red" }}
                />
              </div>
              <div className="col-7">
                <div className="clients-flex">
                  <h5>{user?.usersubscription?.flexprouser?.name}</h5>
                  <p>ID: {user?.usersubscription?.flexprouser?.id}</p>
                  <p
                    style={{
                      color: "yellow",
                      fontSize: "18px",
                      lineHeight: "14px",
                    }}
                  >
                    {user?.usersubscription?.subscription?.gym_rate_desc}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const NoOfExpiredUsers = () => {
    if (isLoading) return <LoadingEffect />;
    return expiredOnly.length;
  };

  return {
    expiredUsers,
    isLoading,
    ExpiredUsersComponent,
    NoOfExpiredUsers,
  };
};

export default useExpiredUserDatas;
