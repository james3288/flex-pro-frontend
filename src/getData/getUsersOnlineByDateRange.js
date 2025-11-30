import remainingDays from "../others/GetRemainingDays";
import instance from "../others/axiosInstance";
import getExtendedSubscription from "./getExtendedSubscription";
import getImagePath from "./getImagePath";
import getSubscriptionDaysLeft from "./getSubscriptionDaysLeft";
import loadImageData from "./loadImageData";

// get extended subscription
const extendedSub = async (subscriptionId) => {
  try {
    return await getExtendedSubscription(subscriptionId); // no double await
  } catch (error) {
    console.error("Error in fetching Extended Subscription:", error);
    return null; // return null to prevent undefined
  }
};

const getUsersOnlineByDateRange = async (dateFrom, dateTo) => {
  try {
    const response = await instance.get(
      `/api/get_clients_on_workout_report/?dateFrom=${dateFrom}&dateTo=${dateTo}`
    );

    const users = response.data;

    const newUser = await Promise.all(
      users.map(async (user) => {
        try {
          // Run independent async calls in parallel

          const userSub = user.usersubscription;

          const [remainingDaysResult, extendedSubDaysData] = await Promise.all([
            remainingDays(
              userSub.date_subscribed,
              userSub.subscription.per.per
            ),
            extendedSub(userSub.id),
          ]);

          const extendedSubDays = getSubscriptionDaysLeft(
            remainingDaysResult,
            extendedSubDaysData,
            userSub.date_subscribed,
            true
          );

          return {
            ...user,
            extendedSubDays,
            extendedSubscriptions: extendedSubDaysData,
          };
        } catch (userError) {
          console.error("Error processing user:", user, userError);
          return { ...user, image: "/media/image/default.jpg" }; // fallback
        }
      })
    );

    return newUser;
  } catch (error) {
    console.error("Error fetching users:", error);
    return []; // prevent returning undefined
  }
};

export default getUsersOnlineByDateRange;
