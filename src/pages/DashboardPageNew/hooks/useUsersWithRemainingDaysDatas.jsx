import React, { useEffect, useState } from "react";
import useDashboardDatas from "./useDashboardDatas";
import { getRemainingDaysLeft } from "../get/getRemainingDaysLeft";
import LoadingEffect from "../../../components/mySection/loadingEffect/LoadingEffect";
import RemainingDaysLeftComponent from "@components/mySection/forRenewal/RemainingDaysLeftComponent";
// import PersonalTrainerComponents from "@components/mySection/forRenewal/PersonalTrainerComponents";
import PersonalTrainerComponent from "../components/PersonalTrainerComponent";
import TrainerRemainingDays from "../../../components/mySection/forRenewal/TrainerRemainingDays";

const useUsersWithRemainingDaysDatas = () => {
  const [refetch, setRefetch] = useState(false);
  const [usersWithRemaining, setUsersWithRemaining] = useState([]);

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
      setUsersWithRemaining(users);
      setRefetch(false);
    };

    if (!isLoading) {
      addRemainingDays();
    }
  }, [activeAndInactiveDatas, isLoading]);

  const ActiveUsers = () => {
    return usersWithRemaining?.filter(
      (user) => user.remainingDays != "Expired"
    );
  };

  const PrivateRemainingDaysLeftComponent = ({ userSub }) => {
    return (
      <RemainingDaysLeftComponent
        date_subscribed={userSub?.date_subscribed}
        per={userSub?.subscription?.per?.per}
        user_id={userSub?.flexprouser?.id}
        session_days={userSub?.sub_session_days}
        subscriptionId={userSub?.id}
        id={userSub?.flexprouser?.id}
        fullname={userSub?.flexprouser?.name}
        fontColor={"orange"}
        fontSize="14px"
      />
    );
  };

  const PrivatePersonalTrainingRemainingDays = () => {
    return (
      <div>
        {/* TRAINER REMAINING DAYS */}
        <h5>Extended Trainer Remaning Days:</h5>
        {extendedTrainer?.length > 0 ? (
          <TrainerRemainingDays
            trainerRemainingDays={trainerRemainingDays}
            session_days={session_days}
            extendedTrainer={extendedTrainer}
            trainers={trainers}
            totalFreeTrainerLeft={totalFreeTrainerLeft}
            setTotalFreeTrainerLeft={setTotalFreeTrainerLeft}
          />
        ) : (
          <h4 style={{ fontSize: "20px", color: "orange" }}>N/A</h4>
        )}
      </div>
    );
  };

  const ActiveUsersComponent = () => {
    if (refetch || isLoading) {
      return <LoadingEffect />;
    }
    return (
      <div className="scrollable-list-of-user">
        {ActiveUsers().map((user) => (
          <div className="clients-online" key={user?.id}>
            <div className="row row2">
              <div className="col-3">
                <img
                  src={user?.image}
                  alt=""
                  className="circle"
                  style={{ border: "2px solid yellowGreen" }}
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

                  <PrivateRemainingDaysLeftComponent
                    userSub={user?.usersubscription}
                  />
                  <PersonalTrainerComponent
                    trainers={user?.usersubscription?.trainer?.name}
                    trainerRemainingDays={user?.trainersRemainingDays}
                    session_days={user?.usersubscription?.session_days}
                    user_id={user?.usersubscription?.flexprouser?.id}
                    id={user.id}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const NoOfActiveUsers = () => {
    if (isLoading) {
      return <LoadingEffect />;
    }
    return ActiveUsers().length;
  };

  return {
    refetch,
    usersWithRemaining,
    isLoading,
    ActiveUsersComponent,
    NoOfActiveUsers,
  };
};

export default useUsersWithRemainingDaysDatas;
