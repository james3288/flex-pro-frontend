import instance from "../../../others/axiosInstance";

const UserDayPassLogout = async (timeIn, user_online_id, setTriggerLogout) => {
  const logout_date = new Date();

  instance
    .put(`/api/daypass_time_record_update/${user_online_id}`, {
      time_in: timeIn,
      time_out: logout_date,
    })
    .then((response) => {
      console.log("logout successful:", response.data);
      setTriggerLogout((prev) => !prev);
      // Optionally, you can update your state or perform additional actions
    })
    .catch((error) => {
      console.error("Error updating data:", error);
    });
};

export default UserDayPassLogout;
