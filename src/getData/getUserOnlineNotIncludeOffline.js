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

const getUserOnlineNotIncludeOffline = async () => {
  try {
    const response = await instance.get(
      `/api/get_user_online_not_including_offline`
    );

    const users = response.data;

    const newUser = await Promise.all(
      users.map(async (user) => {
        try {
          // Run independent async calls in parallel
          const [imgpath, remainingDaysResult, extendedSubDaysData] =
            await Promise.all([
              getImagePath(user.usersubscription.flexprouser.id),
              remainingDays(
                user.usersubscription.date_subscribed,
                user.usersubscription.subscription.per.per
              ),
              extendedSub(user.usersubscription.id),
            ]);

          const imageDataUrl = await loadImageData(imgpath?.image1);

          const extendedSubDays = getSubscriptionDaysLeft(
            remainingDaysResult,
            extendedSubDaysData,
            user.usersubscription.date_subscribed,
            true
          );

          return {
            ...user,
            image: imageDataUrl || "/media/image/default.jpg",
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

export default getUserOnlineNotIncludeOffline;
