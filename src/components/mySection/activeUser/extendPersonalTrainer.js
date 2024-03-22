import instance from "../../../others/axiosInstance";

const extendPersonalTrainer = async (formData) => {
  try {
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    const response = await instance.post(
      `/api/extend_personal_trainer/`,
      formData,
      config
    );
    console.log(response.data);
    // Refresh the page
    window.location.reload();
  } catch (error) {
    console.error("Error updating data:", error);
  }
};

export default extendPersonalTrainer;
