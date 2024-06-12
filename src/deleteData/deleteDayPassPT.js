import instance from "../others/axiosInstance";

const deleteDayPassPT = async (formData) => {
  try {
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    const response = await instance.put(
      `/api/update_daypass_personal_trainer_to_null/`,
      formData,
      config
    );

    // Refresh the page
    window.location.reload();
  } catch (error) {
    console.error("Error updating day pass perosnal trainer data:", error);
  }
};

export default deleteDayPassPT;
