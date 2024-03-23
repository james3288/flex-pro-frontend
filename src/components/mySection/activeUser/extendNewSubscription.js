import instance from "../../../others/axiosInstance";

const extendNewSubscription = async (formData) => {
  try {
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    const response = await instance.post(
      `/api/extend_subscription/`,
      formData,
      config
    );
    console.log(response.data);
    // Refresh the page
    window.location.reload();
  } catch (error) {
    console.error("Error added new subscription data:", error);
  }
};

export default extendNewSubscription;
