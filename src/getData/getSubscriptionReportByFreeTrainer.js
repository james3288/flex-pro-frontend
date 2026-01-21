import React from "react";
import instance from "../others/axiosInstance";

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

const getSubscriptionReportByFreeTrainer = async (
  dateFrom,
  dateTo,
  trainer,
) => {
  try {
    const newUser = [];

    const response = await instance.get(
      `/api/get_free_trainer_report/?dateFrom=${dateFrom}&dateTo=${dateTo}&trainer=${trainer}`,
    );
    const data = await response.data;

    data?.forEach((item) => {
      const object = {
        id: `sub-${item.id}`,
        user: item.flexprouser.name,
        date_subscribed: item.date_subscribed,
        gym_rate_desc: item.subscription.gym_rate_desc,
        trainer: item?.trainer?.name,
        rate:
          item?.subscription.per.per === "day"
            ? customizeRateFn(item.sub_session_days).toLocaleString()
            : item?.subscription?.rate.toLocaleString(),
        per:
          item?.subscription.per.per === "day"
            ? item?.subscription.per.per
            : 1 + " " + item?.subscription.per.per,
        category: "subscribed",
        free_session_days: item?.session_days,
      };
      newUser.push(object);
    });

    const sortedUsers = newUser.sort((a, b) => {
      const dateA = new Date(a.date_subscribed);
      const dateB = new Date(b.date_subscribed);
      return dateB - dateA;
    });

    return sortedUsers;
  } catch (error) {
    console.error("Error in fetching free trainer Report:", error);
  }
};

export default getSubscriptionReportByFreeTrainer;
