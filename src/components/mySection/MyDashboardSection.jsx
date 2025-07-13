import React, { useEffect, useState } from "react";
import Pic1 from "../../assets/img/team/team-1.jpg";
import Pic2 from "../../assets/img/team/team-2.jpg";
import Pic3 from "../../assets/img/team/team-3.jpg";
import Pic from "../../assets/img/dummy.png";

import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

import "./mySection.scss";
import ClientsOnline from "./clientsOnline/ClientsOnline";
import RegisteredUser from "./registeredUser/RegisteredUser";
import Trainers from "./trainers/Trainers";
import axios from "axios";
import instance from "../../others/axiosInstance";
import ForRenewal from "./forRenewal/ForRenewal";
import remainingDays from "../../others/GetRemainingDays";
import formatTime from "../../others/ReadableFormatTime";
import { NavLink } from "react-router-dom";
import getTrainerRemainingDays from "../../getData/getTrainerRemainingDays";
import getForRenewalUsers from "../../getData/getForRenewalUsers";
import getSubscriptionDaysLeft from "../../getData/getSubscriptionDaysLeft";
import getExtendedSubscription from "../../getData/getExtendedSubscription";
import LoadingEffect from "./loadingEffect/LoadingEffect";
import getNoActiveUsers from "../../getData/getNoActiveUsers";
import getNoOnlineUsers from "../../getData/getNoOnlineUsers";
import getDaypassUser from "../../getData/getDayPassUser";
import getDayPassUserOnline2 from "../../getData/getDayPassUserOnline2";
import getDayPassUserOnline3 from "../../getData/getDayPassUserOnline3";
import FormatDateOnly from "../../others/FormatDateOnly";
import DayPassClientsOnline from "./clientsOnline/DayPassClientsOnline";
import getImagePath from "../../getData/getImagePath";
import useGetUserOnline from "../../hooks/useGetUserOnline";
import { useQuery } from "@tanstack/react-query";
import loadImageData from "../../getData/loadImageData";
import useGetActiveUsers from "../../hooks/useGetActiveUsers";

