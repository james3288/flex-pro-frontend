import instance from "../../../others/axiosInstance";

// LOGOUT FUNCTION
const SaveTrainers = async (formData) => {
  try {
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    const response = await instance.post(
      `/api/save_trainers/`,
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

export default SaveTrainers;
