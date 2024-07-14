import instance from "../others/axiosInstance";

const getSpecificExtendedSubscription = async (id) => {
  try {
    if (id == 0) {
      return null;
    } else {
      const response = await instance.get(
        `/api/get_specific_extended_subscription/${id}`
      );
      const specificExtendedSubscription = await response.data;

      return specificExtendedSubscription;
    }
  } catch (error) {
    console.error("Error fetching extendedSubscription:", error);
  }
};

export default getSpecificExtendedSubscription;
