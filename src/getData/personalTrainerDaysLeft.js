import React from "react";
import formatTime from "../others/ReadableFormatTime";

const trd = (trainerRemainingDays, session_days) => {
  return formatTime(trainerRemainingDays, "days-only") + session_days;
};

const personalTrainerDaysLeft = (
  trainers,
  option,
  trainerRemainingDays,
  session_days,
  extendedTrainerRemainingDays,
  applyFormat
) => {
  // trainers == null
  // ? "N/A"
  // : "- Expired"

  if (option === "trainer-remaining-days") {
    // const result = trainers == null ? "N/A" : "- Expired";
    const trdays =
      trainerRemainingDays === undefined ? 0 : trainerRemainingDays;

    // check sa og ang 3 days nga free expire na ba
    let totalFreeTrainingDaysLeft = 0;
    let totalExtendedTrainingDaysLeft = 0;
    let grandTotalTrainingDaysLeft = 0;

    // if less than 0 it means expire na ang 3 days nga free training
    if (trdays < 0) {
      totalFreeTrainingDaysLeft += 0;

      // kwaon ang nabilin nga free training days
    } else {
      totalFreeTrainingDaysLeft += trdays;
    }

    // kwaon ang tanan total sa extended training days
    totalExtendedTrainingDaysLeft += extendedTrainerRemainingDays;

    // e add tanan ang total sa extended training days og sa free training days
    grandTotalTrainingDaysLeft =
      totalExtendedTrainingDaysLeft + totalFreeTrainingDaysLeft;

    // convert to string format or default format
    let result =
      applyFormat === true
        ? formatTime(grandTotalTrainingDaysLeft, "days-hours") + " left"
        : grandTotalTrainingDaysLeft;

    return grandTotalTrainingDaysLeft === 0
      ? trainers == null
        ? "N/A"
        : "Expired"
      : result;
  } else if (option === "remaining-days") {
    const result =
      trainers == null
        ? "N/A"
        : trd(trainerRemainingDays, session_days) + " days left";
    return result;
  }
};

export default personalTrainerDaysLeft;
