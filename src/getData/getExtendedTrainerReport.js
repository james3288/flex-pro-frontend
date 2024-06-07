import instance from "../others/axiosInstance";

const getExtendedTrainerReport = async (dateFrom, dateTo, trainer) => {
  try {
    const newUser = [];
    const response = await instance.get(
      `/api/get_extended_trainer_report/?dateFrom=${dateFrom}&dateTo=${dateTo}&trainer=${trainer}`
    );

    const data = await response.data;

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
      };

      newUser.push(object);
    });

    return newUser;
  } catch (err) {
    console.error("Error in fetching Extended Trainer Report:", err);
  }
};

export default getExtendedTrainerReport;
