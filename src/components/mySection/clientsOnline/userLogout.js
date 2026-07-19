import instance from "../../../others/axiosInstance";

// LOGOUT FUNCTION
const UserLogout = async (timeIn, user_online_id) => {
  try {
    const logout_date = new Date();

    const response = await instance.put(
      `/api/user_time_record_update/${user_online_id}`,
      {
        time_in: timeIn,
        time_out: logout_date,
      }
    );

    // Optional: Remove console.log in production
    console.log("Logout successfully:", response.data);

    return response.data; // Properly return to caller
  } catch (error) {
    console.error("Error updating data:", error);
    throw error; // Allow caller to handle errors
  }
};

export default UserLogout;
