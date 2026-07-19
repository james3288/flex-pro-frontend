import formatTime from "../others/ReadableFormatTime";

// Calculate base trainer days
const trd = (trainerRemainingDays, session_days) => {
  const base = Number(formatTime(trainerRemainingDays, "days-only")) || 0;
  return base + (session_days || 0) + 1;
};

const personalTrainerDaysLeft = (
  trainers,
  option,
  trainerRemainingDays,
  session_days,
  extendedTrainerRemainingDays = 0,
  applyFormat
) => {
  const TRDAYS = trd(trainerRemainingDays, session_days);

  if (option === "trainer-remaining-days") {
    const freeDays = Math.max(
      0,
      trainerRemainingDays === undefined ? 0 : TRDAYS
    );
    const extendedDays = Number(extendedTrainerRemainingDays) || 0;
    const totalDays = freeDays + extendedDays;

    if (totalDays <= 0) {
      // No days left
      return trainers == null ? "N/A" : "N/A"; // Could be "EXPIRED" if desired
    }

    // Return formatted or raw days
    return applyFormat ? formatTime(totalDays, "days-hours") : totalDays;
  }

  if (option === "remaining-days") {
    if (trainers == null) return "N/A";

    if (TRDAYS <= 0) {
      return "Free Training Expired";
    }

    return `${TRDAYS} ${TRDAYS > 1 ? "days" : "day"} left`;
  }

  return "N/A"; // fallback for unexpected option
};

export default personalTrainerDaysLeft;
