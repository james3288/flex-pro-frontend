import React, { useEffect, useState } from "react";
import Pic1 from "../../assets/img/team/team-1.jpg";
import Pic2 from "../../assets/img/team/team-2.jpg";
import Pic3 from "../../assets/img/team/team-3.jpg";

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

const MyDashboardSection = () => {
  const [flexProUsers, setFlexProUsers] = useState([]);
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [forRenewalUsers, setForRenewalUsers] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]);
  const [triggerLogout, setTriggerLogout] = useState(false);
  const [counter, setCounter] = useState(0);
  const [noOnlineUser, setNoOnlineUser] = useState(0);
  const [noRenewalUser, setNoRenewalUser] = useState(0);
  const [refresher, setRefresher] = useState(false);
  const [refresher2, setRefresher2] = useState(false);
  const [refresher3, setRefresher3] = useState(false);

  const getImagePath = async (id) => {
    try {
      const response = await instance.get(`/api/get_image_path/${id}`);
      const imagepath = response.data;
      return imagepath;
    } catch (error) {
      console.error("Error fetching image path:", error);
      return null;
    }
  };

  const loadImageData = async (path) => {
    try {
      const response = await instance.get(path, { responseType: "blob" });
      const reader = new FileReader();
      return new Promise((resolve, reject) => {
        reader.onloadend = () => {
          resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(response.data);
      });
    } catch (error) {
      console.error("Error fetching image:", error);
      return null;
    }
  };

  // get extended subscription
  const extendedSub = async (subscriptionId) => {
    try {
      const data = await getExtendedSubscription(subscriptionId);
      return await data;
    } catch (error) {
      console.error("Error in fetching Extended Subscription:", error);
    }
  };

  const getUsersOnline = async () => {
    try {
      const response = await instance.get(`/api/user_online/`);
      const users = response.data;

      const newUser = await Promise.all(
        users.map(async (user) => {
          // Call getImagePath asynchronously for each user
          const imgpath = await getImagePath(
            user.usersubscription.flexprouser.id
          );

          const imageDataUrl = await loadImageData(imgpath.image1);

          // get trainiers remaining days
          const getTrainersRemainingDays = await remainingDays(
            user.usersubscription.date_subscribed,
            "personal_training_day",
            user.usersubscription.subscription.personal_training_session
          );
          //end get trainers remaining days

          // get the remaining days
          const getRemainingDays = await remainingDays(
            user.usersubscription.date_subscribed,
            user.usersubscription.subscription.per.per
          );

          const getExtendedSubscriptionDays = await extendedSub(
            user.usersubscription.id
          );

          // get extended subscription days left and main subscription days
          const extendedSubDays = getSubscriptionDaysLeft(
            getRemainingDays,
            getExtendedSubscriptionDays,
            user.usersubscription.date_subscribed,
            true
          );

          return {
            ...user,
            trainersRemainingDays: getTrainersRemainingDays,
            image: imageDataUrl || "/media/image/default.jpg",
            extendedSubDays: extendedSubDays,
            extendedSubscriptions: getExtendedSubscriptionDays,
          }; // If imgpath is null, use default image
        })
      );

      // console.log(newUser);

      // newUser.filter(user=> ...)
      setFlexProUsers(() => newUser.slice(0, 5));
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const getRegisteredUsers = async () => {
    try {
      const response = await instance.get(`/api/users/`);
      const users = response.data;

      const newUser = await Promise.all(
        users.map(async (user) => {
          // Call getImagePath asynchronously for each user

          const imageDataUrl = await loadImageData(user.image1);

          return {
            ...user,
            image: imageDataUrl || "/media/image/default.jpg",
          }; // If imgpath is null, use default image
        })
      );

      // console.log(newUser);
      setRegisteredUsers(newUser);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const getActiveUsers = async () => {
    try {
      const response = await instance.get(`/api/user_all_status/`);
      const users = response.data;

      const newUser = await Promise.all(
        users.map(async (user) => {
          // Call getImagePath asynchronously for each user
          const imgpath = await getImagePath(
            user.usersubscription.flexprouser.id
          );

          // get the remaining days
          const getRemainingDays = await remainingDays(
            user.usersubscription.date_subscribed,
            user.usersubscription.subscription.per.per
          );
          // end get the reamining days

          // get trainiers remaining days
          const getTrainersRemainingDays = await remainingDays(
            user.usersubscription.date_subscribed,
            "personal_training_day",
            user.usersubscription.subscription.personal_training_session
          );
          //end get trainers remaining days

          const imageDataUrl = await loadImageData(imgpath.image1);

          return {
            ...user,
            trainersRemainingDays: getTrainersRemainingDays,
            image: imageDataUrl || "/media/image/default.jpg",
          }; // If imgpath is null, use default image
        })
      );

      console.log("activeUsers", newUser);
      setActiveUsers(newUser);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // const getForRenewalUsers = async () => {
  //   try {
  //     const response = await instance.get(`/api/user_all_status/`);
  //     const users = response.data;

  //     const newUser = await Promise.all(
  //       users.map(async (user) => {
  //         // Call getImagePath asynchronously for each user
  //         const imgpath = await getImagePath(
  //           user.usersubscription.flexprouser.id
  //         );

  //         const imageDataUrl = await loadImageData(imgpath.image1);

  //         // get the remaining days
  //         const getRemainingDays = await remainingDays(
  //           user.usersubscription.date_subscribed,
  //           user.usersubscription.subscription.per.per
  //         );
  //         // end get the reamining days

  //         // get trainiers remaining days
  //         const getTrainersRemainingDays = await remainingDays(
  //           user.usersubscription.date_subscribed,
  //           "personal_training_day",
  //           user.usersubscription.subscription.personal_training_session
  //         );
  //         //end get trainers remaining days

  //         return {
  //           ...user,
  //           image: imageDataUrl || "/media/image/default.jpg",
  //           remainingDays: formatTime(getRemainingDays, "days-left"),
  //           trainersRemainingDays: getTrainersRemainingDays,
  //         }; // If imgpath is null, use default image
  //       })
  //     );

  //     console.log("forRenewal", newUser);
  //     setNoRenewalUser(
  //       newUser.filter(
  //         (user) =>
  //           user.remainingDays <= 2 ||
  //           // (formatTime(user.trainersRemainingDays, "days-left") <= 2 &&
  //           (getTrainerRemainingDays(
  //             user.trainersRemainingDays,
  //             user.usersubscription.session_days
  //           ) <= 2 &&
  //             user.usersubscription.trainer != null)
  //       ).length
  //     );
  //     setForRenewalUsers(newUser);
  //   } catch (error) {
  //     console.error("Error fetching users:", error);
  //   }
  // };

  const getNoOnlineUser = async () => {
    try {
      const response = await instance.get(`/api/no_user_online/`);
      const users = response.data;
      setNoOnlineUser(users.length);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // for online users
  useEffect(() => {
    getUsersOnline();
  }, [triggerLogout]);

  useEffect(() => {
    getNoOnlineUser();
  }, []);

  // for registered users
  useEffect(() => {
    getRegisteredUsers();
  }, []);

  useEffect(() => {
    getActiveUsers();
    // setActiveUsers(async () => await getActiveUsers());
  }, []);

  // for renewal users
  // useEffect(() => {
  //   getForRenewalUsers();
  // }, []);

  // refresher
  useEffect(() => {
    // setForRenewalUsers(()=> getForRenewalUsers())
    const getRenewalUsers = async () => {
      let users = await getForRenewalUsers();
      let noOfRenewalUsers = users.filter(
        (user) => user.extendedSubDays <= 2 || user.extendedTrainerDays <= 2
      ).length;
      setNoRenewalUser(noOfRenewalUsers);
      setForRenewalUsers(users);
    };

    getRenewalUsers();

    setRefresher(false);
  }, [refresher]);

  // refresher2
  useEffect(() => {
    getUsersOnline();
    console.log("refresher2");
    setRefresher(false);
  }, [refresher2]);

  // refresher3
  useEffect(() => {
    getActiveUsers();
    // setActiveUsers(async () => await getActiveUsers());

    console.log("refresher3");
    setRefresher(false);
  }, [refresher3]);
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
                {activeUsers?.length}{" "}
                <strong> {activeUsers?.length > 1 ? "USERS" : "USER"}</strong>
              </h1>
              <div className="scrollable-list-of-user">
                {activeUsers?.map((user) => (
                  <RegisteredUser
                    key={user.id}
                    pix={Pic3}
                    user_id={user.usersubscription.flexprouser.id}
                    blobPix={user.image}
                    registeredName={user.usersubscription.flexprouser.name}
                    weights={22}
                    subscription={
                      user.usersubscription.subscription.gym_rate_desc
                    }
                    date_subscribed={user.usersubscription.date_subscribed}
                    per={user.usersubscription.subscription.per.per}
                    setRefresher={setRefresher3}
                    trainers={user.usersubscription.trainer?.name}
                    trainersRemainingDays={user.trainersRemainingDays}
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
                <strong> {noOnlineUser}</strong>{" "}
                {noOnlineUser > 1 ? "USERS" : "USER"}
              </h1>

              <div className="scrollable-list-of-user">
                {flexProUsers.map((user) => (
                  // Get the time portion

                  <ClientsOnline
                    key={user.id}
                    clientName={user.usersubscription.flexprouser.name}
                    // clientName={"KJ"}
                    user_online_id={user.id}
                    timeIn={user.time_in}
                    timeOut={user.time_out}
                    status="true"
                    pix={Pic3}
                    blobPix={user.image}
                    timeAgo={user.time_in}
                    weights={
                      user.usersubscription.flexprouser.weights
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
                  />
                ))}
              </div>
            </div>
            {/* <NavLink className="btn btn-danger">           </Navlink> */}
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
                {noRenewalUser}
                <strong> {noRenewalUser > 1 ? "USERS" : "USER"}</strong>
              </h1>
              <div className="scrollable-list-of-user">
                {forRenewalUsers.map(
                  (user) =>
                    (user.extendedSubDays <= 2 ||
                      user.extendedTrainerDays <= 2) && (
                      <ForRenewal
                        key={user.id}
                        pix={user.image}
                        user_id={user.usersubscription.flexprouser.id}
                        id={user.id}
                        registeredName={user.usersubscription.flexprouser.name}
                        remaining={"0"}
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
                      />
                    )
                )}
              </div>
              {/* <Trainers
                pix={Pic3}
                blobPix={Pic3}
                registeredName={"John Mayer"}
                weights={"60"}
              /> */}
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
