import React, { useMemo, useState } from "react";
import getUserHistory from "../../../getData/getUserHistory";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import RenewalUsers from "../forRenewal/RenewalUsers";
import ClientsOnWorkout from "../clientsOnWorkout/ClientsOnWorkout";
import formatTimeToString from "../../../others/formatTimeToString";
import FormatDate from "../../../others/FormatDate";
import getUserSubscription from "../../../getData/getUserSubscription";
import UserHistory from "./UserHistory";

const MyUserHistory = () => {
  const [userSubscriptionId, setUserSubscriptionId] = useState(0);
  const [extendedSubId, setExtendedSubId] = useState(0);
  const [extendedTrainerId, setExtendedTrainerId] = useState(0);
  const [modalTitle, setModalTitle] = useState();
  const [date, setDate] = useState(getFormattedDate());
  const location = useLocation();
  // Access the query parameters from the location object
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("q");

  const queryKey = useMemo(() => ["forUserHistory"], []);
  const queryKey2 = useMemo(() => ["forUserSubscription"], []);

  function getFormattedDate(date) {
    // Create a new Date object
    const currentDate = new Date(date);

    // Get the individual date components
    const year = String(currentDate.getFullYear()).slice(-2); // Get last two digits of the year
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Month is zero-indexed
    const day = String(currentDate.getDate()).padStart(2, "0");

    // Concatenate the components in the desired format
    const formattedDate = `${month}-${day}-${year}`;
    return formattedDate;
  }

  const {
    isLoading: isPending,
    error,
    data,
  } = useQuery({
    queryKey,
    queryFn: () => getUserHistory(id),
    // refetchInterval: 1000,
  });

  const {
    isLoading: isPending2,
    error: error2,
    data: data2,
  } = useQuery({
    queryKey2,
    queryFn: () => getUserSubscription(id),
    // refetchInterval: 1000,
  });

  if (isPending || isPending2)
    return (
      <div id="preloder">
        <div className="loader"></div>
      </div>
    );

  if (error) {
    return "An error has occurred: " + error.message;
  } else if (error2) {
    return "An error has occurred: " + error2.message;
  }

  console.log("userHistoryData", data);
  console.log("userSubscription", data2);

  function handleChange(e) {
    const value = e.target.value;
    setDate(value); // Update state with the new value
  }

  return (
    <>
      <section
        className="team-section team-page"
        style={{ paddingTop: "20px" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="team-title">
                <div className="section-title">
                  <span>Flex Pro</span>
                  <h2>CLIENTS/USERS HISTORY</h2>
                </div>
              </div>
            </div>
            {/* <div className="col-lg-6">
              <div className="team-title">
                <div className="section-title">
                  <span>Date</span>
                  <input
                    type="date"
                    className="form-control"
                    id="userHistoryDate"
                    name="user_history_date"
                    onChange={handleChange}
                    defaultValue={date}
                  />
                </div>
              </div>
            </div> */}
          </div>

          {data2.map((user2) => (
            <>
              <div className="row subInfo">
                {/* SUBSCRIPTION INFO */}
                <div className="col-lg-6">
                  {/* USER SUBSCRIPTION */}
                  <h3 style={{ color: "orange", marginTop: "15px" }}>
                    {user2.subscription.gym_rate_desc}
                    {" - "}
                    {FormatDate(user2.date_subscribed)}
                  </h3>

                  {/* USER EXTENDED SUBSCRIPTION */}
                  <h4 style={{ color: "gray" }}>Extended Subscription:</h4>

                  {user2.extendedSubscriptions.length > 0 ? (
                    user2.extendedSubscriptions?.map((extended) => (
                      <h5 style={{ color: "yellowgreen" }}>
                        - {extended?.subscription?.gym_rate_desc} -{" "}
                        {extended?.extended_session_day} day/s -{" "}
                        {FormatDate(extended?.date_extend)}
                      </h5>
                    ))
                  ) : (
                    <h5 style={{ color: "yellowgreen" }}>None</h5>
                  )}

                  {/* DAYS LEFT */}
                  <h4 style={{ color: "gray" }}>Subscription Days Left:</h4>
                  <h5 style={{ color: "yellowgreen" }}>
                    {" "}
                    {user2?.extendedSubDays < 0
                      ? "Expired"
                      : user2?.extendedSubDays + " Day/s"}
                  </h5>
                </div>

                {/* TRAINERS */}
                <div className="col-lg-6">
                  <h4 style={{ color: "gray", marginTop: "15px" }}>
                    Main Trainer:
                  </h4>
                  <h5 style={{ color: "pink" }}>{user2.trainer?.name}</h5>
                  <h4 style={{ color: "gray", marginTop: "15px" }}>
                    Extended Trainers:
                  </h4>
                  {user2?.extendedTrainer?.map((trainer) => (
                    <h5 style={{ color: "pink" }}>{trainer.trainer?.name}</h5>
                  ))}
                  {/* <h5 style={{ color: "pink" }}>JUAN DELA CRUZ</h5>
                  <h5 style={{ color: "pink" }}>LUFFY D. MONKEY</h5> */}
                </div>
              </div>

              {/* USER LOGS */}
              <div className="row subInfo" key={user2.id}>
                {data.map(
                  (user) =>
                    user2.id === user.usersubscription.id && (
                      <UserHistory key={user.id} user={user} />
                    )
                )}
              </div>
              <hr />
            </>
          ))}
        </div>
      </section>
    </>
  );
};

export default MyUserHistory;
