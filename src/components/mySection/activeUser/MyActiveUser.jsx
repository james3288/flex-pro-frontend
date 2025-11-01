import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import RenewalUsers from "../forRenewal/RenewalUsers";
import AddTrainerModal from "./AddTrainerModal";
import ExtendSubscriptionModal from "./ExtendSubscriptionModal";
import RemoveExtendedSub from "./RemoveExtendedSub";
import DayPassUser from "../dayPassUser/DayPassUser";
import DayPassAddTrainerModal from "../../modals/DayPassAddTrainerModal";
import RemoveModal from "../../modals/RemoveModal";
import "./myActiveUser.scss";
import useGetActiveUsers from "../../../hooks/useGetActiveUsers";
import useGetDayPassUsers from "../../../hooks/useGetDayPassUsers";
import LoadingEffect from "../loadingEffect/LoadingEffect";
import NoDataFound from "../noDataFound/NoDataFound"; // assuming this exists

// ---------------- Subcomponents ----------------
const ActiveUsersComponent = ({
  users,
  fetchStatus,
  setUserSubscriptionId,
  setModalTitle,
  setExtendedSubId,
  setExtendedTrainerId,
}) => {
  // if (fetchStatus === "fetching") return <LoadingEffect />;

  return users?.map((user) => {
    const {
      remainingDays,
      image,
      id,
      usersubscription: userSubData,
      trainersRemainingDays,
    } = user;

    return (
      <RenewalUsers
        key={id}
        blobPic={image}
        registeredName={userSubData.flexprouser?.name}
        date_subscribed={userSubData.date_subscribed}
        subscription={userSubData.subscription.gym_rate_desc}
        remainingDays={remainingDays}
        per={userSubData.subscription.per.per}
        user_id={userSubData.flexprouser?.id}
        id={id}
        trainers={userSubData.trainer?.name}
        trainerRemainingDays={trainersRemainingDays}
        subscriptionId={userSubData.id}
        setUserSubscriptionId={setUserSubscriptionId}
        session_days={userSubData.session_days}
        setModalTitle={setModalTitle}
        setExtendedSubId={setExtendedSubId}
        setExtendedTrainerId={setExtendedTrainerId}
        contactNo={userSubData.flexprouser?.contact_number}
        trainer_date_started={userSubData.trainer_date_started}
        packages_details={userSubData.subscription.packages_details}
        sub_session_days={userSubData.sub_session_days}
      />
    );
  });
};

const ActiveDayPassUsersComponent = ({
  users,
  fetchStatus,
  setUserSubscriptionId,
  setModalTitle,
}) => {
  // if (fetchStatus === "fetching") return <LoadingEffect />;

  return users?.map((user) => (
    <DayPassUser
      key={user.id}
      user={user}
      setUserSubscriptionId={setUserSubscriptionId}
      setModalTitle={setModalTitle}
    />
  ));
};

// ---------------- Main Component ----------------
const MyActiveUser = () => {
  const [userSubscriptionId, setUserSubscriptionId] = useState(0);
  const [extendedSubId, setExtendedSubId] = useState(0);
  const [extendedTrainerId, setExtendedTrainerId] = useState(0);
  const [modalTitle, setModalTitle] = useState();

  const { getActiveUsers } = useGetActiveUsers();
  const { getDayPassUserActive } = useGetDayPassUsers();

  const { isPending, error, data, fetchStatus } = useQuery({
    queryKey: ["forActiveUser", "forDayPassUser"],
    queryFn: async () => {
      const activeUser = await getActiveUsers();
      const dayPassUser = await getDayPassUserActive();
      return { data1: activeUser, data2: dayPassUser };
    },
  });

  if (isPending)
    return (
      <div id="preloder">
        <div className="loader"></div>
      </div>
    );

  if (error) return <NoDataFound caption="No Data has been found..." />;

  const countDayPassActive = data.data2?.filter(
    (user) => user.remainingHours !== "Expired"
  );

  return (
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
          <ActiveDayPassUsersComponent
            users={data?.data2}
            fetchStatus={fetchStatus}
            setUserSubscriptionId={setUserSubscriptionId}
            setModalTitle={setModalTitle}
          />

          <ActiveUsersComponent
            users={data?.data1}
            fetchStatus={fetchStatus}
            setUserSubscriptionId={setUserSubscriptionId}
            setModalTitle={setModalTitle}
            setExtendedSubId={setExtendedSubId}
            setExtendedTrainerId={setExtendedTrainerId}
          />

          {/* Modals */}
          <DayPassAddTrainerModal />
          <AddTrainerModal
            id="addTrainerModal"
            userSubscriptionId={userSubscriptionId}
            modalTitle={modalTitle}
            extendedTrainerId={extendedTrainerId}
          />
          <ExtendSubscriptionModal
            id="extendSubscriptionModal"
            userSubscriptionId={userSubscriptionId}
            modalTitle={modalTitle}
          />
          <RemoveExtendedSub
            id="removeExtendedSubModal"
            extendedSubId={extendedSubId}
            extendedTrainerId={extendedTrainerId}
            modalTitle={modalTitle}
          />
          <RemoveModal />
        </div>
      </div>
    </div>
  );
};

export default MyActiveUser;
