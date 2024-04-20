import instance from "../others/axiosInstance";

const getSpecificUserSubscription = async (id) => {
  try {
    const response = await instance.get(
      `/api/get_specific_userSubscription/${id}`
    );
    const specificUserSubscription = await response.data;

    return specificUserSubscription;
  } catch (error) {
    console.error("Error fetching user Subscription:", error);
  }
};

export default getSpecificUserSubscription;
