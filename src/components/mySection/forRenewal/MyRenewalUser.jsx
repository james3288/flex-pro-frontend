import React, { useMemo, useState } from "react";
import RenewalUsers from "./RenewalUsers";
import getForRenewalUsers from "../../../getData/getForRenewalUsers";
import { useQuery } from "@tanstack/react-query";
import formatTime from "../../../others/ReadableFormatTime";
import getTrainerRemainingDays from "../../../getData/getTrainerRemainingDays";
import AddTrainerModal from "../activeUser/AddTrainerModal";
import ExtendSubscriptionModal from "../activeUser/ExtendSubscriptionModal";
import RemoveExtendedSub from "../activeUser/RemoveExtendedSub";

const MyRenewalUser = () => {
  let value = false;
  const queryKey = useMemo(() => ["forRenewalData"], []);
  const [modalTitle, setModalTitle] = useState();
  const [userSubscriptionId, setUserSubscriptionId] = useState(0);
  const [extendedTrainerId, setExtendedTrainerId] = useState(0);
  const [extendedSubId, setExtendedSubId] = useState(0);

  const { isPending, error, data } = useQuery({
    queryKey,
    queryFn: () => getForRenewalUsers(),
    // refetchInterval: 1000,
  });

  if (isPending)
    return (
      <div id="preloder">
        <div className="loader"></div>
      </div>
    );

  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      <div className="container-fluid content-margin c-col-scrollbar">
        <div className="row">
          <div className="form-floating dateTimePicker">
            <h1>
              FOR <span>RENEWAL</span> USERS
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="c-col-wrapper">
            {data?.map(
              (user) =>
                (user.extendedSubDays <= 2 ||
                  (user.extendedTrainerDays <= 2 &&
                    user.extendedTrainerData > 0)) &&
                user.usersubscription.subscription.gym_rate_desc.toUpperCase() !=
                  "DAY PASS" && (
                  <>
                    <RenewalUsers
                      key={user?.id}
                      blobPic={user.image}
                      registeredName={user.usersubscription.flexprouser.name}
                      date_subscribed={user.usersubscription.date_subscribed}
                      subscription={
                        user.usersubscription.subscription.gym_rate_desc
                      }
                      remainingDays={user.remainingDays}
                      per={user.usersubscription.subscription.per.per}
                      user_id={user.usersubscription.flexprouser.id}
                      id={user.id}
                      trainers={user.usersubscription.trainer?.name}
                      subscriptionId={user?.usersubscription.id}
                      trainerRemainingDays={user?.trainerRemainingDays}
                      session_days={user?.usersubscription.session_days}
                      setUserSubscriptionId={setUserSubscriptionId}
                      setModalTitle={setModalTitle}
                      setExtendedTrainerId={setExtendedTrainerId}
                      setExtendedSubId={setExtendedSubId}
                      contactNo={
                        user?.usersubscription.flexprouser.contact_number
                      }
                      trainer_date_started={
                        user.usersubscription.trainer_date_started
                      }
                    />
                  </>
                )
            )}

            <AddTrainerModal
              id={"addTrainerModal"}
              userSubscriptionId={userSubscriptionId}
              modalTitle={modalTitle}
              extendedTrainerId={extendedTrainerId}
            />
            <ExtendSubscriptionModal
              id={"extendSubscriptionModal"}
              userSubscriptionId={userSubscriptionId}
              modalTitle={modalTitle}
            />
            <RemoveExtendedSub
              id={"removeExtendedSubModal"}
              extendedSubId={extendedSubId}
              extendedTrainerId={extendedTrainerId}
              modalTitle={modalTitle}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default MyRenewalUser;
