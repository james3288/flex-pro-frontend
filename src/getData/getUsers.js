import instance from "../others/axiosInstance";
import remainingDays from "../others/GetRemainingDays";
import getImagePath from "./getImagePath";
import loadImageData from "./loadImageData";

const getUsers = async () => {
  try {
    const response = await instance.get(`/api/users/`);
    const users = response.data;

    const newUser = await Promise.all(
      users.map(async (user) => {
        // Call getImagePath asynchronously for each user
        const imgpath = await getImagePath(user.flex_pro_user.id);
        const imageDataUrl = await loadImageData(imgpath.image1);

        return {
          ...user,
          image: imageDataUrl || "/media/image/default.jpg",
        }; // If imgpath is null, use default image
      })
    );

    console.log("users", newUser);
    return newUser;
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

export default getUsers;
