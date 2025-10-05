import instance from "@others/axiosInstance";
import getImagePath from "@getData/getImagePath";
import loadImageData from "@getData/loadImageData";

const getUsers = async () => {
  try {
    const response = await instance.get(`/api/users/`);
    const users = response.data;

    const newUser = await Promise.all(
      users.map(async (user) => {
        try {
          const imgpath = await getImagePath(user.flex_pro_user.id);

          let imageDataUrl = null;
          if (imgpath?.image1) {
            // Use object URL instead of base64 for performance
            imageDataUrl = await loadImageData(imgpath.image1);
          }

          return {
            ...user,
            image: imageDataUrl || "/media/image/default.jpg",
          };
        } catch (err) {
          console.error(
            `Error loading image for user ${user.flex_pro_user.id}:`,
            err
          );
          return {
            ...user,
            image: "/media/image/default.jpg",
          };
        }
      })
    );

    return newUser;
  } catch (error) {
    console.error("Error fetching users:", error);
    return []; // safer default instead of undefined
  }
};

export default getUsers;
