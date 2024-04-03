import React, { useEffect, useState } from "react";
import formatTime from "../../../others/ReadableFormatTime";
import instance from "../../../others/axiosInstance";
import FormatDate from "../../../others/FormatDate";

const ForRenewal = ({
  pix,
  registeredName,
  remaining,
  user_id,
  contactNo,
  id,
  subscription,
  date_log,
  per,
  setRefresher,
  setNoRenewalUser,
  trainersRemainingDays,
  trainers,
  extendedSubDays,
  extendedTrainerDays,
}) => {
  const dateLogObj = new Date(date_log);
  const dateLogObj1 = new Date(date_log);
  const [remainingDays1, setRemainingDays1] = useState();
  const now = new Date();

  if (per === "month") {
    dateLogObj1.setMonth(dateLogObj1.getMonth() + 1); // Add 1 month
  } else if (per === "day") {
    dateLogObj1.setDate(dateLogObj1.getDate() + 1); // add 1 day
  } else if (per === "year") {
    dateLogObj1.setFullYear(dateLogObj1.getFullYear() + 1); // add 1 year
  }

  const daysConsume = now.getTime() - dateLogObj.getTime();
  const subDays = dateLogObj1.getTime() - dateLogObj.getTime();
  var remainingDays = subDays - daysConsume;

  useEffect(() => {
    const daysleft = formatTime(remainingDays, "days-left");
    const hoursleft = formatTime(remainingDays, "hours-left");
    const minutesleft = formatTime(remainingDays, "minutes-left");

    const intervalId = setInterval(() => {
      // if (daysleft <= 0 && hoursleft <= 0 && minutesleft <= 0) {
      if (extendedSubDays < 0) {
        console.log(registeredName + ` ${id} has been expired`);

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

        // refresh once
        setRefresher(true);
      } else {
        setRemainingDays1(remainingDays);
      }
    }, 1000);

    // Clean up the interval when the component sunmounts
    return () => clearInterval(intervalId);
  }, [remainingDays1]);

  return (
    <>
      <div className="clients-online">
        <div className="row row2">
          <div className="col-3">
            <img
              src={pix}
              alt=""
              className="circle"
              style={{ border: "2px solid red" }}
            />
          </div>
          <div className="col-7">
            <div className="clients-flex">
              <h5>{registeredName}</h5>
              <p>{contactNo}</p>
              <p
                style={{
                  color: "yellow",
                  fontSize: "18px",
                  lineHeight: "14px",
                }}
              >
                {subscription} per {per}
              </p>
              {/* <p>ID:{user_id}</p> */}
              <p>Date Registered:</p>
              <p>
                <strong>{FormatDate(date_log)}</strong>
              </p>

              <p style={{ lineHeight: "16px" }}>
                Subscription Remaining Days:{" "}
              </p>
              <p style={{ lineHeight: "16px" }}>
                <strong>
                  {" "}
                  {/* {formatTime(remainingDays1, "days-hours")} */}
                  {extendedSubDays + " day/s left"}
                </strong>{" "}
              </p>
              <p>Personal Trainer Days:</p>

              <p style={{ lineHeight: "16px" }}>
                <strong>
                  {extendedTrainerDays < 0
                    ? "Expired"
                    : isNaN(extendedTrainerDays)
                    ? "N/A"
                    : extendedTrainerDays + " day/s left"}
                </strong>{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* // ))} */}
    </>
  );
};

export default ForRenewal;
