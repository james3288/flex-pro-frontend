import React from "react";
import instance from "../others/axiosInstance";
import { create } from "zustand";
import getRate from "../others/getRate";

const customizeRateFn = (extended_session) => {
  const setExtendedSession = extended_session === 0 ? 1 : extended_session;

  if (setExtendedSession <= 7) {
    return (800 / 7) * setExtendedSession;
  } else if (setExtendedSession > 7 && setExtendedSession <= 15) {
    return (1000 / 15) * setExtendedSession;
  } else if (setExtendedSession > 15 && setExtendedSession <= 30) {
    return (1500 / 30) * setExtendedSession;
  } else if (setExtendedSession === 31) {
    return (1500 / 31) * setExtendedSession;
  }
};

const ifPlural = (days, per) => {
  if (days > 1 && per === "day") {
    return days + " days";
  } else if (days <= 1 && per === "day") {
    return "day";
  } else {
    return per;
  }
};

const getUserSubscriptionReport = async (dateFrom, dateTo) => {
  try {
    const newUser = [];

    const response = await instance.get(
      `/api/get_user_subscription_report/?dateFrom=${dateFrom}&dateTo=${dateTo}`
    );
    const data = await response.data;

    const response2 = await instance.get(
      `/api/get_extended_subscription_report/?dateFrom=${dateFrom}&dateTo=${dateTo}`
    );

    const data2 = await response2.data;

    const response3 = await instance.get(
      `/api/get_daypass_subscription_report/?dateFrom=${dateFrom}&dateTo=${dateTo}`
    );

    const data3 = await response3.data;

    data?.forEach((item) => {
      const object = {
        id: $`sub-{ item.id}`,
        user: item.flexprouser.name,
        date_subscribed: item.date_subscribed,
        gym_rate_desc: item.subscription.gym_rate_desc,
        trainer: item?.trainer?.name,
        rate: item?.subscription?.rate,
        per: ifPlural(item?.sub_session_days, item?.subscription.per.per),
        // item?.subscription.per.per === "day"
        //   ? item?.sub_session_days + " " + item?.subscription.per.per
        //   : 1 + " " + item?.subscription.per.per,
        category: "subscribed",
        extended_session:
          item?.subscription.per.per === "day"
            ? customizeRateFn(item.sub_session_days).toLocaleString()
            : item?.subscription?.rate.toLocaleString(),
      };
      newUser.push(object);
    });

    data2?.forEach((item) => {
      const object = {
        id: $`ex-{item.id}`,
        user: item.user_subscription.flexprouser.name,
        date_subscribed: item.date_extend,
        gym_rate_desc: item.user_subscription.subscription.gym_rate_desc,
        trainer: null,
        // rate: item.user_subscription.subscription.rate,
        rate: getRate("day", item.extended_session_day),
        per:
          item.extended_session_day > 1
            ? item.extended_session_day + " days (extended)"
            : item.extended_session_day + " day (extended)",
        category: "extended",
        extended_session: customizeRateFn(
          item.extended_session_day
        ).toLocaleString(),
      };
      newUser.push(object);
    });

    data3?.forEach((item) => {
      const object = {
        id: $`ex-{item.id}`,
        user: item.name,
        date_subscribed: item.date_subscribed,
        gym_rate_desc: item.subscription.gym_rate_desc,
        trainer: item.personal_trainer?.name,
        // rate: item.user_subscription.subscription.rate,
        rate: item.subscription.rate,
        per: "day",
        category: "",
        extended_session: item.subscription.rate,
      };
      newUser.push(object);
    });

    // console.log("data", data);
    // console.log("data2", data2);

    // const filteredUsers = newUser.filter((user) => {
    //   const userDate = new Date(user.date_subscribed);
    //   const fromDate = new Date(dateFrom);
    //   const toDate = new Date(dateTo);
    //   return userDate >= fromDate && userDate <= toDate;
    // });

    const sortedUsers = newUser.sort((a, b) => {
      const dateA = new Date(a.date_subscribed);
      const dateB = new Date(b.date_subscribed);
      return dateB - dateA;
    });

    return sortedUsers;
  } catch (error) {
    console.error("Error in fetching User Subscription Report:", error);
  }
};

export default getUserSubscriptionReport;
