import remainingDays from "../others/GetRemainingDays";
import formatTime from "../others/ReadableFormatTime";
import instance from "../others/axiosInstance";
import getExtendedSubscription from "./getExtendedSubscription";
import getExtendedTrainer from "./getExtendedTrainer";
import getImagePath from "./getImagePath";
import getSubscriptionDaysLeft from "./getSubscriptionDaysLeft";
import getTrainerRemainingDays from "./getTrainerRemainingDays";
import loadImageData from "./loadImageData";
import personalTrainerDaysLeft from "./personalTrainerDaysLeft";

const getForRenewalUsers = async () => {
  // get extended subscription
  const extendedSub = async (subscriptionId) => {
    try {
      const data = await getExtendedSubscription(subscriptionId);
      return await data;
    } catch (error) {
      console.error("Error in fetching Extended Subscription:", error);
    }
  };

  // get extended trainer data
  const extendedTrainerData = async (subscriptionId) => {
    try {
      const data = await getExtendedTrainer(subscriptionId);
      return await data;
    } catch (error) {
      console.error("Error in fetching Extended Trainer:", error);
    }
  };

  const fetchTrainerRemainingDays = async (
    trainerRemainingDays,
    session_days,
    extendedTrainer
  ) => {
    try {
      const days = await getTrainerRemainingDays(
        trainerRemainingDays,
        session_days,
        extendedTrainer
      );
      return days;
    } catch (error) {
      console.error("Error fetching remaining days:", error);
    }
  };

  try {
    const response = await instance.get(`/api/user_all_status/`);
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
        // end get the reamining days

        // get free trainiers remaining days
        const getTrainersRemainingDays = await remainingDays(
          // user.usersubscription.date_subscribed,
          user.usersubscription.trainer_date_started,
          "personal_training_day",
          user.usersubscription.subscription.personal_training_session
        );
        //end get trainers remaining days

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

        //  get exnteded trainer data
        const getExtendedTrainerData = await extendedTrainerData(
          user.usersubscription.id
        );

        // fetch trainer default days and extended remaining days
        const extendedTr2 = await fetchTrainerRemainingDays(
          getTrainerRemainingDays,
          user.usersubscription?.session_days,
          getExtendedTrainerData
        );

        // final fetching
        const extendedTrainerDays = personalTrainerDaysLeft(
          user.usersubscription?.trainer,
          "trainer-remaining-days",
          getTrainersRemainingDays,
          user.usersubscription?.session_days,
          extendedTr2,
          false
        );

        return {
          ...user,
          trainerRemainingDays: getTrainersRemainingDays,
          image: imageDataUrl || "/media/image/default.jpg",
          remainingDays: formatTime(getRemainingDays, "days-left"),
          extendedSubDays: extendedSubDays,
          extendedTrainerDays: formatTime(
            extendedTrainerDays === "Expired" ? 0 : extendedTrainerDays,
            "days-only"
          ),
        }; // If imgpath is null, use default image
      })
    );

    console.log("newUser", newUser);
    return newUser;
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

export default getForRenewalUsers;
