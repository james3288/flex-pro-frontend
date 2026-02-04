import React, { useEffect, useState, useRef } from "react";
import ListOfSubscriptions from "./Subscriptions/ListOfSubscriptions";
import { useLocation } from "react-router-dom";
import instance from "../../others/axiosInstance";
import { useQueryClient } from "@tanstack/react-query";
import SearchUsers from "./userSubscriptionComponents/SearchUsers";
import { Button, Modal } from "react-bootstrap";

const useSubscribeNowServices = ({ flexProId }) => {
  //   get specific plan or subscription
  const [planNow, setPlanNow] = useState([]);

  const getPlan = async () => {
    const response = await instance.get(
      `/api/specific_subscription/${flexProId}`,
    );

    setPlanNow(response.data);
  };

  useEffect(() => {
    getPlan();
  }, []);
  return { planNow };
};

const useMembershipServices = () => {
  const [membershipData, setMembershipData] = useState({});

  const getMembershipByFlexProId = async ({ flexProId }) => {
    try {
      const response = await instance.get(`/api/get_membership/${flexProId}`);
      setMembershipData(response.data);
    } catch (error) {
      console.log(error.message);
      setMembershipData({});
    }
  };

  return { getMembershipByFlexProId, membershipData, setMembershipData };
};

// MAIN COMPONENT
const MySubscribedNow = () => {
  const location = useLocation();

  // const [searchField, setSearchField] = useState("");
  const [trainerField, setTrainerField] = useState("");
  // const [sessionDays, setSessionDays] = useState();

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

  const { planNow } = useSubscribeNowServices({ flexProId: id });
  const { getMembershipByFlexProId, membershipData, setMembershipData } =
    useMembershipServices();

  const handleSelectUser = (flexpro_id, name, path) => {
    getImage(path, "user");
    userRef.current.innerText = name;
    // setSearchField("");
    setAlreadySubscribed(false);

    setSubscriptionData((prev) => ({
      ...prev,
      flexpro_id: flexpro_id,
      subscription_id: parseInt(id),
    }));

    getMembershipByFlexProId({ flexProId: flexpro_id });
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

  // const checkIfAlreadySubscribed = async (id) => {
  //   try {
  //     const response = await instance.get(
  //       `/api/user_status_for_adding_subscripton/${id}`,
  //     );
  //     const users = response.data;

  //     return users;
  //   } catch (error) {
  //     console.error("Error fetching users:", error);
  //   }
  // };

  // const checkIfSelectedSubscriptionIsMembership = async () => {
  //   return planNow.gym_rate_desc === "MEMBERSHIP" ? true : false;
  // };

  // const handleSaveSubscription = async () => {
  //   if (subscriptionData.flexpro_id === 0) {
  //     setMessage("You must select a user first!");
  //     return;
  //   }

  //   const cc = await checkIfAlreadySubscribed(subscriptionData.flexpro_id);
  //   const isMembership = await checkIfSelectedSubscriptionIsMembership();

  //   saveSubscriptionMutation.mutate(subscriptionData);
  // };

  // const saveSubscriptionMutation = useMutation({
  //   mutationFn: async (payload) => {
  //     const res = await instance.post("/api/save_subscriptions/", payload);
  //     return res.data;
  //   },
  //   onSuccess: () => {
  //     setRegistered(true);
  //     setMessage("You are successfully registered..");

  //     // 🔥 This refetches data on OTHER pages
  //     queryClient.invalidateQueries({
  //       queryKey: ["forActiveAndInactiveUsers"],
  //     });
  //   },
  //   onError: (error) => {
  //     console.error(error);
  //   },
  // });

  const handleCancelUser = async () => {
    userRef.current.innerText = "";
    setMyImage(null);
    setAlreadySubscribed(false);

    setSubscriptionData((prev) => ({
      ...prev,
      flexpro_id: 0,
    }));

    setMembershipData({});
  };

  const handleCancelTrainer = async () => {
    trainerRef.current.innerText = "";
    setMyImage2(null);

    setSubscriptionData((prev) => ({
      ...prev,
      trainer_id: 0,
    }));
  };

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

            <div className="row">
              {/* selected user and trainer */}
              <div className="col-lg-6 left-column">
                <div className="section-title">
                  <span>SELECTED USER</span>
                  <div className="selected-user">
                    {myImage != null && (
                      <img
                        ref={imageRef}
                        src={myImage}
                        alt=""
                        style={{ border: "3px solid yellowGreen" }}
                      />
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
                      <img
                        ref={trainerImageRef}
                        src={myImage2}
                        alt=""
                        style={{ border: "3px solid yellowGreen" }}
                      />
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

                <SearchUsers
                  handleSelectUser={handleSelectUser}
                  handleSelectTrainer={handleSelectTrainer}
                  setSubscriptionData={setSubscriptionData}
                  planNow={planNow}
                  subscriptionData={subscriptionData}
                  membershipData={membershipData}
                />

                {/* <div className="">
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
                </div> */}
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
