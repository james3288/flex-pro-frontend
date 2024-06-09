import React from "react";
import instance from "../others/axiosInstance";

const getSubscriptionReportByFreeTrainer = async (
  dateFrom,
  dateTo,
  trainer
) => {
  try {
    const newUser = [];

    const response = await instance.get(
      `/api/get_free_trainer_report/?dateFrom=${dateFrom}&dateTo=${dateTo}&trainer=${trainer}`
    );
    const data = await response.data;

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
