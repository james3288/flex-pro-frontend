import instance from "../others/axiosInstance";

const getExtendedTrainerReport = async (dateFrom, dateTo, trainer) => {
  try {
    const newUser = [];
    const response = await instance.get(
      `/api/get_extended_trainer_report/?dateFrom=${dateFrom}&dateTo=${dateTo}&trainer=${trainer}`
    );

    const data = await response.data;

    const response2 = await instance.get(
      `/api/get_daypass_subscription_report/?dateFrom=${dateFrom}&dateTo=${dateTo}&trainer=${trainer}`
    );

    const data2 = await response2.data;

    data?.forEach((item) => {
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
      };

      newUser.push(object);
    });

    data2
      ?.filter(
        (user) =>
          user?.personal_trainer != null &&
          user?.personal_trainer?.name
            ?.toUpperCase()
            .includes(trainer.toUpperCase())
      )
      .forEach((item) => {
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
        };

        newUser.push(object);
      });

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
