import { useQuery } from "@tanstack/react-query";
import React, { useMemo, useState } from "react";
import getActiveUser from "../../../getData/getActiveUsers";
import formatTime from "../../../others/ReadableFormatTime";
import RenewalUsers from "../forRenewal/RenewalUsers";
import AddTrainerModal from "./AddTrainerModal";
import ExtendSubscriptionModal from "./ExtendSubscriptionModal";

const MyActiveUser = () => {
  const [userSubscriptionId, setUserSubscriptionId] = useState(0);
  const [modalTitle, setModalTitle] = useState();

  const queryKey = useMemo(() => ["forActiveUser"], []);

  const { isPending, error, data } = useQuery({
    queryKey,
    queryFn: () => getActiveUser(),
    // refetchInterval: 1000,
  });

  if (isPending)
    return (
      <div id="preloder">
        <div className="loader"></div>
      </div>
    );

  if (error) return "An error has occurred: " + error.message;

  console.log("activeUser", data);

  return (
    <>
      <div className="container-fluid content-margin c-col-scrollbar">
        <div className="row">
          <div className="form-floating title">
            <h1>
              FOR <span>ACTIVE</span> USERS
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="c-col-wrapper">
            {data.map((user) => (
              // user.remainingDays <= 2 ||

              <RenewalUsers
                key={user.id}
                blobPic={user.image}
                registeredName={user.usersubscription.flexprouser.name}
                date_subscribed={user.usersubscription.date_subscribed}
                subscription={user.usersubscription.subscription.gym_rate_desc}
                remainingDays={user.remainingDays}
                per={user.usersubscription.subscription.per.per}
                user_id={user.usersubscription.flexprouser.id}
                id={user.id}
                trainers={user.usersubscription.trainer?.name}
                trainerRemainingDays={user?.trainersRemainingDays}
                subscriptionId={user?.usersubscription.id}
                setUserSubscriptionId={setUserSubscriptionId}
                session_days={user.usersubscription.session_days}
                setModalTitle={setModalTitle}
              />
            ))}

            <AddTrainerModal
              id={"addTrainerModal"}
              userSubscriptionId={userSubscriptionId}
              modalTitle={modalTitle}
            />
            <ExtendSubscriptionModal
              id={"extendSubscriptionModal"}
              userSubscriptionId={userSubscriptionId}
              modalTitle={modalTitle}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default MyActiveUser;
