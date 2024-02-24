import React, { useEffect, useState, useRef } from "react";
import ListOfSubscriptions from "./Subscriptions/ListOfSubscriptions";
import { NavLink, useLocation } from "react-router-dom";
import instance from "../../others/axiosInstance";

const MySubscribedNow = () => {
  const [planNow, setPlanNow] = useState([]);
  const location = useLocation();
  const [searchField, setSearchField] = useState("");
  const [flexProUsers, setFlexProUsers] = useState([]);
  const [searchOutput, setSearchOutput] = useState([]);
  const [subscriptionData, setSubscriptionData] = useState({
    flexpro_id: 0,
    subscription_id: 0,
    date_subscribed: new Date(),
  });
  const userRef = useRef(null);

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

  const handleSelectUser = (flexpro_id, name) => {
    userRef.current.innerText = name;
    setSearchField("");

    setSubscriptionData((prev) => ({
      ...prev,
      flexpro_id: flexpro_id,
      subscription_id: parseInt(id),
    }));
  };

  const handleSaveSubscription = async () => {
    instance
      .post("/api/save_subscriptions/", subscriptionData)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
        return;
      });
  };

  //   load all users here
  useEffect(() => {
    console.log("load user here");
    getUsers();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      const fetchData = async () => {
        await getPlan();
      };

      fetchData();
    }, 50);
  }, [id]); // Include id as a dependency to fetch data when id changes

  useEffect(() => {
    const filteredUsers = flexProUsers.filter((user) =>
      user.name.toLowerCase().includes(searchField.toLowerCase())
    );
    setSearchOutput(filteredUsers);
  }, [searchField]);

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
                  <h2 ref={userRef}>KING JAMES</h2>
                  {/* <h3>You are successfully registered..</h3> */}
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
                <div className="list-of-user">
                  {searchField != "" ? (
                    <ul className="list-group">
                      {searchOutput.map((user) => (
                        <li
                          className="list-group-item d-flex justify-content-between align-items-center"
                          key={user.id}
                        >
                          {user.name}
                          <span
                            className="badge badge-primary badge-pill dreg"
                            onClick={() => handleSelectUser(user.id, user.name)}
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
              <NavLink
                className="primary-btn pricing-btn save-subscriptions"
                onClick={handleSaveSubscription}
              >
                Save Subscription
              </NavLink>
            </div>
          </>
        )}
      </div>

      {/* <!-- Pricing Section End --> */}
    </>
  );
};

export default MySubscribedNow;
