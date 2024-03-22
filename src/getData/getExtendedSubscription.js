import instance from "../others/axiosInstance";

const getExtendedSubscription = async (id) => {
  try {
    const response = await instance.get(`/api/get_extended_subscription/${id}`);
    const extendedSubscription = await response.data;

    return extendedSubscription;
  } catch (error) {
    console.error("Error fetching extendedSubscription:", error);
  }
};

export default getExtendedSubscription;
