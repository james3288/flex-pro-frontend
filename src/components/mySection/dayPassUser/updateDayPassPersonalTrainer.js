import instance from "../../../others/axiosInstance";

const updateDayPassPersonalTrainer = async (formData) => {
  try {
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    const response = await instance.put(
      `/api/update_daypass_personal_trainer/`,
      formData,
      config
    );

    // Refresh the page
    window.location.reload();
  } catch (error) {
    console.error("Error updating day pass perosnal trainer data:", error);
  }
};

export default updateDayPassPersonalTrainer;
