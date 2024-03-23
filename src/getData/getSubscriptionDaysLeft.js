import React from "react";
import formatTime from "../others/ReadableFormatTime";

const getSubscriptionDaysLeft = (remaining, extendedSubscript) => {
  //   extendedSubscript?.forEach((extended) =>
  //     console.log(extended.subscription.per.per)
  //   );

  // initialize  remainingdays to default 0
  let remainingDays = 0;

  // this is the remaining days of the main subscription
  remainingDays += formatTime(remaining, "days-only");

  extendedSubscript.map((extend) => {
    // get the main date subscribed
    const date_subscribed = extend.user_subscription.date_subscribed;

    // set date_subscribed to new Date format
    const set_Date_subscribed = new Date(date_subscribed);

    // add the remaining days from the main subscription
    set_Date_subscribed.setDate(set_Date_subscribed.getDate() + remainingDays);

    if (extend.subscription.per.per === "month") {
      //after that add an extended days
      set_Date_subscribed.setMonth(set_Date_subscribed.getMonth() + 1);

      console.log(set_Date_subscribed);

      const now = new Date();
      const daysConsume = set_Date_subscribed.getTime() - now.getTime();

      console.log(formatTime(daysConsume, "days-only"));
    }
  });

  return remaining < 0 ? "Expired" : formatTime(remaining, "days-hours");
};

export default getSubscriptionDaysLeft;
