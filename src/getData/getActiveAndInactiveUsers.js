import remainingDays from "../others/GetRemainingDays";
import instance from "../others/axiosInstance";
import getImagePath from "./getImagePath";
import loadImageData from "./loadImageData";

const apiEndpoint = `/api/user_all_status_for_login_user/`;

// Calculate remaining trainer days for a user
const getTrainerRemainingDays = (userSub) => {
  return remainingDays(
    userSub?.trainer_date_started,
    "personal_training_day",
    userSub?.subscription?.personal_training_session
  );
};

// Extract userId with safe fallback
const getUserId = (user) => {
  return user?.usersubscription?.flexprouser?.id ?? 0;
};

// Get image data URL for user (with fallback)
const getImageDataUrl = async (user) => {
  const imgpath = await getImagePath(getUserId(user));
  if (!imgpath?.image1) return "/media/image/default.jpg";

  try {
    return await loadImageData(imgpath.image1);
  } catch {
    return "/media/image/default.jpg";
  }
};

// Main fetcher
const getActiveAndInactiveUsers = async () => {
  try {
    const response = await instance.get(apiEndpoint);
    const users = response.data || [];

    const newUser = await Promise.all(
      users.map(async (user) => {
        // Run image + trainer days in parallel
        const [imageDataUrl, trainersRemainingDays] = await Promise.all([
          getImageDataUrl(user),
          getTrainerRemainingDays(user?.usersubscription),
        ]);

        return {
          ...user,
          trainersRemainingDays,
          image: imageDataUrl || "/media/image/default.jpg",
        };
      })
    );

    // Debug log only if needed
    if (process.env.NODE_ENV === "development") {
      console.log("activeUsers", newUser);
    }

    return newUser;
  } catch (error) {
    console.error("Error fetching users:", error);
    return []; // safe fallback
  }
};

export default getActiveAndInactiveUsers;
