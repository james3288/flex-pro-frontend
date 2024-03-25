import instance from "../others/axiosInstance";

const getSpecificExtendedTrainer = async (id) => {
  try {
    const response = await instance.get(
      `/api/get_specific_extended_trainer/${id}`
    );
    const specificExtendedSubscription = await response.data;

    return specificExtendedSubscription;
  } catch (error) {
    console.error("Error fetching extended Trainer:", error);
  }
};

export default getSpecificExtendedTrainer;
