import React, { useEffect, useState, useRef } from "react";
import ListOfSubscriptions from "./Subscriptions/ListOfSubscriptions";
import { NavLink, useLocation } from "react-router-dom";
import instance from "../../others/axiosInstance";

const MySubscribedNow = () => {
  const [planNow, setPlanNow] = useState([]);
  const location = useLocation();
  const [searchField, setSearchField] = useState("");
  const [trainerField, setTrainerField] = useState("");
  const [flexProUsers, setFlexProUsers] = useState([]);
  const [flexProTrainers, setFlexProTrainers] = useState([]);
  const [searchOutput, setSearchOutput] = useState([]);
  const [trainerSearchOutput, setTrainerSearchOutput] = useState([]);
  const [subscriptionData, setSubscriptionData] = useState({
    flexpro_id: 0,
    subscription_id: 0,
    date_subscribed: new Date(),
    trainer_id: 0,
  });
  const [registered, setRegistered] = useState(false);
  const [alreadySubscribed, setAlreadySubscribed] = useState(false);
  const [myImage, setMyImage] = useState(null);
  const [myImage2, setMyImage2] = useState(null);

  const userRef = useRef(null);
  const trainerRef = useRef(null);
  const imageRef = useRef(null);
  const trainerImageRef = useRef(null);

  // Access the query parameters from the location object
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("q");

  //   get specific plan or subscription
  const getPlan = async () => {
    const response = await instance.get(`/api/specific_subscription/${id}`);
    setPlanNow(response.data);
    return response.data;
  };

  //   get users here
  let getUsers = async () => {
    await instance.get(`/api/users/`).then((res) => {
      const users = res.data;

      setFlexProUsers(users);
    });
  };

  let getTrainers = async () => {
    await instance.get(`/api/get_trainers/`).then((res) => {
      const trainers = res.data;

      setFlexProTrainers(trainers);
    });
  };

  const handleSelectUser = (flexpro_id, name, path) => {
    getImage(path, "user");
    userRef.current.innerText = name;
    setSearchField("");
    setAlreadySubscribed(false);

    setSubscriptionData((prev) => ({
      ...prev,
      flexpro_id: flexpro_id,
      subscription_id: parseInt(id),
    }));
  };

  const handleSelectTrainer = (trainer_id, name, path) => {
    getImage(path, "trainer");
    trainerRef.current.innerText = name;
    setTrainerField("");

    setSubscriptionData((prev) => ({
      ...prev,
      trainer_id: trainer_id,
    }));
  };

  // path = "/media/images/26/26.png"
  const getImage = async (path, selected) => {
    try {
      const response = await instance.get(path, { responseType: "blob" });
      const reader = new FileReader();
      reader.onloadend = () => {
        if (selected === "user") {
          setMyImage(reader.result);
        } else if (selected === "trainer") {
          setMyImage2(reader.result);
        }
      };
      reader.readAsDataURL(response.data);
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  const checkIfAlreadySubscribed = async (id) => {
    try {
      const response = await instance.get(`/api/user_status/${id}`);
      const users = response.data;

      return users;
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleSaveSubscription = async () => {
    let cc = await checkIfAlreadySubscribed(subscriptionData.flexpro_id);

    if (cc.length > 0) {
      setAlreadySubscribed(true);
    } else {
      instance
        .post("/api/save_subscriptions/", subscriptionData)
        .then(function (response) {
          console.log(response.data);
          setRegistered(true);
        })
        .catch(function (error) {
          console.log(error);
          return;
        });
    }
  };

  // ### USE EFFECT FUNCTION HERE ####
  //   load all users here
  useEffect(() => {
    console.log("load user here");
    getUsers();
  }, []);

  //   load all trainers here
  useEffect(() => {
    console.log("load trainers here");
    getTrainers();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      const fetchData = async () => {
        await getPlan();
      };

      fetchData();
    }, 50);
  }, [id]); // Include id as a dependency to fetch data when id changes

  // filtering users while typing
  useEffect(() => {
    const filteredUsers = flexProUsers.filter((user) =>
      user.flex_pro_user.name.toLowerCase().includes(searchField.toLowerCase())
    );

    setSearchOutput(filteredUsers);
  }, [searchField]);

  // filtering trainers while typing
  useEffect(() => {
    const filteredTrainers = flexProTrainers.filter((trainers) =>
      trainers.name.toLowerCase().includes(trainerField.toLowerCase())
    );

    setTrainerSearchOutput(filteredTrainers);
  }, [trainerField]);

  useEffect(() => {
    console.log(registered);
  }, [registered, alreadySubscribed]);

  useEffect(() => {
    if (myImage != null && myImage.current) {
      imageRef.current.src = myImage;
    }
  }, [myImage]);

  return (
    <>
      {/* <!-- Pricing Section Begin --> */}

      <div className="container content-margin">
        {planNow.id > 0 && (
          <>
            <div className="row">
              <div className="col-lg-12">
                <div className="section-title">
                  <span>SELECTED USER</span>
                  <div className="selected-user">
                    {myImage != null && (
                      <img ref={imageRef} src={myImage} alt="" />
                    )}

                    <h2 ref={userRef}></h2>
                  </div>

                  <span>SELECTED TRAINER</span>
                  <div className="selected-user">
                    {myImage2 != null && (
                      <img ref={trainerImageRef} src={myImage2} alt="" />
                    )}

                    <h2 ref={trainerRef}></h2>
                  </div>

                  {alreadySubscribed && (
                    <h3 style={{ color: "yellow" }}>
                      You're subscription has not been expired yet..
                    </h3>
                  )}

                  {registered && (
                    <h3 style={{ color: "red" }}>
                      You are successfully registered..
                    </h3>
                  )}
                </div>
              </div>
            </div>
            <div className="row search-users">
              <div className="col-lg-4">
                <input
                  type="text"
                  placeholder="Search User Here..."
                  onChange={(e) => setSearchField(e.target.value)}
                />

                <input
                  type="text"
                  placeholder="Search Trainor Here..."
                  onChange={(e) => setTrainerField(e.target.value)}
                />
                <div className="list-of-user">
                  {searchField != "" ? (
                    <ul className="list-group">
                      {searchOutput.map((user) => (
                        <li
                          className="list-group-item d-flex justify-content-between align-items-center"
                          key={user.flex_pro_user.id}
                        >
                          {user.flex_pro_user.name}
                          <span
                            className="badge badge-primary badge-pill dreg"
                            onClick={() =>
                              handleSelectUser(
                                user.flex_pro_user.id,
                                user.flex_pro_user.name,
                                user.image1
                              )
                            }
                          >
                            Select
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    ""
                  )}
                </div>

                <div className="list-of-trainers">
                  {trainerField != "" ? (
                    <ul className="list-group">
                      {trainerSearchOutput.map((trainer) => (
                        <li
                          className="list-group-item d-flex justify-content-between align-items-center"
                          key={trainer.id}
                        >
                          {trainer.name}
                          <span
                            className="badge badge-primary badge-pill dreg"
                            onClick={() =>
                              handleSelectTrainer(
                                trainer.id,
                                trainer.name,
                                trainer.image
                              )
                            }
                          >
                            Select
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
            <div className="row justify-content-center">
              <ListOfSubscriptions plan={planNow} key={planNow.id} />
            </div>
            <div className="row justify-content-center">
              {registered === true ? (
                <NavLink
                  className="primary-btn pricing-btn save-subscriptions-successfully"
                  to={"/"}
                >
                  Back to Dashboard
                </NavLink>
              ) : (
                <NavLink
                  className="primary-btn pricing-btn save-subscriptions"
                  onClick={handleSaveSubscription}
                >
                  Save Subscription
                </NavLink>
              )}
            </div>
          </>
        )}
      </div>

      {/* <!-- Pricing Section End --> */}
    </>
  );
};

export default MySubscribedNow;
