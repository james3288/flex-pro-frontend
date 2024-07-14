import remainingDays from "../others/GetRemainingDays";
import instance from "../others/axiosInstance";
import { useDayPassStore } from "../store/useDayPassStore";
import getSubscriptionDaysLeft from "./getSubscriptionDaysLeft";

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

    // console.log("activeUsers", newUser);
    // console.log("hehehe", newUser);
    return newUser;
  } catch (error) {
    console.error("Error fetching day pass users:", error);
  }
};

export default getDaypassUser;
