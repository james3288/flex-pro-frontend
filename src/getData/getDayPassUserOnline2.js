import instance from "../others/axiosInstance";

const getDayPassUserOnline2 = async (id) => {
  try {
    const response = await instance.get(`/api/daypass_user_online/${id}`);
    const users = response.data;

    const newUser = await Promise.all(
      users.map(async (user) => {
        return {
          ...user,
        }; // If imgpath is null, use default image
      }),
    );

    return newUser;
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

export default getDayPassUserOnline2;
