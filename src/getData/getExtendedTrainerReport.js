import instance from "../others/axiosInstance";
import remainingDays from "../others/GetRemainingDays";

const PT = (trainer_date_started, personal_training_session) => {
  // Return promise directly
  return remainingDays(
    trainer_date_started,
    "personal_training_day",
    personal_training_session
  );
};

const getExtendedTrainerReport = async (dateFrom, dateTo, trainer) => {
  try {
    // Fetch both reports in parallel
    const [response1, response2] = await Promise.all([
      instance.get(
        `/api/get_extended_trainer_report/?dateFrom=${dateFrom}&dateTo=${dateTo}&trainer=${trainer}`
      ),
      instance.get(
        `/api/get_daypass_subscription_report/?dateFrom=${dateFrom}&dateTo=${dateTo}&trainer=${trainer}`
      ),
    ]);

    const data = response1.data || [];
    const data2 = response2.data || [];

    // Process extended trainer report in parallel
    const extendedUsers = await Promise.all(
      data.map(async (item) => {
        const pt = await PT(item.date_extend, item.extended_session_day);
        return {
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
          PT: pt,
        };
      })
    );

    // Process daypass report in parallel
    const daypassUsers = await Promise.all(
      data2
        .filter(
          (user) =>
            user?.personal_trainer != null &&
            user?.personal_trainer?.name
              ?.toUpperCase()
              .includes(trainer.toUpperCase())
        )
        .map(async (item) => {
          const pt = await PT(item.date_subscribed, 1);
          return {
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
            PT: pt,
          };
        })
    );

    // Combine and sort by date descending
    return [...extendedUsers, ...daypassUsers].sort(
      (a, b) => new Date(b.date_extend) - new Date(a.date_extend)
    );
  } catch (err) {
    console.error("Error in fetching Extended Trainer Report:", err);
    return [];
  }
};

export default getExtendedTrainerReport;
