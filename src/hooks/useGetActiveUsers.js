import instance from "../others/axiosInstance";
import getImagePath from "../getData/getImagePath";
import remainingDays from "../others/GetRemainingDays";
import loadImageData from "../getData/loadImageData";

const useGetActiveUsers = () => {
  // Refactor users by enriching with image + remaining days
  const refactorActiveUsers = async (users) => {
    return Promise.all(
      users.map(async (user) => {
        const flexProUserId = user.usersubscription.flexprouser?.id ?? 0;
        const date_subscribed = user.usersubscription.date_subscribed;
        const per = user.usersubscription.subscription.per.per;
        const personal_training_session =
          user.usersubscription.subscription.personal_training_session;

        // ✅ ESCAPE HERE
        if (flexProUserId === 0) {
          const remaining = await remainingDays(date_subscribed, per);

          return {
            ...user,
            trainersRemainingDays: 0,
            remainingDays: remaining,
            image: "/media/image/default.jpg",
          };
        }

        // Get image path first
        const imgpath = await getImagePath(flexProUserId);

        // Run async operations in parallel
        const [trainersRemainingDays, imageDataUrl] = await Promise.all([
          remainingDays(
            date_subscribed,
            "personal_training_day",
            personal_training_session
          ),
          loadImageData(imgpath?.image1),
        ]);

        // Compute normal subscription days (likely synchronous, but kept await just in case)
        const subscriptionRemainingDays = await remainingDays(
          date_subscribed,
          per
        );

        return {
          ...user,
          trainersRemainingDays,
          remainingDays: subscriptionRemainingDays,
          image: imageDataUrl || "/media/image/default.jpg", // ✅ fallback
        };
      })
    );
  };

  // Main API fetch
  const getActiveUsers = async () => {
    try {
      const response = await instance.get(`/api/user_all_status/`);
      const users = response.data || [];
      return await refactorActiveUsers(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      return []; // ensure predictable return type
    }
  };

  return { getActiveUsers };
};

export default useGetActiveUsers;
