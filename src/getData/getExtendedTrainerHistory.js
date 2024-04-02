import instance from "../others/axiosInstance";

const getExtendedTrainerHistory = async (id) => {
  try {
    const response = await instance.get(
      `/api/get_specific_extended_trainer2/${id}`
    );
    const extendedTrainer = await response.data;

    return extendedTrainer;
  } catch (error) {
    console.error("Error fetching extendedTrainer:", error);
  }
};

export default getExtendedTrainerHistory;
