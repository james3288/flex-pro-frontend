import instance from "../others/axiosInstance";

const getNoActiveUsers = async () => {
  try {
    const response = await instance.get(`/api/user_all_status/`);
    const users = await response.data;
    return users.length;
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

export default getNoActiveUsers;
