import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";
import instance from "../../../others/axiosInstance";
import axios from "axios";
import YearValidation from "../../../others/YearValidation";
import formatTime from "../../../others/ReadableFormatTime";

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
}) {
  // initialize here
  // Convert milliseconds to readable format
  // const formatTime = (milliseconds, option) => {
  //   const seconds = Math.floor((milliseconds / 1000) % 60);
  //   const minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
  //   const hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 24);
  //   const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));

  //   if (option === "days") {
  //     return `${days} days`;
  //   } else if (option === "hours") {
  //     return `${hours} hours`;
  //   } else if (option === "all") {
  //     return `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
  //   }
  // };

  // Parse the timestamp
  const timeInObj = new Date(timeIn);
  const timeOutObj = new Date(timeOut);

  // parse the datelog
  const dateLogObj = new Date(date_log); // kanus.a na days nag subscribe

  const dateLogObj1 = new Date(date_log); //day started

  // set kanus.a ma expiration date
  if (per === "month") {
    dateLogObj1.setMonth(dateLogObj1.getMonth() + 1); // Add 1 month
  } else if (per === "day") {
    dateLogObj1.setDate(dateLogObj1.getDate() + 1);
  } else if (per === "year") {
    dateLogObj1.setFullYear(dateLogObj1.getFullYear() + 1);
  }

  const now = new Date();

  const daysConsume = now.getTime() - dateLogObj.getTime();
  const subDays = dateLogObj1.getTime() - dateLogObj.getTime();
  var remainingDays = subDays - daysConsume;

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
  const yearValidation = YearValidation(timeOutObj);

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
            <p style={{ color: "orange", fontSize: "20px" }}>
              {formatTime(remainingDays, "days")}{" "}
              {formatTime(remainingDays, "hours")}
            </p>
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
