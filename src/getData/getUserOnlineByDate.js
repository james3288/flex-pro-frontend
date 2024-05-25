import remainingDays from "../others/GetRemainingDays";
import instance from "../others/axiosInstance";
import getExtendedSubscription from "./getExtendedSubscription";
import getImagePath from "./getImagePath";
import getSubscriptionDaysLeft from "./getSubscriptionDaysLeft";
import loadImageData from "./loadImageData";

// get extended subscription
const extendedSub = async (subscriptionId) => {
  try {
    const data = await getExtendedSubscription(subscriptionId);
    return await data;
  } catch (error) {
    console.error("Error in fetching Extended Subscription:", error);
  }
};

const getUsersOnlineByDate = async (dateLog) => {
  try {
    const response = await instance.get(`/api/user_online_by_date/${dateLog}`);
    const users = response.data;

    const newUser = await Promise.all(
      users.map(async (user) => {
        // Call getImagePath asynchronously for each user
        const imgpath = await getImagePath(
          user.usersubscription.flexprouser.id
        );

        const imageDataUrl = await loadImageData(imgpath.image1);

        // get the remaining days
        const getRemainingDays = await remainingDays(
          user.usersubscription.date_subscribed,
          user.usersubscription.subscription.per.per
        );

        const getExtendedSubscriptionDays = await extendedSub(
          user.usersubscription.id
        );

        // get extended subscription days left and main subscription days
        const extendedSubDays = getSubscriptionDaysLeft(
          getRemainingDays,
          getExtendedSubscriptionDays,
          user.usersubscription.date_subscribed,
          true
        );

        return {
          ...user,
          image: imageDataUrl || "/media/image/default.jpg",
          extendedSubDays: extendedSubDays,
          extendedSubscriptions: getExtendedSubscriptionDays,
        }; // If imgpath is null, use default image
      })
    );

    return newUser;
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

export default getUsersOnlineByDate;
