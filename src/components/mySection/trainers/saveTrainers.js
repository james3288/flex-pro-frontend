import instance from "../../../others/axiosInstance";

// LOGOUT FUNCTION
const SaveTrainers = async (formData) => {
  try {
    const response = await instance.post(`/api/save_trainers/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response.data);
  } catch (error) {
    console.error("Error updating data:", error);
  }
};

export default SaveTrainers;
