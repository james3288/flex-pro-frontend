import remainingDays from "../others/GetRemainingDays";
import instance from "../others/axiosInstance";
import getExtendedSubscription from "./getExtendedSubscription";
import getExtendedTrainer from "./getExtendedTrainer";
import getImagePath from "./getImagePath";
import getSubscriptionDaysLeft from "./getSubscriptionDaysLeft";
import loadImageData from "./loadImageData";

const extendedSub = async (subscriptionId) => {
  try {
    const data = await getExtendedSubscription(subscriptionId);
    return await data;
  } catch (error) {
    console.error("Error in fetching Extended Subscription:", error);
  }
};

const GetUserStatus = async (id) => {
  try {
    const response = await instance.get(`/api/user_status/${id}`);
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

        const extendedTrainer = await getExtendedTrainer(
          user.usersubscription.id
        );

        return {
          ...user,
          image: imageDataUrl || "/media/image/default.jpg",
          extendedSubDays: extendedSubDays,
          extendedSubscriptions: getExtendedSubscriptionDays,
          extendedTrainer: extendedTrainer,
        }; // If imgpath is null, use default image
      })
    );

    return newUser;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null; // or handle the error appropriately based on your application's needs
  }
};

export default GetUserStatus;
