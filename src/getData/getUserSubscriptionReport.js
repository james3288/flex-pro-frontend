import React from "react";
import instance from "../others/axiosInstance";
import { create } from "zustand";
import getRate from "../others/getRate";

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

    data?.forEach((item) => {
      const object = {
        id: $`sub-{ item.id}`,
        user: item.flexprouser.name,
        date_subscribed: item.date_subscribed,
        gym_rate_desc: item.subscription.gym_rate_desc,
        trainer: item?.trainer?.name,
        rate: item?.subscription?.rate,
        per:
          item?.subscription.per.per === "day"
            ? item?.subscription.per.per
            : 1 + " " + item?.subscription.per.per,
        category: "subscribed",
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
