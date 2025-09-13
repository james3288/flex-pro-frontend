import React, { useEffect, useState } from "react";
import useDashboardDatas from "./useDashboardDatas";
import { getRemainingDaysLeft } from "../get/getRemainingDaysLeft";
import LoadingEffect from "../../../components/mySection/loadingEffect/LoadingEffect";

const useExpiredUserDatas = () => {
  const [refetch, setRefetch] = useState(false);
  const [expiredUsers, setExpiredUsers] = useState([]);

  const { activeAndInactiveDatas, isLoading } = useDashboardDatas();

  useEffect(() => {
    const addRemainingDays = async () => {
      if (!activeAndInactiveDatas?.activeAndInactiveUsers) return;

      setRefetch(true);
      const users = await Promise.all(
        activeAndInactiveDatas.activeAndInactiveUsers.map(async (user) => {
          const remaining = await getRemainingDaysLeft(
            user?.usersubscription?.date_subscribed,
            user?.usersubscription?.subscription?.per?.per,
            user?.usersubscription?.flexprouser?.user_id,
            user?.usersubscription?.session_days,
            user?.usersubscription?.id
          );
          return {
            ...user,
            remainingDays: remaining,
          };
        })
      );
      setExpiredUsers(users);
      setRefetch(false);
    };

    if (!isLoading) {
      addRemainingDays();
    }
  }, [activeAndInactiveDatas, isLoading]);

  const getExpiredUsers = () => {
    return expiredUsers?.filter((user) => user.remainingDays === "Expired");
  };

  const ExpiredUsersComponent = () => {
    if (refetch || isLoading) {
      return <LoadingEffect />;
    }
    return (
      <div className="scrollable-list-of-user">
        {getExpiredUsers()
          .slice(0, 5)
          .map((user) => (
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
    if (isLoading) {
      return <LoadingEffect />;
    }
    return getExpiredUsers().length;
  };

  return {
    refetch,
    expiredUsers,
    isLoading,
    ExpiredUsersComponent,
    NoOfExpiredUsers,
  };
};

export default useExpiredUserDatas;
