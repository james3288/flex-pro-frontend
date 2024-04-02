import React from "react";
import FormatDate from "../../../others/FormatDate";

const ExtendedTrainerHistory = ({ extendedSub }) => {
  return (
    <>
      <div className="col-lg-4 col-sm-12">
        <div className="card myCard" style={{ marginTop: "6px" }}>
          <div className="card-header myCard-header">
            <h5>
              {extendedSub?.user_subscription?.subscription?.gym_rate_desc}
            </h5>
          </div>
          <div className="card-body">
            <div className="card-title myCard-title"></div>
            <div className="card-text">
              <p>
                <b>DATE EXTENDED:</b> <br />
                <span>{FormatDate(extendedSub?.date_extend)}</span>
              </p>
              <p>
                <b>CLIENT:</b> <br />
                <span>{extendedSub?.user_subscription?.flexprouser?.name}</span>
              </p>
              <p>
                <b>EXTENDED DAYS:</b> <br />
                <span>{extendedSub?.extended_session_day} day/s</span>
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

export default ExtendedTrainerHistory;
