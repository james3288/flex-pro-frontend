import React from "react";
import formatTime from "../others/ReadableFormatTime";

const getSubscriptionDaysLeft = (
  remaining,
  extendedSubscript,
  date_subscribed
) => {
  const now = new Date();
  // initialize  remainingdays to default 0
  let remainingDays = 0;

  // this is the remaining days of the main subscription
  remainingDays += formatTime(remaining, "days-only");

  extendedSubscript.map((extend) => {
    // if (extend.subscription.per.per === "month") {
    //   remainingDays += 31;
    // } else if (extend.subscription.per.per === "day") {
    //   remainingDays += 1;
    // } else if (extend.subscription.per.per === "year") {
    //   remainingDays += 365;
    // }
    remainingDays += extend.extended_session_day;
  });

  return remaining < 0 ? "Expired" : remainingDays + " Days";
};

export default getSubscriptionDaysLeft;
