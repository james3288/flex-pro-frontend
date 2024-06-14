import React from "react";
import Pic from "../../../../src/assets/img/dummy.png";
import ReactTimeAgo from "react-time-ago";
import formatTime from "../../../others/ReadableFormatTime";
import formatTimeToString from "../../../others/formatTimeToString";
import YearValidation from "../../../others/YearValidation";

const DayPassClientsOnline = ({ user }) => {
  const clients = (
    <div className="clients-online">
      <div className="row row2">
        <div className="col-3">
          <div className="small-circle"></div>

          <img src={Pic} alt="" className="circle" />
        </div>
        <div className="col-7">
          <div className="clients-flex">
            <h5>{user?.flexprouserdaypass?.name}</h5>
            {/* <p>ID: {user_online_id}</p> */}
            <div className="timein_timeout">
              <p>
                IN: <strong>{formatTimeToString(user?.time_in)}</strong>- OUT:
                <strong>
                  {YearValidation(user?.time_out) == "1990" && "--:--"}
                </strong>
              </p>
            </div>

            <p
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                color: "gold",
                lineHeight: "20px",
              }}
            >
              {user?.flexprouserdaypass.subscription.gym_rate_desc} -{" "}
              {user?.flexprouserdaypass.subscription.rate} /{" "}
              {user?.flexprouserdaypass.subscription.per.per}
            </p>

            <p>
              <ReactTimeAgo
                date={user?.time_in}
                locale="en-US"
                timeStyle="twitter"
              />{" "}
              ago
            </p>

            <h5>Remaining Hours:</h5>

            <p
              style={{
                color: "orange",
                fontSize: "18px",
                lineHeight: "20px",
              }}
            >
              <strong>{user.remainingHours}</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return clients;
};

export default DayPassClientsOnline;
