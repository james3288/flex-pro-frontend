import instance from "../others/axiosInstance";

const getDayPassUserOnline = async (dateLog) => {
  try {
    const response = await instance.get(
      `/api/daypass_user_online_by_date/${dateLog}`
    );
    const users = response.data;

    // No need for async or Promise.all if no async work is done
    const newUser = users.map((user) => ({ ...user }));

    return newUser;
  } catch (error) {
    console.error("Error fetching users:", error);
    return []; // fallback to empty array to prevent downstream errors
  }
};

export default getDayPassUserOnline;
