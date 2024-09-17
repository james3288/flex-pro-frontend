import remainingDays from "../others/GetRemainingDays";
import instance from "../others/axiosInstance";
import getImagePath from "./getImagePath";
import loadImageData from "./loadImageData";

const getActiveAndInactiveUsers = async () => {
  try {
    const response = await instance.get(`/api/user_all_status_for_login_user/`);
    const users = response.data;

    const newUser = await Promise.all(
      users.map(async (user) => {
        // Call getImagePath asynchronously for each user
        const imgpath = await getImagePath(
          user.usersubscription.flexprouser?.id === null
            ? 0
            : user.usersubscription.flexprouser?.id
        );

        // // get the remaining days
        // const getRemainingDays = await remainingDays(
        //   user.usersubscription.date_subscribed,
        //   user.usersubscription.subscription.per.per
        // );
        // // end get the reamining days

        // get free trainiers remaining days
        const getTrainersRemainingDays = await remainingDays(
          user.usersubscription.trainer_date_started,
          "personal_training_day",
          user.usersubscription.subscription.personal_training_session
        );
        //end get trainers remaining days

        const imageDataUrl = await loadImageData(imgpath?.image1);

        return {
          ...user,
          trainersRemainingDays: getTrainersRemainingDays,
          image: imageDataUrl || "/media/image/default.jpg",
        }; // If imgpath is null, use default image
      })
    );

    // console.log("activeUsers", newUser);

    return newUser;
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

export default getActiveAndInactiveUsers;
