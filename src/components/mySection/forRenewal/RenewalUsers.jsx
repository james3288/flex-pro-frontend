import React, { useEffect, useState } from "react";
import FormatDate from "../../../others/FormatDate";
import formatTime from "../../../others/ReadableFormatTime";
import remainingDays from "../../../others/GetRemainingDays";

const RenewalUsers = ({
  blobPic,
  registeredName,
  date_subscribed,
  subscription,
  per,
}) => {
  const [remaining, setRemaining] = useState(0);
  // get the remaining days
  const getRemainingDays = async () => {
    setRemaining(await remainingDays(date_subscribed, per));
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (formatTime(remaining, "minutes-left") < 0) {
        // setRefresher2(true);
        clearInterval(intervalId);
      } else {
        getRemainingDays();
      }
    }, 1000);

    // Clean up the interval when the component sunmounts
    return () => clearInterval(intervalId);
  }, [remaining]);
  return (
    <>
      <div className="col-lg-3 col-xs-12">
        <div className="c-col">
          <div className="c-col-name">
            <img src={blobPic} alt="" />
            <div className="col-name">
              <h4>
                <span>ID:1</span> {registeredName}
              </h4>
            </div>
          </div>
          <div className="c-col-time-in-out">
            <p>DATE REGISTERED</p>
            <h4>{FormatDate(date_subscribed)}</h4>

            <h3>{subscription}</h3>
            <h5>Remaining Days:</h5>
            <h4>{formatTime(remaining, "all")}</h4>
          </div>
        </div>
      </div>
    </>
  );
};

export default RenewalUsers;
