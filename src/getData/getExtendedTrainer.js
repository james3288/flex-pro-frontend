import instance from "../others/axiosInstance";

const getExtendedTrainer = async (id) => {
  try {
    const response = await instance.get(`/api/get_extended_trainer/${id}`);
    const extendedTrainer = await response.data;

    return extendedTrainer;
  } catch (error) {
    console.error("Error fetching extendedTrainer:", error);
  }
};

export default getExtendedTrainer;
