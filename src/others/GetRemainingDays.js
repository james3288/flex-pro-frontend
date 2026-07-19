const remainingDays = (
  date_log,
  per,
  personal_training_session = 1,
  sub_session_days = 1,
) => {
  const baseDate = new Date(date_log);

  if (isNaN(baseDate)) {
    throw new Error("Invalid date_log provided");
  }

  const targetDate = new Date(baseDate.getTime()); // clone
  const now = Date.now();

  switch (per) {
    case "month":
      targetDate.setMonth(targetDate.getMonth() + 1);
      break;
    case "day":
      targetDate.setDate(targetDate.getDate() + sub_session_days);
      break;
    case "year":
      targetDate.setFullYear(targetDate.getFullYear() + 1);
      break;
    case "personal_training_day":
      targetDate.setDate(targetDate.getDate() + personal_training_session);
      break;
    default:
      throw new Error(`Invalid period type: ${per}`);
  }

  const daysConsume = now - baseDate.getTime();
  const subDays = targetDate.getTime() - baseDate.getTime();

  // ⚠️ Note: This is milliseconds, not actual "days".
  return subDays - daysConsume;
};

export default remainingDays;
