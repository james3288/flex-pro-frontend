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
  const location = useLocation();
  // Access the query parameters from the location object
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("q");

  const queryKey = useMemo(() => ["forUserHistory"], []);
  const queryKey2 = useMemo(() => ["forUserSubscription"], []);

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
  return (
    <>
      <section
        className="team-section team-page"
        style={{ paddingTop: "20px" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="team-title">
                <div className="section-title">
                  <span>Flex Pro</span>
                  <h2>CLIENTS/USERS HISTORY</h2>
                </div>
              </div>
            </div>
          </div>

          {data2.map((user2) => (
            <>
              <div className="row">
                {/* SUBSCRIPTION INFO */}
                <div className="col-lg-6">
                  {/* USER SUBSCRIPTION */}
                  <h3 style={{ color: "orange", marginTop: "15px" }}>
                    {user2.subscription.gym_rate_desc}
                    {" / "}
                    {FormatDate(user2.date_subscribed)}
                  </h3>

                  {/* USER EXTENDED SUBSCRIPTION */}
                  <h4 style={{ color: "gray" }}>Extended Subscription:</h4>

                  {user2.extendedSubscriptions.length > 0 ? (
                    user2.extendedSubscriptions?.map((extended) => (
                      <h5 style={{ color: "yellowgreen" }}>
                        - {extended?.subscription?.gym_rate_desc} /{" "}
                        {extended?.extended_session_day} day/s{" "}
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
                    Trainers:
                  </h4>
                  <h5 style={{ color: "pink" }}>JUAN DELA CRUZ</h5>
                  <h5 style={{ color: "pink" }}>LUFFY D. MONKEY</h5>
                </div>
              </div>

              {/* USER LOGS */}
              <div className="row" key={user2.id}>
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

          {/* <div className="row">
            {data?.map((user) => (
              // user.remainingDays <= 2 ||
              <UserHistory key={user.id} user={user} />
            ))}
          </div> */}
        </div>
      </section>
    </>
  );
};

export default MyUserHistory;
