import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import getActiveUser from "../../../getData/getActiveUsers";
import RenewalUsers from "../forRenewal/RenewalUsers";
import AddTrainerModal from "./AddTrainerModal";
import ExtendSubscriptionModal from "./ExtendSubscriptionModal";
import RemoveExtendedSub from "./RemoveExtendedSub";
import getDaypassUser from "../../../getData/getDayPassUser";
import DayPassUser from "../dayPassUser/DayPassUser";
import DayPassAddTrainerModal from "../../modals/DayPassAddTrainerModal";
import RemoveModal from "../../modals/RemoveModal";
import "./myActiveUser.scss";
import SearchIconSvg from "../../svg/SearchIconSvg";
import useDebounce from "../../../hooks/useDebounce";
import useRemainingDaysLeft from "../../../hooks/useRemainingDaysLeft";

const MyActiveUser = () => {
  const [userSubscriptionId, setUserSubscriptionId] = useState(0);
  const [extendedSubId, setExtendedSubId] = useState(0);
  const [extendedTrainerId, setExtendedTrainerId] = useState(0);
  const [modalTitle, setModalTitle] = useState();

  const [search, setSearch] = useState("");

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
    // refetchInterval: 1000,
  });

  const handleOnChange = (e) => {
    setSearch(e.target.value);
  };

  // const debounceValue = useDebounce(search);

  // const onlineUsers = data?.data1.filter((user) =>
  //   user.usersubscription.flexprouser.name
  //     .toLowerCase()
  //     .includes(debounceValue.toLowerCase())
  // );

  // console.log(onlineUsers);

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

  // const ex = data?.data1?.filter((x) => x.remainingDaysStatus != "Expired");

  // console.log(ex);

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
        {/* <div className="row">
          <div className="searchbox">
            <input
              type="text"
              placeholder="search here..."
              onChange={handleOnChange}
            />
            <SearchIconSvg />
          </div>
        </div> */}
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
