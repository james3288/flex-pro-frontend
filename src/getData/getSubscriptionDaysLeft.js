import formatTime from "../others/ReadableFormatTime";

const MS_PER_DAY = 24 * 60 * 60 * 1000;

// Add days to a given timestamp and return formatted result
const timeStampAddDays = (timeStamp, extendedDays, daysonly) => {
  const timestamp = timeStamp + extendedDays * MS_PER_DAY;

  if (timestamp < 0) {
    return "Expired";
  }

  return daysonly === false
    ? formatTime(timestamp, "days-hours-minutes-seconds")
    : formatTime(timestamp, "days-left");
};

const getSubscriptionDaysLeft = (
  remaining,
  extendedSubscript,
  date_subscribed, // kept for compatibility, though unused
  daysOnly
) => {
  // calculate total extended session days safely
  const extendedSessionDays =
    extendedSubscript?.reduce(
      (acc, extend) => acc + (extend?.extended_session_day || 0),
      0
    ) || 0;

  // Final calculation with added extended days
  return timeStampAddDays(remaining, extendedSessionDays, daysOnly);
};

export default getSubscriptionDaysLeft;
