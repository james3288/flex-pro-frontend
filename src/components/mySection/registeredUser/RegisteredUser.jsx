import React, { useEffect, useState } from "react";
import remainingDays from "../../../others/GetRemainingDays";
import formatTime from "../../../others/ReadableFormatTime";
import ExtendButton from "./ExtendButton";

const RegisteredUser = ({
  registeredName,
  pix,
  weights,
  blobPix,
  user_id,
  subscription,
  date_subscribed,
  per,
  setRefresher,
  trainers,
  trainersRemainingDays,
  sub_session_days,
}) => {
  const [remaining, setRemaining] = useState(0);
  // get the remaining days
  const getRemainingDays = async () => {
    setRemaining(
      await remainingDays(date_subscribed, per, 0, sub_session_days)
    );
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (formatTime(remaining, "minutes-left") < 0) {
        setRefresher(true);
        console.log("ayonn...");
      } else {
        getRemainingDays();
      }
    }, 1000);
    // Clean up the interval when the component sunmounts
    return () => clearInterval(intervalId);
  }, [remaining]);
  // end get the reamining days
  return (
    <div className="clients-online">
      <div className="row row2">
        <div className="col-3">
          <img
            src={blobPix}
            alt=""
            className="circle"
            style={{ border: "2px solid red" }}
          />
        </div>
        <div className="col-7">
          <div className="clients-flex">
            <h5>{registeredName}</h5>
            <p>ID: {user_id}</p>
            <p
              style={{ color: "yellow", fontSize: "18px", lineHeight: "14px" }}
            >
              {subscription}
            </p>
            {/* <p style={{ lineHeight: "16px" }}>
              <strong>{formatTime(remaining, "days-hours")}</strong>
            </p> */}
            {/* <h5>Personal Trainer</h5>
            {trainersRemainingDays < 0 ? (
              <ExtendButton />
            ) : (
              <p style={{ lineHeight: "14px" }}>
                {trainers} - {formatTime(trainersRemainingDays, "days-hours")}{" "}
                left
              </p>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisteredUser;
