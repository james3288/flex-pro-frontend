import instance from "../others/axiosInstance";
import remainingDays from "../others/GetRemainingDays";

// Fetch extended trainer data
const getExtendedTrainer = async (user_id) => {
  try {
    const now = new Date();
    const dateTo = new Date(now.getTime() + 24 * 60 * 60 * 1000); // add 1 day
    const dateFrom = new Date(2024, 1, 1); // Feb 1, 2024

    const formattedDateFrom = dateFrom.toISOString().split("T")[0];
    const formattedDateTo = dateTo.toISOString().split("T")[0];

    const response = await instance.get(
      `/api/get_extended_trainer_report2/?dateFrom=${formattedDateFrom}&dateTo=${formattedDateTo}&user_id=${user_id}`
    );
    const extendedTrainer = response.data || [];

    // Compute PT days in parallel
    const newExtendedTrainer = await Promise.all(
      extendedTrainer.map(async (extend) => ({
        ...extend,
        PT: remainingDays(
          extend.date_extend,
          "personal_training_day",
          extend.extended_session_day
        ),
      }))
    );

    return newExtendedTrainer;
  } catch (error) {
    console.error("Error fetching extendedTrainer:", error);
    return []; // return safe fallback
  }
};

export default getExtendedTrainer;
