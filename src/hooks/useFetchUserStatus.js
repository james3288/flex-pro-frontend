import React, { useEffect, useState } from "react";
import instance from "../others/axiosInstance";
import getImagePath from "../getData/getImagePath";
import loadImageData from "../getData/loadImageData";
import remainingDays from "../others/GetRemainingDays";
import getExtendedSubscription from "../getData/getExtendedSubscription";
import getSubscriptionDaysLeft from "../getData/getSubscriptionDaysLeft";
import getExtendedTrainer from "../getData/getExtendedTrainer";

const useFetchUserStatus = () => {
  const refactorUserStatus = async (users) => {
    const newUser = await Promise.all(
      users.map(async (user) => {
        const _flexProUserId = user.usersubscription.flexprouser?.id || 0;
        const _dateSubscribed = user.usersubscription.date_subscribed;
        const _per = user.usersubscription.subscription.per.per;
        const _userSubscriptionId = user.usersubscription.id;
        const _subscription_session_days =
          user.usersubscription.sub_session_days || 1;

        // Call getImagePath asynchronously for each user
        const imgpath = await getImagePath(_flexProUserId);
        const imageDataUrl = await loadImageData(imgpath.image1);

        // get the remaining days
        const getRemainingDays = await remainingDays(
          _dateSubscribed,
          _per,
          0,
          _subscription_session_days
        );

        const getExtendedSubscriptionDays = await getExtendedSubscription(
          _userSubscriptionId
        );

        // get extended subscription days left and main subscription days
        const extendedSubDays = getSubscriptionDaysLeft(
          getRemainingDays,
          getExtendedSubscriptionDays,
          _dateSubscribed,
          false
        );

        const extendedTrainer = await getExtendedTrainer(_userSubscriptionId);

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
  };

  const fetchUserStatus = async (flexProUserId) => {
    try {
      const response = await instance.get(`/api/user_status/${flexProUserId}`);
      const users = await response.data;

      //refactor the user status
      const refactoredUserStatus = await refactorUserStatus(users);
      return refactoredUserStatus;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null; // or handle the error appropriately based on your application's needs
    }
  };

  return { fetchUserStatus };
};

export default useFetchUserStatus;
