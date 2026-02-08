import React from "react";
import instance from "../others/axiosInstance";
import getRate from "../others/getRate";

const customizeRateFn = (extended_session, default_rate = 12) => {
  const setExtendedSession = extended_session === 0 ? 1 : extended_session;

  if (setExtendedSession <= 7) {
    return (800 / 7) * setExtendedSession;
  } else if (setExtendedSession > 7 && setExtendedSession <= 15) {
    return (1000 / 15) * setExtendedSession;
  } else if (setExtendedSession > 15 && setExtendedSession <= 30) {
    return (1500 / 30) * setExtendedSession;
  } else if (setExtendedSession === 31) {
    return (1500 / 31) * setExtendedSession;
  } else if (setExtendedSession === 365) {
    return default_rate;
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

const getUserSubscriptionReportByAll = async (dateFrom, dateTo) => {
  try {
    const newUser = [];

    // get user subscription by date range and gym rate desc
    const response = await instance.get(
      `/api/get_user_subscription_report_by_all/?dateFrom=${dateFrom}&dateTo=${dateTo}`,
    );
    const data = await response.data;

    const response2 = await instance.get(
      `/api/get_extended_subscription_report_by_all/?dateFrom=${dateFrom}&dateTo=${dateTo}`,
    );

    const data2 = await response2.data;

    // get daypass subscription by date range
    const response3 = await instance.get(
      `/api/get_daypass_subscription_report/?dateFrom=${dateFrom}&dateTo=${dateTo}`,
    );

    const data3 = await response3.data;

    // get membership subscription by date range
    const response4 = await instance.get(
      `/api/get_membership_subscription_report/?dateFrom=${dateFrom}&dateTo=${dateTo}`,
    );

    const data4 = await response4.data;

    data?.forEach((item) => {
      const object = {
        id: `sub-${item.id}`,
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
            ? customizeRateFn(item.sub_session_days)
            : item?.subscription?.rate,
        promo_option: item?.options,
        promo_rate: item?.promo_rate,
      };
      newUser.push(object);
    });

    data2?.forEach((item) => {
      const { rate: default_rate } = item.user_subscription.subscription;

      const object = {
        id: `ex-${item.id}`,
        user: item.user_subscription.flexprouser.name,
        date_subscribed: item.date_extend,
        gym_rate_desc: item.subscription.gym_rate_desc,
        trainer: null,
        // rate: item.user_subscription.subscription.rate,
        rate: getRate("day", item.extended_session_day),
        per:
          item.extended_session_day > 1
            ? item.extended_session_day +
              ` days (extended${item?.options === "promo" ? " - P" : ""})`
            : item.extended_session_day + ` day (extended - PROMO)`,
        category: "extended",
        extended_session:
          item?.options === "promo"
            ? item?.promo_rate
            : customizeRateFn(item.extended_session_day, default_rate),
        promo_option: item?.options,
        promo_rate: item?.promo_rate,
      };
      newUser.push(object);
    });

    data3?.forEach((item) => {
      const object = {
        id: `ex-${item.id}`,
        user: item.name,
        date_subscribed: item.date_subscribed,
        gym_rate_desc: item.subscription.gym_rate_desc,
        trainer: item.personal_trainer?.name,
        // rate: item.user_subscription.subscription.rate,
        rate: item.subscription.rate,
        per: "day",
        category: "",
        extended_session: item.subscription.rate,
        promo_option: "",
        promo_rate: 0,
      };
      newUser.push(object);
    });

    data4?.forEach((item) => {
      const object = {
        id: `ex-${item.id}`,
        user: item.name,
        date_subscribed: item.date_subscribed,
        gym_rate_desc: item.subscription.gym_rate_desc,
        trainer: item.personal_trainer?.name,
        // rate: item.user_subscription.subscription.rate,
        rate: item.rate,
        per: "year",
        category: "",
        extended_session: item.rate,
        promo_option: "",
        promo_rate: 0,
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

    // filter by subscription
    const filterBySubscription = newUser;

    // sort by date
    const sortedUsers = filterBySubscription.sort((a, b) => {
      const dateA = new Date(a.date_subscribed);
      const dateB = new Date(b.date_subscribed);
      return dateB - dateA;
    });

    console.log(sortedUsers);

    return sortedUsers;
  } catch (error) {
    console.error("Error in fetching User Subscription Report:", error);
  }
};

export default getUserSubscriptionReportByAll;
