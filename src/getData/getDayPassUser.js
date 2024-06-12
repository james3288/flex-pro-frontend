import instance from "../others/axiosInstance";
import { useDayPassStore } from "../store/useDayPassStore";

const getDaypassUser = async () => {
  try {
    const response = await instance.get(`/api/get_daypass_user/`);
    const users = response.data;

    const newUser = await Promise.all(
      users.map(async (user) => {
        // Call getImagePath asynchronously for each user

        return {
          ...user,
        }; // If imgpath is null, use default image
      })
    );

    // console.log("activeUsers", newUser);
    console.log("hehehe", newUser);
    return newUser;
  } catch (error) {
    console.error("Error fetching day pass users:", error);
  }
};

export default getDaypassUser;
