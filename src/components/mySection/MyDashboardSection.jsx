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

const MyDashboardSection = () => {
  const [flexProUsers, setFlexProUsers] = useState([]);
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [forRenewalUsers, setForRenewalUsers] = useState([]);
  const [triggerLogout, setTriggerLogout] = useState(false);
  const [counter, setCounter] = useState(0);
  const [noOnlineUser, setNoOnlineUser] = useState(0);

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

          return {
            ...user,
            image: imageDataUrl || "/media/image/default.jpg",
          }; // If imgpath is null, use default image
        })
      );

      // console.log(newUser);
      setFlexProUsers(newUser);
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

  const getForRenewalUsers = async () => {
    try {
      const response = await instance.get(`/api/user_all_status/`);
      const users = response.data;

      const newUser = await Promise.all(
        users.map(async (user) => {
          // Call getImagePath asynchronously for each user
          const imgpath = await getImagePath(
            user.usersubscription.flexprouser.id
          );

          const imageDataUrl = await loadImageData(imgpath.image1);

          return {
            ...user,
            image: imageDataUrl || "/media/image/default.jpg",
          }; // If imgpath is null, use default image
        })
      );

      console.log("forRenewal", newUser);
      setForRenewalUsers(newUser);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

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

  // for renewal users
  useEffect(() => {
    getForRenewalUsers();
  }, []);

  return (
    <>
      {/* <!-- Dashboard container--> */}

      <div className="container-fluid content-margin">
        <div className="row">
          {/* REGISTERED USER */}
          <div className="col-lg-3 col-xs-12">
            <div className="dashboard-col">
              <span>REGISTERED USER</span>
              <h1>
                150/<strong>USERS</strong>
              </h1>
              {registeredUsers.map((user) => (
                <RegisteredUser
                  key={user.id}
                  pix={Pic3}
                  user_id={user.id}
                  blobPix={user.image}
                  registeredName={user.flex_pro_user.name}
                  weights={user.flex_pro_user.weights}
                />
              ))}
            </div>
            <a href="" className="btn btn-danger">
              View More
            </a>
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
                />
              ))}
              {/* <ClientsOnline
                clientName="Kelvin Dalauta"
                timeIn="3:00 PM"
                timeOut="8:00 PM"
                status="false"
                pix={Pic2}
                date={"5 Hours"}
              />
              <ClientsOnline
                clientName="Mc Johnson Manolo"
                timeIn="3:00 PM"
                timeOut="--:--"
                status="true"
                pix={Pic1}
                date={"25 min ago"}
              />
              <ClientsOnline
                clientName="Jophet Budlat"
                timeIn="12:00 PM"
                timeOut="5:00 PM"
                status="false"
                pix={Pic2}
                date={"2 hours ago"}
              /> */}
            </div>
            <a href="" className="btn btn-danger">
              View More
            </a>
          </div>
          {/* END CLIENTS ON WORKOUT */}

          {/* RENEWAL  */}
          <div className="col-lg-3 col-xs-12">
            <div className="dashboard-col">
              <span>FOR RENEWAL</span>
              <h1>
                20/<strong>USERS</strong>
              </h1>
              {forRenewalUsers.map((user) => (
                <ForRenewal
                  key={user.id}
                  pix={user.image}
                  user_id={user.usersubscription.flexprouser.id}
                  registeredName={user.usersubscription.flexprouser.name}
                  remaining={"0"}
                  subscription={
                    user.usersubscription.subscription.gym_rate_desc
                  }
                  date_log={user.usersubscription.date_subscribed}
                  per={user.usersubscription.subscription.per.per}
                />
              ))}

              {/* <Trainers
                pix={Pic3}
                blobPix={Pic3}
                registeredName={"John Mayer"}
                weights={"60"}
              /> */}
            </div>
            <a href="" className="btn btn-danger">
              View More
            </a>
          </div>
          {/* END RENEWAL */}
        </div>
      </div>

      {/* <!-- Dashboard container End --> */}
    </>
  );
};

export default MyDashboardSection;