const MyDashboardSection = () => {
  const [forRenewalUsers, setForRenewalUsers] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]);
  const [triggerLogout, setTriggerLogout] = useState(false);
  const [noOnlineUser, setNoOnlineUser] = useState(0);
  const [noRenewalUser, setNoRenewalUser] = useState(0);
  const [refresher, setRefresher] = useState(false);
  const [refresher2, setRefresher2] = useState(false);
  const [refresher3, setRefresher3] = useState(false);

  const { getUsersOnline } = useGetUserOnline();
  const { getActiveUsers } = useGetActiveUsers();

  const queryKey = ["forDashboardDataFetching"];

  const { isPending, error, data, fetchStatus } = useQuery({
    queryKey,
    queryFn: async () => {
      const [
        onlineUser,
        noOfOnline,
        dayPassOnline,
        noOfActiveUsers,
        _activeUsers,
        renewalUsers,
      ] = await Promise.all([
        getUsersOnline(),
        getNoOnlineUsers(),
        getDayPassUserOnline3(),
        getNoActiveUsers(),
        getActiveUsers(),
        getForRenewalUsers(),
      ]);

      return {
        onlineUser,
        noOfOnline,
        dayPassOnline,
        noOfActiveUsers,
        _activeUsers,
        renewalUsers,
      };
    },
    // refetchInterval: 1000,
  });

  // refresher
  useEffect(() => {
    // setForRenewalUsers(()=> getForRenewalUsers())
    const getRenewalUsers = async () => {
      let users = await getForRenewalUsers();
      let noOfRenewalUsers = users.filter(
        (user) =>
          (user.extendedSubDays <= 2 ||
            (user.extendedTrainerDays <= 2 && user.extendedTrainerData > 0)) &&
          user.usersubscription.subscription.gym_rate_desc.toUpperCase() !=
            "DAY PASS"
      );

      setNoRenewalUser(noOfRenewalUsers.length);
      setForRenewalUsers(() => users);
    };

    getRenewalUsers();

    setRefresher(false);
  }, [refresher]);

  const RenewalUsersLessThanOrEqualToTwoDays = () => {
    return data?.renewalUsers?.filter(
      (user) =>
        (user.extendedSubDays <= 2 ||
          (user.extendedTrainerDays <= 2 && user.extendedTrainerData > 0)) &&
        user.usersubscription.subscription.gym_rate_desc.toUpperCase() !=
          "DAY PASS"
    );
  };

  const NoOfOnlineUsersComponent = () => {
    const noOfUsersOnWorkOut = data?.noOfOnline + data?.dayPassOnline?.length;
    return (
      <>
        <strong>
          {fetchStatus === "fetching" ? <LoadingEffect /> : noOfUsersOnWorkOut}{" "}
        </strong>
        {noOfUsersOnWorkOut > 1 ? "USERS" : "USER"}
      </>
    );
  };

  const NoOfActiveUsersComponent = () => {
    const noOfActiveUsers = data?.noOfActiveUsers;
    return (
      <>
        <strong>
          {fetchStatus === "fetching" ? <LoadingEffect /> : noOfActiveUsers}{" "}
        </strong>
        {noOfActiveUsers > 1 ? "USERS" : "USER"}
      </>
    );
  };

  const NoOfRenewalUsersComponent = () => {
    const noOfRenewalUsers = RenewalUsersLessThanOrEqualToTwoDays()?.length;
    return (
      <>
        <strong>
          {fetchStatus === "fetching" ? <LoadingEffect /> : noOfRenewalUsers}{" "}
        </strong>
        {noOfRenewalUsers > 1 ? "USERS" : "USER"}
      </>
    );
  };

  return (
    <>
      {/* <!-- Dashboard container--> */}

      <div className="container-fluid content-margin">
        <div className="row">
          {/* REGISTERED USER */}
          <div className="col-lg-3 col-xs-12">
            <div className="dashboard-col">
              <span>ACTIVE USER</span>
              <h1>
                <NoOfActiveUsersComponent />
              </h1>

              <div className="scrollable-list-of-user">
                {data?._activeUsers?.slice(0, 5).map((user) => (
                  <RegisteredUser
                    key={user.id}
                    pix={Pic3}
                    user_id={user.usersubscription.flexprouser?.id}
                    blobPix={user.image}
                    registeredName={user.usersubscription.flexprouser?.name}
                    weights={22}
                    subscription={
                      user.usersubscription.subscription.gym_rate_desc
                    }
                    date_subscribed={user.usersubscription.date_subscribed}
                    per={user.usersubscription.subscription.per.per}
                    setRefresher={setRefresher3}
                    trainers={user.usersubscription.trainer?.name}
                    trainersRemainingDays={user.trainersRemainingDays}
                    sub_session_days={user.usersubscription.sub_session_days}
                  />
                ))}
              </div>
            </div>
            <NavLink className="btn btn-danger" to="/active-users">
              View More
            </NavLink>
          </div>
          {/* END REGISTERED USER */}

          {/* CLIENTS ON WORKOUT */}
          <div className="col-lg-6 col-xs-12">
            <div className="dashboard-col">
              <span>CLIENTS ON WORKOUT</span>
              <h1>
                <NoOfOnlineUsersComponent />
              </h1>

              <div className="scrollable-list-of-user">
                {data?.dayPassOnline?.slice(0, 2)?.map((user, index) => (
                  <DayPassClientsOnline user={user} key={index} />
                ))}

                {/* {data?.onlineUser.length > 0 ? "" : <LoadingEffect />} */}
                {data?.onlineUser?.slice(0, 3)?.map((user) => (
                  // Get the time portion

                  <ClientsOnline
                    key={user.id}
                    clientName={user.usersubscription.flexprouser?.name}
                    // clientName={"KJ"}
                    user_online_id={user.id}
                    timeIn={user.time_in}
                    timeOut={user.time_out}
                    status="true"
                    pix={Pic3}
                    blobPix={user.image}
                    timeAgo={user.time_in}
                    weights={
                      user.usersubscription.flexprouser?.weights
                      // 22
                    }
                    gym_rate_desc={
                      user.usersubscription.subscription.gym_rate_desc
                    }
                    rate={user.usersubscription.subscription.rate}
                    per={user.usersubscription.subscription.per.per}
                    date_log={user.usersubscription.date_subscribed}
                    setTriggerLogout={setTriggerLogout}
                    setNoOnlineUser={setNoOnlineUser}
                    setRefresher2={setRefresher2}
                    trainers={user.usersubscription.trainer?.name}
                    trainersRemainingDays={user.trainersRemainingDays}
                    extendedSubDays={user?.extendedSubDays}
                    extendedSubscriptions={user?.extendedSubscriptions}
                    sub_session_days={user?.usersubscription.sub_session_days}
                    subscriptionId={user?.usersubscription.id}
                  />
                ))}
              </div>
            </div>
            <NavLink className="btn btn-danger" to="/clients-on-workout">
              View More
            </NavLink>
          </div>
          {/* END CLIENTS ON WORKOUT */}

          {/* RENEWAL  */}
          <div className="col-lg-3 col-xs-12">
            <div className="dashboard-col">
              <span>FOR RENEWAL</span>

              <h1>
                <NoOfRenewalUsersComponent />
              </h1>

              <div className="scrollable-list-of-user">
                {RenewalUsersLessThanOrEqualToTwoDays()
                  ?.slice(0, 5)
                  ?.map(
                    (user) =>
                      (user.extendedSubDays <= 2 ||
                        (user.extendedTrainerDays <= 2 &&
                          user.extendedTrainerData > 0)) &&
                      user.usersubscription.subscription.gym_rate_desc.toUpperCase() !=
                        "DAY PASS" && (
                        <ForRenewal
                          key={user.id}
                          pix={user.image}
                          user_id={user.usersubscription.flexprouser?.id}
                          id={user.id}
                          registeredName={
                            user.usersubscription.flexprouser?.name
                          }
                          subscription={
                            user.usersubscription.subscription.gym_rate_desc
                          }
                          date_log={user.usersubscription.date_subscribed}
                          per={user.usersubscription.subscription.per.per}
                          setRefresher={setRefresher}
                          setNoRenewalUser={setNoRenewalUser}
                          trainersRemainingDays={user.trainersRemainingDays}
                          trainers={user.usersubscription.trainer?.name}
                          extendedSubDays={user.extendedSubDays}
                          extendedTrainerDays={user.extendedTrainerDays}
                          contactNo={
                            user.usersubscription.flexprouser?.contact_number
                          }
                          sub_session_days={
                            user.usersubscription.sub_session_days
                          }
                          subscriptionId={user?.usersubscription?.id}
                        />
                      )
                  )}
              </div>
            </div>
            <NavLink className="btn btn-danger" to="/for-renewal-users">
              View More
            </NavLink>
          </div>
          {/* END RENEWAL */}
        </div>
      </div>

      {/* <!-- Dashboard container End --> */}
    </>
  );
};

export default MyDashboardSection;
