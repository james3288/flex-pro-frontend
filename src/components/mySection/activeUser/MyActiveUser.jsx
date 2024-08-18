import { useQuery } from "@tanstack/react-query";
import React, { useMemo, useState } from "react";
import getActiveUser from "../../../getData/getActiveUsers";
import formatTime from "../../../others/ReadableFormatTime";
import RenewalUsers from "../forRenewal/RenewalUsers";
import AddTrainerModal from "./AddTrainerModal";
import ExtendSubscriptionModal from "./ExtendSubscriptionModal";
import RemoveExtendedSub from "./RemoveExtendedSub";
import getDaypassUser from "../../../getData/getDayPassUser";
import DayPassUser from "../dayPassUser/DayPassUser";
import DayPassAddTrainerModal from "../../modals/DayPassAddTrainerModal";
import RemoveModal from "../../modals/RemoveModal";
import getDayPassUserOnline from "../../../getData/getDayPassUserOnline";

const MyActiveUser = () => {
  const [userSubscriptionId, setUserSubscriptionId] = useState(0);
  const [extendedSubId, setExtendedSubId] = useState(0);
  const [extendedTrainerId, setExtendedTrainerId] = useState(0);
  const [modalTitle, setModalTitle] = useState();

  const queryKey = ["forActiveUser", "forDayPassUser"];
  const { isPending, error, data, fetchStatus } = useQuery({
    queryKey,
    queryFn: async () => {
      const activeUser = await getActiveUser();
      const dayPassUser = await getDaypassUser();

      return {
        data1: activeUser,
        data2: dayPassUser,
      };
    },
    refetchInterval: 1000,
  });

  if (isPending)
    return (
      <div id="preloder">
        <div className="loader"></div>
      </div>
    );

  if (error) return <NoDataFound caption="No Data has been found..." />;

  const countDayPassActive = data.data2?.filter(
    (user) => user.remainingHours != "Expired"
  );

  // const queryKey = ["forActiveUser"];
  // const queryKey2 = ["forDayPassUser"];

  // const {
  //   isLoading: isPending1,
  //   error: error1,
  //   data: data1,
  // } = useQuery({
  //   queryKey: queryKey,
  //   queryFn: getActiveUser,
  //   // refetchInterval: 1000, // Uncomment if needed
  // });

  // const {
  //   isLoading: isPending2,
  //   error: error2,
  //   data: data2,
  // } = useQuery({
  //   queryKey: queryKey2,
  //   queryFn: getDaypassUser,
  //   // refetchInterval: 1000, // Uncomment if needed
  // });

  // if (isPending1 || isPending2) {
  //   return (
  //     <div id="preloder">
  //       <div className="loader"></div>
  //     </div>
  //   );
  // }

  // if (error1 || error2) {
  //   return <div>Error: {error1?.message || error2?.message}</div>;
  // }

  return (
    <>
      <div className="container-fluid content-margin c-col-scrollbar">
        <div className="row">
          <div className="form-floating title">
            <h1>
              {data?.data1?.length + countDayPassActive?.length}{" "}
              <span>ACTIVE</span> USERS
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="c-col-wrapper">
            {data?.data2?.map((user) => (
              <DayPassUser
                key={user.id}
                user={user}
                setUserSubscriptionId={setUserSubscriptionId}
                setModalTitle={setModalTitle}
              />
            ))}

            {data?.data1?.map((user) => (
              // user.remainingDays <= 2 ||
              <RenewalUsers
                key={user.id}
                blobPic={user.image}
                registeredName={user.usersubscription.flexprouser?.name}
                date_subscribed={user.usersubscription.date_subscribed}
                subscription={user.usersubscription.subscription.gym_rate_desc}
                remainingDays={user.remainingDays}
                per={user.usersubscription.subscription.per.per}
                user_id={user.usersubscription.flexprouser?.id}
                id={user.id}
                trainers={user.usersubscription.trainer?.name}
                trainerRemainingDays={user?.trainersRemainingDays}
                subscriptionId={user?.usersubscription.id}
                setUserSubscriptionId={setUserSubscriptionId}
                session_days={user.usersubscription.session_days}
                setModalTitle={setModalTitle}
                setExtendedSubId={setExtendedSubId}
                setExtendedTrainerId={setExtendedTrainerId}
                contactNo={user.usersubscription.flexprouser?.contact_number}
                trainer_date_started={
                  user.usersubscription.trainer_date_started
                }
                packages_details={
                  user.usersubscription.subscription.packages_details
                }
                sub_session_days={user?.usersubscription.sub_session_days}
              />
            ))}

            <DayPassAddTrainerModal />

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

            <RemoveModal />
          </div>
        </div>
      </div>
    </>
  );
};

export default MyActiveUser;
