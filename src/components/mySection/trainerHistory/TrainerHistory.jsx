import React from "react";
import FormatDate from "../../../others/FormatDate";

const TrainerHistory = ({ userSub }) => {
  return (
    <>
      <div className="col-lg-4 col-sm-12">
        <div className="card myCard" style={{ marginTop: "6px" }}>
          <div className="card-header myCard-header">
            <h5>{userSub?.subscription?.gym_rate_desc}</h5>
          </div>
          <div className="card-body">
            <div className="card-title myCard-title"></div>
            <div className="card-text">
              <p>
                <b>DATE SUBSCRIBED:</b> <br />
                <span>{FormatDate(userSub?.date_subscribed)}</span>
              </p>
              <p>
                <b>CLIENT:</b> <br />
                <span>{userSub?.flexprouser?.name}</span>
              </p>
              <p>
                <b>FREE PERSONAL TRAINING:</b>
                <br /> <span>3 day/s</span>
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

export default TrainerHistory;
