import React from "react";
import instance from "../others/axiosInstance";
import remainingDays from "../others/GetRemainingDays";
import getSubscriptionDaysLeft from "../getData/getSubscriptionDaysLeft";

const useGetDayPassUsers = () => {
  const getDaypassUser = async () => {
    try {
      const response = await instance.get(`/api/get_daypass_user/`);
      const users = response.data;

      const newUser = await Promise.all(
        users.map(async (user) => {
          // Call getImagePath asynchronously for each user
          const remaining = await remainingDays(
            user.date_subscribed,
            "day",
            user.id
          );

          const subDaysLeft = getSubscriptionDaysLeft(
            remaining,
            [],
            user.date_subscribed,
            false
          );

          return {
            ...user,
            remaining: remaining,
            remainingHours: subDaysLeft,
          }; // If imgpath is null, use default image
        })
      );

      return newUser;
    } catch (error) {
      console.error("Error fetching day pass users:", error);
    }
  };

  const getDayPassUserActive = async () => {
    try {
      const response = await instance.get(`/api/get_daypass_user/`);
      const users = response.data;

      const newUser = await Promise.all(
        users.map(async (user) => {
          // Call getImagePath asynchronously for each user
          const remaining = await remainingDays(
            user.date_subscribed,
            "day",
            user.id
          );

          const subDaysLeft = getSubscriptionDaysLeft(
            remaining,
            [],
            user.date_subscribed,
            false
          );

          return {
            ...user,
            remaining: remaining,
            remainingHours: subDaysLeft,
          }; // If imgpath is null, use default image
        })
      );

      return newUser.filter((x) => x.remainingHours != "Expired");
    } catch (error) {
      console.error("Error fetching day pass users:", error);
    }
  };
  return { getDaypassUser, getDayPassUserActive };
};

export default useGetDayPassUsers;
