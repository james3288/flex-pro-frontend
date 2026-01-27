import React, { useContext, useEffect, useState } from "react";
import FormatDate from "../../../others/FormatDate";
import UserHistory from "./UserHistory";
import { UserHistoryContext } from "../../../context/UserHistoryContext";
import LoadingEffect from "../loadingEffect/LoadingEffect";
import getExtendedTrainerForUserHistory from "../../../getData/getExtendedTrainerForUserHistory";
import formatTime from "@others/ReadableFormatTime";

const ListOfUserHistory = () => {
  const { userSubscriptionDatas, userHistoryDatas } =
    useContext(UserHistoryContext);

  // State to store extended trainers for each user
  const [extendedTrainers, setExtendedTrainers] = useState({});

  // Fetch extended trainers for each user subscription
  const fetchExtendedTrainers = async (user_subscription_id) => {
    const data = await getExtendedTrainerForUserHistory(user_subscription_id);
    setExtendedTrainers((prev) => ({ ...prev, [user_subscription_id]: data }));
  };

  // Fetch extended trainers when userSubscriptionDatas changes
  useEffect(() => {
    if (userSubscriptionDatas?.userSubscriptionData) {
      userSubscriptionDatas.userSubscriptionData.forEach((user) => {
        fetchExtendedTrainers(user.id);
      });
    }
  }, [userSubscriptionDatas]);

  const result = userSubscriptionDatas?.userSubscriptionData?.map((user2) => (
    <div key={user2.id}>
      {/* USER NAME */}
      <h3 style={{ color: "white" }}>{user2?.flexprouser.name}</h3>

      {userSubscriptionDatas.error ||
      userSubscriptionDatas.pending ||
      userHistoryDatas.error ||
      userHistoryDatas.pending ? (
        <div className="row subInfo">
          <div className="col-lg-12">
            <LoadingEffect />
          </div>
        </div>
      ) : (
        <div className="row subInfo">
          {/* SUBSCRIPTION INFO */}
          <div className="col-lg-6">
            {/* USER SUBSCRIPTION */}
            <h3 style={{ color: "orange", marginTop: "15px" }}>
              {user2.id} {user2.subscription.gym_rate_desc}
              {" - "}
              {FormatDate(user2.date_subscribed)}
            </h3>

            {/* USER EXTENDED SUBSCRIPTION */}
            <h4 style={{ color: "gray" }}>Extended Subscription:</h4>

            {user2.extendedSubscriptions.length > 0 ? (
              user2.extendedSubscriptions.map((extended) => (
                <h5 style={{ color: "yellowgreen" }} key={extended.id}>
                  - {extended?.subscription?.gym_rate_desc} -{" "}
                  {extended?.extended_session_day} day/s -{" "}
                  {FormatDate(extended?.date_extend)}
                </h5>
              ))
            ) : (
              <h5 style={{ color: "yellowgreen" }}>None</h5>
            )}

            {/* DAYS LEFT */}
            <h4 style={{ color: "gray" }}>Subscription Days Left:</h4>
            <h5 style={{ color: "yellowgreen" }}>{user2?.extendedSubDays}</h5>
          </div>

          {/* TRAINERS */}
          <div className="col-lg-6">
            <h4 style={{ color: "gray", marginTop: "15px" }}>Main Trainer:</h4>
            <h5 style={{ color: "pink" }}>{user2.trainer?.name}</h5>

            <h4 style={{ color: "gray", marginTop: "15px" }}>
              Extended Trainers:
            </h4>

            {extendedTrainers[user2.id] ? (
              extendedTrainers[user2.id].map((trainer) => (
                <h5 key={trainer.id} style={{ color: "pink" }}>
                  {trainer.trainer?.name} -{" "}
                  {trainer?.PT < 0 ? (
                    <span style={{ color: "red" }}>Expired</span>
                  ) : (
                    <span style={{ color: "orange" }}>
                      {formatTime(trainer?.PT, "days-hours-minutes")}
                    </span>
                  )}
                </h5>
              ))
            ) : (
              <LoadingEffect />
            )}
          </div>
        </div>
      )}

      {/* USER LOGS */}
      <div className="row subInfo">
        {userHistoryDatas?.userHistoryData?.map(
          (user) =>
            user2.id === user.usersubscription?.id && (
              <UserHistory user={user} key={user.id} />
            ),
        )}
      </div>
      <hr />
    </div>
  ));

  return result;
};

export default ListOfUserHistory;
