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

const MyDashboardSection = () => {
  const [flexProUsers, setFlexProUsers] = useState([]);
  const [triggerLogout, setTriggerLogout] = useState(false);
  let getUsers = async () => {
    // let response = await fetch("http://127.0.0.1:8000/api/users/");
    // let data = await response.json();
    // setFlexProUsers(data);
    // console.log(data);

    axios.get(`http://127.0.0.1:8000/api/user_online/`).then((res) => {
      const users = res.data;
      setFlexProUsers(users);
    });
  };

  useEffect(() => {
    getUsers();
  }, [triggerLogout]);

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
              {flexProUsers.map((user) => (
                <RegisteredUser
                  key={user.id}
                  pix={Pic2}
                  registeredName={user.name}
                  weights={user.weights}
                  age={32}
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
                3/<strong>60</strong> USERS
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
