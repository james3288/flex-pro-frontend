import remainingDays from "../others/GetRemainingDays";
import formatTime from "../others/ReadableFormatTime";
import instance from "../others/axiosInstance";
import getImagePath from "./getImagePath";
import loadImageData from "./loadImageData";

const getForRenewalUsers = async () => {
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

        // get trainiers remaining days
        const getTrainersRemainingDays = await remainingDays(
          user.usersubscription.date_subscribed,
          "personal_training_day",
          user.usersubscription.subscription.personal_training_session
        );
        //end get trainers remaining days

        return {
          ...user,
          trainerRemainingDays: getTrainersRemainingDays,

          image: imageDataUrl || "/media/image/default.jpg",
          remainingDays: formatTime(getRemainingDays, "days-left"),
        }; // If imgpath is null, use default image
      })
    );
    console.log(newUser);
    return newUser;
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

export default getForRenewalUsers;
