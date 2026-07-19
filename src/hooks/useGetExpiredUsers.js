import instance from "../others/axiosInstance";
import getImagePath from "../getData/getImagePath";
import remainingDays from "../others/GetRemainingDays";
import loadImageData from "../getData/loadImageData";

const useGetExpiredUsers = () => {
  const refactorExpiredUsers = async (users) => {
    const newUser = await Promise.all(
      users.map(async (user) => {
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

  const getExpiredUsers = async ({ page = 1, pageSize = 10 }) => {
    try {
      const response = await instance.get(
        `/api/get_expired_users_today/?page=${page}&page_size=${pageSize}`
      );
      const { users, hasMore } = response.data;

      const refactoredExpiredUsers = await refactorExpiredUsers(users);

      return { users: refactoredExpiredUsers, hasMore };
    } catch (error) {
      console.error("Error fetching users:", error);
      return { users: [], hasMore: false };
    }
  };
  return { getExpiredUsers };
};

export default useGetExpiredUsers;
