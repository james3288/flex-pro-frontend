import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import RenewalUsers from "../forRenewal/RenewalUsers";
// import "./myActiveUser.scss";
import useGetActiveUsers from "../../../hooks/useGetActiveUsers";
import LoadingEffect from "../loadingEffect/LoadingEffect";
import useGetExpiredUsers from "../../../hooks/useGetExpiredUsers";
import NoDataFound from "../noDataFound/NoDataFound";

const MyExpiredUser = () => {
  const [userSubscriptionId, setUserSubscriptionId] = useState(0);
  const [extendedSubId, setExtendedSubId] = useState(0);
  const [extendedTrainerId, setExtendedTrainerId] = useState(0);
  const [modalTitle, setModalTitle] = useState();

  const { getExpiredUsers } = useGetExpiredUsers();

  const queryKey = ["forExpiredUser"];
  const { isPending, error, data, fetchStatus } = useQuery({
    queryKey,
    queryFn: async () => {
      const expiredUser = await getExpiredUsers(); //getActiveUser();
      return {
        data1: expiredUser,
      };
    },
    // refetchInterval: 1000,
    refetchOnWindowFocus: false, // ✅ Don't refetch when window is focused
    refetchOnMount: false, // ✅ Don't refetch when component mounts
    refetchOnReconnect: false, // ✅ Don't refetch on network reconnect
    staleTime: 1000 * 60 * 5,
  });

  if (isPending)
    return (
      <div id="preloder">
        <div className="loader"></div>
      </div>
    );

  if (error) return <NoDataFound caption="No Data has been found..." />;

  const ExpiredUserComponent = () => {
    const context = data?.data1
      ?.slice(0, 10)
      ?.map((user) => (
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
          trainer_date_started={user.usersubscription.trainer_date_started}
          packages_details={user.usersubscription.subscription.packages_details}
          sub_session_days={user?.usersubscription.sub_session_days}
          isExpired={true}
        />
      ));

    return fetchStatus === "fetching" ? <LoadingEffect /> : context;
  };

  return (
    <>
      <div className="container-fluid content-margin c-col-scrollbar">
        <div className="row">
          <div className="form-floating title">
            <h1>
              {data?.data1?.length} <span>EXPIRED</span> USERS
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="c-col-wrapper">
            <ExpiredUserComponent />
          </div>
        </div>
      </div>
    </>
  );
};

export default MyExpiredUser;
