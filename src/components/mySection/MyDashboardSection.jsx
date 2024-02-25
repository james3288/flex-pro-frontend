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

const MyDashboardSection = () => {
  const [flexProUsers, setFlexProUsers] = useState([]);
  const [registeredUsers, setRegisteredUsers] = useState([]);
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

  let getUsersOnline = async () => {
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

  let getRegisteredUsers = async () => {
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

  let getNoOnlineUser = async () => {
    try {
      const response = await instance.get(`/api/no_user_online/`);
      const users = response.data;
      setNoOnlineUser(users.length);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    getUsersOnline();
  }, [triggerLogout]);

  useEffect(() => {
    getNoOnlineUser();
  }, []);

  useEffect(() => {
    getRegisteredUsers();
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
                <Trainers
                  key={user.id}
                  pix={Pic3}
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
                <strong> {noOnlineUser}</strong> USERS
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

          {/* TRAINERS AVAILABLE */}
          <div className="col-lg-3 col-xs-12">
            <div className="dashboard-col">
              <span>TRAINERS AVAILABLE</span>
              <h1>
                20/<strong>TRAINERS</strong>
              </h1>

              <Trainers
                pix={Pic3}
                registeredName={"King James Uayan"}
                position="Lorem ipsum dolor sit amet"
              />
              <Trainers
                pix={Pic3}
                registeredName={"Carlo Agacy"}
                position="Lorem ipsum dolor sit amet"
              />
              <Trainers
                pix={Pic3}
                registeredName={"John Loyd"}
                position="Lorem ipsum dolor sit amet"
              />
              <Trainers
                pix={Pic3}
                registeredName={"Daniel Padilla"}
                position="Lorem ipsum dolor sit amet"
              />
            </div>
            <a href="" className="btn btn-danger">
              View More
            </a>
          </div>
          {/* END TRAINERS AVAILABLE */}
        </div>
      </div>

      {/* <!-- Dashboard container End --> */}
    </>
  );
};

export default MyDashboardSection;
