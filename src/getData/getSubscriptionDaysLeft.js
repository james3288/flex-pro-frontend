import React from "react";
import formatTime from "../others/ReadableFormatTime";

const getSubscriptionDaysLeft = (
  remaining,
  extendedSubscript,
  date_subscribed,
  daysOnly
) => {
  const now = new Date();
  // initialize  remainingdays to default 0
  let remainingDays = 0;
  let remainingHoursOnly = 0;

  // this is the remaining days of the main subscription
  remainingDays += formatTime(remaining, "days-left");
  remainingHoursOnly += formatTime(remaining, "hours-left");

  extendedSubscript?.map((extend, index) => {
    remainingDays += extend?.extended_session_day;
  });

  return daysOnly === true
    ? remainingDays
    : remainingDays < 0
    ? "Expired"
    : `${remainingDays} ${
        remainingDays > 1 ? " days," : "day,"
      } ${remainingHoursOnly} ${remainingHoursOnly > 1 ? " hours" : " hour"}`;
  // return remaining < 0 ? "Expired" : remainingDays + " Days";
};

export default getSubscriptionDaysLeft;
