import instance from "../others/axiosInstance";
import remainingDays from "../others/GetRemainingDays";

// { dateFrom, dateTo, trainer, user }
const getExtendedTrainer = async (user_id) => {
  try {
    console.log(user_id);
    const dateTo = new Date();
    dateTo.setDate(dateTo.getDate() + 1);

    const dateFrom = new Date(2024, 1, 1);
    const formattedDateFrom = dateFrom.toISOString().split("T")[0];
    const formattedDateTo = dateTo.toISOString().split("T")[0];

    const response = await instance.get(
      `/api/get_extended_trainer_report2/?dateFrom=${formattedDateFrom}&dateTo=${formattedDateTo}&user_id=${user_id}`
    );
    const extendedTrainer = await response.data;

    const PT = async (trainer_date_started, personal_training_session) => {
      // get free trainiers remaining days
      const getTrainersRemainingDays = await remainingDays(
        trainer_date_started,
        "personal_training_day",
        personal_training_session
      );

      return getTrainersRemainingDays;
    };

    //end get trainers remaining days

    const newExtendedTrainer = await Promise.all(
      extendedTrainer.map(async (extend) => {
        return {
          ...extend,
          PT: await PT(extend.date_extend, extend.extended_session_day),
        }; // If imgpath is null, use default image
      })
    );

    return newExtendedTrainer;
  } catch (error) {
    console.error("Error fetching extendedTrainer:", error);
  }
};

export default getExtendedTrainer;
