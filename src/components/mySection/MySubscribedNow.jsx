import React, { useEffect, useState, useRef } from "react";
import ListOfSubscriptions from "./Subscriptions/ListOfSubscriptions";
import { NavLink, useLocation } from "react-router-dom";
import instance from "../../others/axiosInstance";
import SessionDaysField from "../subScribeNowComponents/SessionDaysField";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const MySubscribedNow = () => {
  const [planNow, setPlanNow] = useState([]);
  const location = useLocation();

  const [searchField, setSearchField] = useState("");
  const [trainerField, setTrainerField] = useState("");
  const [sessionDays, setSessionDays] = useState();

  const [flexProUsers, setFlexProUsers] = useState([]);
  const [flexProTrainers, setFlexProTrainers] = useState([]);
  const [searchOutput, setSearchOutput] = useState([]);
  const [trainerSearchOutput, setTrainerSearchOutput] = useState([]);
  const [subscriptionData, setSubscriptionData] = useState({
    flexpro_id: 0,
    subscription_id: 0,
    date_subscribed: new Date(),
    trainer_id: 0,
    sub_session_days: 0,
  });

  const [registered, setRegistered] = useState(false);
  const [alreadySubscribed, setAlreadySubscribed] = useState(false);
  const [myImage, setMyImage] = useState(null);
  const [myImage2, setMyImage2] = useState(null);

  const userRef = useRef(null);
  const trainerRef = useRef(null);
  const imageRef = useRef(null);
  const trainerImageRef = useRef(null);

  const [message, setMessage] = useState("");

  const queryClient = useQueryClient();

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
      const response = await instance.get(
        `/api/user_status_for_adding_subscripton/${id}`,
      );
      const users = response.data;

      return users;
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // const handleSaveSubscription = async () => {
  //   let cc = await checkIfAlreadySubscribed(subscriptionData.flexpro_id);

  //   if (cc.length > 0) {
  //     setAlreadySubscribed(true);
  //     setMessage("You're subscription has not been expired yet..");
  //   } else {
  //     instance
  //       .post("/api/save_subscriptions/", subscriptionData)
  //       .then(function (response) {
  //         console.log(response.data);
  //         setRegistered(true);
  //         setMessage("You are successfully registered..");

  //         queryClient.invalidateQueries({
  //           queryKey: ["forActiveAndInactiveUsers"],
  //         });
  //       })
  //       .catch(function (error) {
  //         console.log(error);
  //         return;
  //       });
  //   }

  //   // instance
  //   //   .post("/api/save_subscriptions/", subscriptionData)
  //   //   .then(function (response) {
  //   //     console.log(response.data);
  //   //     setRegistered(true);
  //   //     setMessage("You are successfully registered..");
  //   //   })
  //   //   .catch(function (error) {
  //   //     console.log(error);
  //   //     return;
  //   //   });
  // };

  const handleSaveSubscription = async () => {
    if (subscriptionData.flexpro_id === 0) {
      setMessage("You must select a user first!");
      return;
    }

    const cc = await checkIfAlreadySubscribed(subscriptionData.flexpro_id);

    if (cc?.length > 0) {
      setAlreadySubscribed(true);
      setMessage("You're subscription has not been expired yet..");
      return;
    }

    saveSubscriptionMutation.mutate(subscriptionData);
  };

  const saveSubscriptionMutation = useMutation({
    mutationFn: async (payload) => {
      const res = await instance.post("/api/save_subscriptions/", payload);
      return res.data;
    },
    onSuccess: () => {
      setRegistered(true);
      setMessage("You are successfully registered..");

      // 🔥 This refetches data on OTHER pages
      queryClient.invalidateQueries({
        queryKey: ["forActiveAndInactiveUsers"],
      });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleCancelUser = async () => {
    userRef.current.innerText = "";
    setMyImage(null);

    setSubscriptionData((prev) => ({
      ...prev,
      flexpro_id: 0,
    }));
  };

  const handleCancelTrainer = async () => {
    trainerRef.current.innerText = "";
    setMyImage2(null);

    setSubscriptionData((prev) => ({
      ...prev,
      trainer_id: 0,
    }));
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
      user.flex_pro_user.name.toLowerCase().includes(searchField.toLowerCase()),
    );

    setSearchOutput(filteredUsers);
  }, [searchField]);

  // filtering trainers while typing
  useEffect(() => {
    const filteredTrainers = flexProTrainers.filter((trainers) =>
      trainers.name.toLowerCase().includes(trainerField.toLowerCase()),
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
            {alreadySubscribed && (
              <div className="row messageBox1">
                <h3>{message}</h3>
              </div>
            )}
            {registered && (
              <div className="row messageBox">
                <h3>{message}</h3>
              </div>
            )}
            {subscriptionData.flexpro_id === 0 && (
              <div className="row messageBox1">
                <h3>{"You must select a user first!"}</h3>
              </div>
            )}

            <div className="row">
              {/* selected user and trainer */}
              <div className="col-lg-6 left-column">
                <div className="section-title">
                  <span>SELECTED USER</span>
                  <div className="selected-user">
                    {myImage != null && (
                      <img ref={imageRef} src={myImage} alt="" />
                    )}

                    <h2 ref={userRef}></h2>

                    {myImage != null && (
                      <button
                        className="btn btn-danger cancelUser"
                        onClick={() => {
                          handleCancelUser();
                        }}
                      >
                        Cancel
                      </button>
                    )}
                  </div>

                  <span>SELECTED TRAINER</span>
                  <div className="selected-user">
                    {myImage2 != null && (
                      <img ref={trainerImageRef} src={myImage2} alt="" />
                    )}

                    <h2 ref={trainerRef}></h2>

                    {myImage2 != null && (
                      <button
                        className="btn btn-danger cancelUser"
                        onClick={() => handleCancelTrainer()}
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
                <div className="row search-users">
                  <div className="col-lg-12">
                    {planNow.per.per === "day" && (
                      <SessionDaysField
                        per={planNow.per.per}
                        sessionDays={sessionDays}
                        setSessionDays={setSessionDays}
                        setSubscriptionData={setSubscriptionData}
                      />
                    )}

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
                              {user.flex_pro_user.name.toUpperCase()}
                              <span
                                className="badge badge-primary badge-pill dreg"
                                onClick={() =>
                                  handleSelectUser(
                                    user.flex_pro_user.id,
                                    user.flex_pro_user.name,
                                    user.image1,
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
                              {trainer.name.toUpperCase()}
                              <span
                                className="badge badge-primary badge-pill dreg"
                                onClick={() =>
                                  handleSelectTrainer(
                                    trainer.id,
                                    trainer.name,
                                    trainer.image,
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

                <div className="">
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
                      style={{
                        pointerEvents: saveSubscriptionMutation.isPending
                          ? "none"
                          : "auto",
                      }}
                    >
                      {saveSubscriptionMutation.isPending
                        ? "Saving..."
                        : "Save Subscription"}
                    </NavLink>
                  )}
                </div>
              </div>

              <div className="col-lg-6 right-column">
                <div className="row">
                  <ListOfSubscriptions plan={planNow} key={planNow.id} />
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* <!-- Pricing Section End --> */}
    </>
  );
};

export default MySubscribedNow;
