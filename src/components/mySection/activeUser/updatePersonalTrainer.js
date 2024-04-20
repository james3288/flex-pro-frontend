import instance from "../../../others/axiosInstance";

const updatePersonalTrainer = async (formData) => {
  try {
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    const response = await instance.put(
      `/api/update_user_subscription_trainer/`,
      formData,
      config
    );

    // Refresh the page
    window.location.reload();
  } catch (error) {
    console.error("Error updating data:", error);
  }
};

export default updatePersonalTrainer;
