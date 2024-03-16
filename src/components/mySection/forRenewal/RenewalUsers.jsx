import React, { useEffect, useState } from "react";
import FormatDate from "../../../others/FormatDate";
import formatTime from "../../../others/ReadableFormatTime";
import remainingDays from "../../../others/GetRemainingDays";
import instance from "../../../others/axiosInstance";

const RenewalUsers = ({
  blobPic,
  registeredName,
  date_subscribed,
  subscription,
  per,
  user_id,
  id,
  trainers,
  trainerRemainingDays,
}) => {
  const [remaining, setRemaining] = useState(0);
  const [counter, setCounter] = useState(0);
  // get the remaining days
  const getRemainingDays = async () => {
    setRemaining(await remainingDays(date_subscribed, per, user_id));
  };

  const handleExpired = () => {
    setCounter((prev) => prev + 1);
    instance
      .put(`/api/user_status_update/${id}`, {
        status: "expired",
      })
      .then((response) => {
        console.log("Update successful:", response.data);
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      });
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (formatTime(remaining, "minutes-left") < 0) {
        // setRefresher2(true);

        counter == 0 && handleExpired();

        clearInterval(intervalId);
      } else {
        getRemainingDays();
      }
    }, 1000);

    // Clean up the interval when the component sunmounts
    return () => clearInterval(intervalId);
  }, [remaining]);

  const context = (
    <>
      <div className="col-lg-3 col-xs-12">
        <div className="c-col">
          <div className="c-col-name">
            <img src={blobPic} alt="" />
            <div className="col-name">
              <h4>
                <span>ID:{user_id}</span> {registeredName}
              </h4>
            </div>
          </div>
          <div className="c-col-time-in-out">
            <h5>DATE SUBSCRIBED</h5>
            <h4>{FormatDate(date_subscribed)}</h4>

            <h3>{subscription}</h3>
            <h5>Remaining Days:</h5>
            <h4>{remaining < 0 ? "Expired" : formatTime(remaining, "all")}</h4>

            <h5>Personal Trainers:</h5>

            <h4 style={{ color: "pink" }}>
              {trainers}{" "}
              {trainerRemainingDays < 0
                ? trainers == null
                  ? "N/A"
                  : "- Expired"
                : "(" +
                  formatTime(trainerRemainingDays, "days-hours") +
                  ") left"}
            </h4>
            {trainers == null ? (
              <button
                className="btn btn-primary"
                style={{ padding: "3px 10px" }}
              >
                Add Personal Trainer
              </button>
            ) : (
              <button
                className="btn btn-primary"
                style={{ padding: "3px 10px" }}
              >
                Extend
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );

  return context;
  // if (trainers == null && formatTime(remaining, "days-only") > 2) {
  //   return;
  // } else {
  //   return context;
  // }
};

export default RenewalUsers;
