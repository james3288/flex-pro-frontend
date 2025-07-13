import FormatDateOnly from "../others/FormatDateOnly";
import remainingDays from "../others/GetRemainingDays";
import instance from "../others/axiosInstance";
import getSubscriptionDaysLeft from "./getSubscriptionDaysLeft";

const getDayPassUserOnline3 = async () => {
  try {
    const response = await instance.get(`/api/daypass_user_online2`);
    const users = response.data;

    const newUser = await Promise.all(
      users?.map(async (user) => {
        const remaining = await remainingDays(
          user.flexprouserdaypass.date_subscribed,
          "day",
          user.flexprouserdaypass.id
        );

        const subDaysLeft = getSubscriptionDaysLeft(
          remaining,
          [],
          user.flexprouserdaypass.date_subscribed,
          false
        );

        return {
          ...user,
          remainingHours: subDaysLeft,
        }; // If imgpath is null, use default image
      })
    );

    return newUser?.filter(
      (x) =>
        FormatDateOnly(x.time_out) === "1990-01-01" &&
        x.remainingHours != "Expired"
    );
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

export default getDayPassUserOnline3;
