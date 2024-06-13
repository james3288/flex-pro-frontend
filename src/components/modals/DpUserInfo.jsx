import React, { useEffect, useState } from "react";
import Pic from "./../../../src/assets/img/dummy.png";
import FormatDate from "../../others/FormatDate";
import getSubscriptionDaysLeft from "../../getData/getSubscriptionDaysLeft";
import remainingDays from "../../others/GetRemainingDays";

const DpUserInfo = ({ user }) => {
  const [remaining, setRemaining] = useState(0);
  const [extendedSubscript, setExtendedSubscript] = useState([]);

  const subDaysLeft = getSubscriptionDaysLeft(
    remaining,
    extendedSubscript,
    user.date_subscribed,
    false
  );

  // get the remaining days
  const getRemainingDays = async () => {
    setRemaining(await remainingDays(user.date_subscribed, "day", user.id));
  };

  useEffect(() => {
    getRemainingDays();
  }, [user.id]);

  return (
    <div className="dp-user-sub">
      <div className="dp-user-sub-img">
        <img alt="" src={Pic} />
      </div>

      <div className="dp-user-sub-info">
        <h3>{user?.subscription.gym_rate_desc}</h3>
        <h4>{user?.name}</h4>
        <p>
          Date Subscribed: <br />
          <span>{FormatDate(user.date_subscribed)}</span>
        </p>
        <p>
          Remaining Hours: <br />
          <span>{subDaysLeft}</span>
        </p>
      </div>
    </div>
  );
};

export default DpUserInfo;
