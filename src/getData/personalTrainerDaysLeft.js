import React from "react";
import formatTime from "../others/ReadableFormatTime";

const trd = (trainerRemainingDays, session_days) => {
  return formatTime(trainerRemainingDays, "days-only") + session_days;
};

const personalTrainerDaysLeft = (
  trainers,
  option,
  trainerRemainingDays,
  session_days
) => {
  // trainers == null
  // ? "N/A"
  // : "- Expired"
  if (option === "trainer-remaining-days") {
    const result = trainers == null ? "N/A" : "- Expired";
    return result;
  } else if (option === "remaining-days") {
    const result =
      trainers == null
        ? "N/A"
        : trd(trainerRemainingDays, session_days) + " days left";
    return result;
  }
};

export default personalTrainerDaysLeft;
