import React from "react";
import instance from "../others/axiosInstance";
import getImagePath from "../getData/getImagePath";
import remainingDays from "../others/GetRemainingDays";
import loadImageData from "../getData/loadImageData";

const useGetActiveUsers = () => {
  const refactorActiveUsers = async (users) => {
    const newUser = await Promise.all(
      users.slice(0, 5).map(async (user) => {
        const flexProUserId = user.usersubscription.flexprouser?.id ?? 0;
        const date_subscribed = user.usersubscription.date_subscribed;
        const per = user.usersubscription.subscription.per.per;
        const personal_training_session =
          user.usersubscription.subscription.personal_training_session;

        // Call getImagePath asynchronously for each user
        const imgpath = await getImagePath(flexProUserId);

        // get the remaining days
        const getRemainingDays = await remainingDays(date_subscribed, per);
        // end get the reamining days

        // get trainiers remaining days
        const getTrainersRemainingDays = await remainingDays(
          date_subscribed,
          "personal_training_day",
          personal_training_session
        );

        //end get trainers remaining days
        const imageDataUrl = await loadImageData(imgpath?.image1);

        return {
          ...user,
          trainersRemainingDays: getTrainersRemainingDays,
          image: imageDataUrl || "/media/image/default.jpg",
        };
      })
    );

    return newUser;
  };

  const getActiveUsers = async () => {
    try {
      const response = await instance.get(`/api/user_all_status_top5/`);
      const users = response.data;

      //refactor active users
      const refactoredActiveUsers = await refactorActiveUsers(users);
      return refactoredActiveUsers;
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  return { getActiveUsers };
};

export default useGetActiveUsers;
