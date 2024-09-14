import React, { useContext, useEffect, useState } from "react";
import FormatDate from "../../../others/FormatDate";
import UserHistory from "./UserHistory";
import { UserHistoryContext } from "../../../context/UserHistoryContext";
import LoadingEffect from "../loadingEffect/LoadingEffect";
import remainingDays from "../../../others/GetRemainingDays";
import getExtendedSubscription from "../../../getData/getExtendedSubscription";
import getSubscriptionDaysLeft from "../../../getData/getSubscriptionDaysLeft";

const ListOfUserHistory = () => {
  const { userSubscriptionDatas, userHistoryDatas, extendedTrainerDatas } =
    useContext(UserHistoryContext);

  console.log(userSubscriptionDatas);

  const result = userSubscriptionDatas?.userSubscriptionData?.map((user2) => {
    return (
      <>
        {/* USER NAME */}
        <h3 style={{ color: "white" }}>{user2?.flexprouser.name}</h3>
        <div key={user2.id}>
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
            <div className="row subInfo" key={user2.id}>
              {/* SUBSCRIPTION INFO */}
              <div className="col-lg-6">
                {/* USER SUBSCRIPTION */}
                <h3 style={{ color: "orange", marginTop: "15px" }}>
                  {user2.subscription.gym_rate_desc}
                  {" - "}
                  {FormatDate(user2.date_subscribed)}
                </h3>

                {/* USER EXTENDED SUBSCRIPTION */}
                <h4 style={{ color: "gray" }}>Extended Subscription:</h4>

                {user2.extendedSubscriptions.length > 0 ? (
                  user2.extendedSubscriptions?.map((extended) => (
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
                <h5 style={{ color: "yellowgreen" }}>
                  {/* {user2?.extendedSubDays < 0
                    ? "Expired"
                    : user2?.extendedSubDays + " Day/s"} */}
                  {user2?.extendedSubDays}
                </h5>
              </div>

              {/* TRAINERS */}
              <div className="col-lg-6">
                <h4 style={{ color: "gray", marginTop: "15px" }}>
                  Main Trainer:
                </h4>
                <h5 style={{ color: "pink" }}>{user2.trainer?.name}</h5>
                <h4 style={{ color: "gray", marginTop: "15px" }}>
                  Extended Trainers:
                </h4>
                {/* {user2?.extendedTrainer?.map((trainer) => (
                  <h5 key={trainer.id} style={{ color: "pink" }}>
                    {trainer.trainer?.name}
                  </h5>
                ))} */}

                {extendedTrainerDatas?.extendedTrainerData?.map((extended) => (
                  <h5>{}</h5>
                ))}

                {/* <h5 style={{ color: "pink" }}>JUAN DELA CRUZ</h5>
<h5 style={{ color: "pink" }}>LUFFY D. MONKEY</h5> */}
              </div>
            </div>
          )}

          {/* USER LOGS */}
          <div className="row subInfo">
            {userHistoryDatas?.userHistoryData?.map(
              (user) =>
                user2.id === user.usersubscription?.id && (
                  <UserHistory user={user} key={user.id} />
                )
            )}
          </div>
          <hr />
        </div>
      </>
    );
  });

  return result;
};

export default ListOfUserHistory;
