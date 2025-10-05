import instance from "../others/axiosInstance";
import remainingDays from "../others/GetRemainingDays";
import formatTime from "../others/ReadableFormatTime";

const PT = async (trainer_date_started, personal_training_session) => {
  // get free trainiers remaining days
  const getTrainersRemainingDays = await remainingDays(
    trainer_date_started,
    "personal_training_day",
    personal_training_session
  );

  return getTrainersRemainingDays;
};

const getExtendedTrainerReport = async (dateFrom, dateTo, trainer) => {
  try {
    const newUser = [];

    // Fetch extended trainer report
    const response = await instance.get(
      `/api/get_extended_trainer_report/?dateFrom=${dateFrom}&dateTo=${dateTo}&trainer=${trainer}`
    );
    const data = response.data;

    // Fetch daypass subscription report
    const response2 = await instance.get(
      `/api/get_daypass_subscription_report/?dateFrom=${dateFrom}&dateTo=${dateTo}&trainer=${trainer}`
    );
    const data2 = response2.data;

    // Process the extended trainer report data
    for (const item of data) {
      const object = {
        id: item.id,
        user: item.user_subscription.flexprouser.name,
        date_extend: item.date_extend,
        gym_rate_desc: item.user_subscription.subscription.gym_rate_desc,
        trainer: item?.trainer?.name,
        rate: item?.user_subscription.subscription.rate,
        category: "extended_trainer",
        extended_session_day: item?.extended_session_day,
        rate_per_session: item?.trainer?.rate_per_session,
        trainer_rate:
          item?.trainer?.rate_per_session * item?.extended_session_day,
        PT: await PT(item.date_extend, item.extended_session_day),
      };

      newUser.push(object);
    }

    // Process the daypass subscription report data
    data2
      ?.filter(
        (user) =>
          user?.personal_trainer != null &&
          user?.personal_trainer?.name
            ?.toUpperCase()
            .includes(trainer.toUpperCase())
      )
      .forEach(async (item) => {
        const object = {
          id: item.id,
          user: item.name,
          date_extend: item.date_subscribed,
          gym_rate_desc: item.subscription.gym_rate_desc,
          trainer: item?.personal_trainer?.name,
          rate: item.subscription.rate,
          category: "daypass",
          extended_session_day: 1,
          rate_per_session: item?.personal_trainer?.rate_per_session,
          trainer_rate: item?.personal_trainer?.rate_per_session * 1,
          PT: await PT(item.date_subscribed, 1),
        };

        newUser.push(object);
      });

    // Sort the users by date_extend in descending order
    const sortedUsers = newUser.sort((a, b) => {
      const dateA = new Date(a.date_extend);
      const dateB = new Date(b.date_extend);
      return dateB - dateA;
    });

    return sortedUsers;
  } catch (err) {
    console.error("Error in fetching Extended Trainer Report:", err);
  }
};

export default getExtendedTrainerReport;
