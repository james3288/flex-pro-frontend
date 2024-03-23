import instance from "../../../others/axiosInstance";

const updateExtendSubscription = async (formData) => {
  try {
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    const response = await instance.put(
      `/api/update_extend_subscription/`,
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

export default updateExtendSubscription;
