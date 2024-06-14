const remainingDays = async (
  date_log,
  per,
  personal_training_session = 1,
  sub_session_days = 1
) => {
  const dateLogObj = new Date(date_log);
  const dateLogObj1 = new Date(date_log);
  const now = new Date();

  if (per === "month") {
    dateLogObj1.setMonth(dateLogObj1.getMonth() + 1); // Add 1 month
  } else if (per === "day") {
    dateLogObj1.setDate(dateLogObj1.getDate() + sub_session_days); // add 1 day
  } else if (per === "year") {
    dateLogObj1.setFullYear(dateLogObj1.getFullYear() + 1); // add 1 year
  } else if (per === "personal_training_day") {
    dateLogObj1.setDate(dateLogObj1.getDate() + personal_training_session); //add  days
  }

  const daysConsume = now.getTime() - dateLogObj.getTime();
  const subDays = dateLogObj1.getTime() - dateLogObj.getTime();
  return subDays - daysConsume;
};

export default remainingDays;
