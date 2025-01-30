import instance from "../../../others/axiosInstance";

// LOGOUT FUNCTION
const UserLogout = async (timeIn, user_online_id) => {
  console.log(user_online_id);
  const logout_date = new Date();

  instance
    .put(`/api/user_time_record_update/${user_online_id}`, {
      time_in: timeIn,
      time_out: logout_date,
    })
    .then((response) => {
      console.log("logout successfully:", response.data);
      return response.data;
      // setTriggerLogout((prev) => !prev);
      // Optionally, you can update your state or perform additional actions
    })
    .catch((error) => {
      console.error("Error updating data:", error);
    });
};

export default UserLogout;
