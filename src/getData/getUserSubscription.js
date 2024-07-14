import remainingDays from "../others/GetRemainingDays";
import instance from "../others/axiosInstance";
import getExtendedSubscription from "./getExtendedSubscription";
import getExtendedTrainer from "./getExtendedTrainer";
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

const getUserSubscription = async (id) => {
  try {
    const response = await instance.get(
      `/api/get_specific_user_subscription/${id}`
    );
    const users = response.data;

    const newUser = await Promise.all(
      users.map(async (user) => {
        // Call getImagePath asynchronously for each user
        const imgpath = await getImagePath(user.flexprouser.id);

        const imageDataUrl = await loadImageData(imgpath.image1);

        // get the remaining days
        const getRemainingDays = await remainingDays(
          user.date_subscribed,
          user.subscription.per.per,
          0,
          user.sub_session_days
        );

        const getExtendedSubscriptionDays = await extendedSub(user.id);

        // get extended subscription days left and main subscription days
        const extendedSubDays = getSubscriptionDaysLeft(
          getRemainingDays,
          getExtendedSubscriptionDays,
          user.date_subscribed,
          false
        );

        const extendedTrainer = await getExtendedTrainer(user.id);

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
    console.error("Error fetching user subscription:", error);
  }
};

export default getUserSubscription;
