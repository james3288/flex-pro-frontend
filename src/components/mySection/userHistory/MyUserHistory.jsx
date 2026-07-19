import React, { useContext, useMemo, useState } from "react";
import getUserHistory from "../../../getData/getUserHistory";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import RenewalUsers from "../forRenewal/RenewalUsers";
import ClientsOnWorkout from "../clientsOnWorkout/ClientsOnWorkout";
import formatTimeToString from "../../../others/formatTimeToString";
import FormatDate from "../../../others/FormatDate";
import getUserSubscription from "../../../getData/getUserSubscription";
import UserHistory from "./UserHistory";
import {
  UserHistoryContext,
  UserHistoryProvider,
} from "../../../context/UserHistoryContext";
import ListOfUserHistory from "./ListOfUserHistory";

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

  // const {
  //   isLoading: isPending,
  //   error,
  //   data,
  // } = useQuery({
  //   queryKey,
  //   queryFn: () => getUserHistory(id),
  //   // refetchInterval: 1000,
  // });

  // const {
  //   isLoading: isPending2,
  //   error: error2,
  //   data: data2,
  // } = useQuery({
  //   queryKey2,
  //   queryFn: () => getUserSubscription(id),
  //   // refetchInterval: 1000,
  // });

  // if (isPending || isPending2)
  //   return (
  //     <div id="preloder">
  //       <div className="loader"></div>
  //     </div>
  //   );

  // if (error) {
  //   return "An error has occurred: " + error.message;
  // } else if (error2) {
  //   return "An error has occurred: " + error2.message;
  // }

  // console.log("userHistoryData", data);
  // console.log("userSubscription", data2);

  function handleChange(e) {
    const value = e.target.value;
    setDate(value); // Update state with the new value
  }

  const context = () => {
    return (
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
                  <h2 style={{ color: "gray" }}>CLIENTS/USERS HISTORY</h2>
                </div>
              </div>
            </div>
          </div>
          <ListOfUserHistory />
        </div>
      </section>
    );
  };

  return <UserHistoryProvider id={id}>{context()}</UserHistoryProvider>;

  // return <>{context}</>;
};

export default MyUserHistory;
