import instance from "../others/axiosInstance";

const getSubscriptions = async () => {
  try {
    const response = await instance.get(`/api/subscription/`);
    const subscription = await response.data;

    return subscription;
  } catch (error) {
    console.error("Error fetching subscription:", error);
  }
};

export default getSubscriptions;
