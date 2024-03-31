import React from "react";
import FormatDate from "../../../others/FormatDate";
import formatTimeToString from "../../../others/formatTimeToString";
import YearValidation from "../../../others/YearValidation";

const UserHistory = ({ user }) => {
  const timeOut = formatTimeToString(user.time_out);
  const timeOutYearValidation = YearValidation(user.time_out);

  return (
    <>
      <div className="col-lg-3 col-sm-12">
        <div className="card myCard" style={{ marginTop: "6px" }}>
          <div className="card-header myCard-header">
            <h5>{FormatDate(user.date_log)}</h5>
          </div>
          <div className="card-body">
            <div className="card-title myCard-title"></div>
            <div className="card-text">
              <p>
                Time In: <span>{formatTimeToString(user.time_in)}</span>
              </p>
              <p>
                Time Out:{" "}
                <span>
                  {timeOutYearValidation === 1990 ? "--:--" : timeOut}
                </span>
              </p>
            </div>
          </div>
          {/* <div className="card-footer myCard-footer">
            <h4>
              {user.usersubscription.subscription.gym_rate_desc} /{" "}
              {user.usersubscription.subscription.rate.toLocaleString()}
            </h4>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default UserHistory;
