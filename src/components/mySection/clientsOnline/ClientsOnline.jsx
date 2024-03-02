import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";
import instance from "../../../others/axiosInstance";
import axios from "axios";
import YearValidation from "../../../others/YearValidation";
import formatTime from "../../../others/ReadableFormatTime";
import remainingDays from "../../../others/GetRemainingDays";

function ClientsOnline({
  user_online_id,
  clientName,
  timeIn,
  timeOut,
  status,
  pix,
  timeAgo,
  weights,
  gym_rate_desc,
  rate,
  per,
  date_log,
  setTriggerLogout,
  blobPix,
  setNoOnlineUser,
  setRefresher2,
}) {
  // Parse the timestamp
  const timeInObj = new Date(timeIn);
  const timeOutObj = new Date(timeOut);
  const [remainingDays2, setRemainingDays2] = useState();

  const [remaining, setRemaining] = useState(0);
  // get the remaining days
  const getRemainingDays = async () => {
    setRemaining(await remainingDays(date_log, per));
  };

  // Get the time portion
  const timeInString = timeInObj.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const timeOutString = timeOutObj.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  // const yearValidation = timeOutObj.getFullYear();
  const yearValidation = YearValidation(timeOut);

  // LOGOUT FUNCTION
  const handleLogout = (timeIn) => {
    console.log(user_online_id);
    const logout_date = new Date();

    instance
      .put(`/api/user_time_record_update/${user_online_id}`, {
        time_in: timeIn,
        time_out: logout_date,
      })
      .then((response) => {
        console.log("Update successful:", response.data);
        setTriggerLogout((prev) => !prev);
        setNoOnlineUser((prev) => prev - 1);

        // Optionally, you can update your state or perform additional actions
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      });
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (formatTime(remaining, "minutes-left") < 0) {
        setRefresher2(true);
        console.log("ayonn2...");
        clearInterval(intervalId);
      } else {
        getRemainingDays();
      }
    }, 1000);

    // Clean up the interval when the component sunmounts
    return () => clearInterval(intervalId);
  }, [remaining]);

  const clients = (
    <div className="clients-online">
      <div className="row row2">
        <div className="col-3">
          <div className="small-circle"></div>
          {status === "true" ? (
            <img src={blobPix} alt="" className="circle" />
          ) : (
            <img
              src={blobPix}
              alt=""
              className="circle"
              style={{ border: "2px solid red" }}
            />
          )}
        </div>
        <div className="col-7">
          <div className="clients-flex">
            <h5>{clientName}</h5>
            <p>ID: {user_online_id}</p>
            <div className="timein_timeout">
              <p>
                IN: <strong>{timeInString}</strong>- OUT:
                <strong>
                  {yearValidation === 1990 ? "--:--" : timeOutString}
                </strong>
              </p>
              <NavLink
                className="btn btn-warning logout"
                onClick={() => handleLogout(timeIn)}
                to={"/"}
              >
                Logout
              </NavLink>
            </div>

            <p
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                color: "gold",
                lineHeight: "20px",
              }}
            >
              {gym_rate_desc} - {rate} / {per}
            </p>

            <p>
              <ReactTimeAgo date={timeAgo} locale="en-US" timeStyle="twitter" />{" "}
              ago
            </p>

            <h5>Remaining days:</h5>

            {remaining >= 0 ? (
              <p
                style={{
                  color: "orange",
                  fontSize: "18px",
                  lineHeight: "20px",
                }}
              >
                <strong>{formatTime(remaining, "days-hours")}</strong>
              </p>
            ) : (
              <p
                style={{
                  color: "orange",
                  fontSize: "18px",
                  lineHeight: "20px",
                }}
              >
                <strong>Expired</strong>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  if (yearValidation == "1990") {
    return clients;
  }
  // return yearValidation == "1990" ? (
  //   <div className="clients-online">
  //     <div className="row row2">
  //       <div className="col-3">
  //         <div className="small-circle"></div>
  //         {status === "true" ? (
  //           <img src={blobPix} alt="" className="circle" />
  //         ) : (
  //           <img
  //             src={blobPix}
  //             alt=""
  //             className="circle"
  //             style={{ border: "2px solid red" }}
  //           />
  //         )}
  //       </div>
  //       <div className="col-7">
  //         <div className="clients-flex">
  //           <h5>{clientName}</h5>
  //           <p>{weights} lbs</p>
  //           <div className="timein_timeout">
  //             <p>
  //               IN: <strong>{timeInString}</strong>- OUT:
  //               <strong>
  //                 {yearValidation === 1990 ? "--:--" : timeOutString}
  //               </strong>
  //             </p>
  //             <NavLink
  //               className="btn btn-warning logout"
  //               onClick={() => handleLogout(timeIn)}
  //               to={"/"}
  //             >
  //               Logout
  //             </NavLink>
  //           </div>

  //           <p
  //             style={{
  //               fontSize: "20px",
  //               fontWeight: "bold",
  //               color: "gold",
  //               lineHeight: "20px",
  //             }}
  //           >
  //             {gym_rate_desc} - {rate} / {per}
  //           </p>

  //           <p>
  //             <ReactTimeAgo date={timeAgo} locale="en-US" timeStyle="twitter" />{" "}
  //             ago
  //           </p>
  //           <hr />
  //           <p>Remaining days:</p>
  //           <p style={{ color: "orange" }}>
  //             {formatTime(remainingDays, "days")}{" "}
  //             {formatTime(remainingDays, "hours")}
  //           </p>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // ) : (
  //   ""
  // );
}

export default ClientsOnline;
