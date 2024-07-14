import React from "react";
import formatTime from "../others/ReadableFormatTime";

// Function to add days to a Date object

const timeStampAddDays = (timeStamp, extendedDays, daysonly) => {
  const timestamp = timeStamp + extendedDays * 24 * 60 * 60 * 1000;
  return timestamp < 0
    ? "Expired"
    : daysonly === false
    ? formatTime(timestamp, "days-hours-minutes")
    : formatTime(timestamp, "days-left");
};

const getSubscriptionDaysLeft = (
  remaining,
  extendedSubscript,
  date_subscribed,
  daysOnly
) => {
  const extendedRangeDays = (extendedDate, extended_days) => {
    const dateLogObj1 = new Date(extendedDate);
    dateLogObj1.setDate(dateLogObj1.getDate() + extended_days);

    return 5;
  };

  const now = new Date();
  // initialize  remainingdays to default 0
  let remainingDays = 0;
  let remainingHoursOnly = 0;
  let extendedSessionDays = 0;

  // this is the remaining days of the main subscription
  remainingDays += formatTime(remaining, "days-left");
  remainingHoursOnly += formatTime(remaining, "hours-left");

  // extended days for subscriptions
  extendedSubscript?.map((extend, index) => {
    extendedSessionDays += extend?.extended_session_day;

    // remainingDays += extendedRangeDays(
    //   extend?.date_extend,
    //   extend?.extended_session_day
    // );
  });

  // return daysOnly === true
  //   ? remainingDays
  //   : remainingDays < 0
  //   ? "Expired"
  //   : `${remainingDays} ${
  //       remainingDays > 1 ? " days," : "day,"
  //     } ${remainingHoursOnly} ${remainingHoursOnly > 1 ? " hours" : " hour"}`;
  // // return remaining < 0 ? "Expired" : remainingDays + " Days";

  return timeStampAddDays(remaining, extendedSessionDays, daysOnly);
};

export default getSubscriptionDaysLeft;
