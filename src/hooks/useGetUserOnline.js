import React from "react";
import instance from "../others/axiosInstance";
import getImagePath from "../getData/getImagePath";
import remainingDays from "../others/GetRemainingDays";
import getSubscriptionDaysLeft from "../getData/getSubscriptionDaysLeft";
import getExtendedSubscription from "../getData/getExtendedSubscription";
import loadImageData from "../getData/loadImageData";

const useGetUserOnline = () => {
  const refactorUserOnline = async (users) => {
    const newUsers = await Promise.all(
      users.slice(0, 5).map(async (user) => {
        // const flexProUserId = user.usersubscription.flexprouser?.id ?? 0;

        // const {
        //   id: userSubscriptionId,
        //   sub_session_days: subscription_session_days,
        //   date_subscribed,
        //   subscription: {
        //     personal_training_session,
        //     per: { per },
        //   },
        // } = user.usersubscription;

        const flexProUserId = user.usersubscription.flexprouser?.id ?? 0;
        const date_subscribed = user.usersubscription.date_subscribed;
        const personal_training_session =
          user.usersubscription.subscription.personal_training_session;
        const per = user.usersubscription.subscription.per.per;
        const subscription_session_days =
          user.usersubscription.sub_session_days;
        const userSubscriptionId = user.usersubscription.id;

        // Call getImagePath asynchronously for each user
        const imgpath = await getImagePath(flexProUserId);
        const imageDataUrl = await loadImageData(imgpath?.image1);

        // get trainiers remaining days
        const getTrainersRemainingDays = await remainingDays(
          date_subscribed,
          "personal_training_day",
          personal_training_session
        );
        //end get trainers remaining days

        // get the remaining days
        const getRemainingDays = await remainingDays(
          date_subscribed,
          per,
          0,
          subscription_session_days
        );

        const getExtendedSubscriptionDays = await getExtendedSubscription(
          userSubscriptionId
        );

        // get extended subscription days left and main subscription days
        const extendedSubDays = getSubscriptionDaysLeft(
          getRemainingDays,
          getExtendedSubscriptionDays,
          date_subscribed,
          true
        );

        return {
          ...user,
          trainersRemainingDays: getTrainersRemainingDays,
          image: imageDataUrl || "/media/image/default.jpg",
          extendedSubDays: extendedSubDays,
          extendedSubscriptions: getExtendedSubscriptionDays,
        };
      })
    );

    return newUsers;
  };

  const getUsersOnline = async () => {
    try {
      const response = await instance.get(`/api/user_online_top5/`);
      const users = response.data;

      //   refactor useronline
      const refactoredUserOnline = await refactorUserOnline(users);

      return refactoredUserOnline;
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  return { getUsersOnline };
};

export default useGetUserOnline;
