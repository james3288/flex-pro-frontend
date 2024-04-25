import React from "react";
import formatTime from "../others/ReadableFormatTime";

const trd = (trainerRemainingDays, session_days) => {
  return formatTime(trainerRemainingDays, "days-only") + session_days + 1;
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

  const TRDAYS = trd(trainerRemainingDays, session_days);

  const FINAL_RESULT = (result, option) => {
    if (option === "free-trainer") {
      let calc = result < 0 ? 0 : result;

      return "EXPIRED";
    } else if (option === "extended-trainer") {
      // return formatTime(result, "days-only");
      return result;
    }
  };

  if (option === "trainer-remaining-days") {
    // const result = trainers == null ? "N/A" : "- Expired";
    const trdays = trainerRemainingDays === undefined ? 0 : TRDAYS;

    // check sa og ang 3 days nga free expire na ba
    let totalFreeTrainingDaysLeft = 0;
    let totalExtendedTrainingDaysLeft = 0;
    let grandTotalTrainingDaysLeft = 0;

    // if less than 0 it means expire na ang days nga free training
    if (trdays <= 0) {
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
        ? formatTime(grandTotalTrainingDaysLeft, "days-hours") // with format example: 2 days, 2 hours
        : grandTotalTrainingDaysLeft; //without format example: 1,3,5,6,7....

    return grandTotalTrainingDaysLeft <= 0 // if total training days is less than 0
      ? trainers == null // if trainer is null
        ? "N/A"
        : // if trainer is not null
          //FINAL_RESULT(result, "free-trainer")
          "N/A"
      : FINAL_RESULT(result, "extended-trainer"); // if total training days is greater than 0
  } else if (option === "remaining-days") {
    const result =
      trainers == null
        ? "N/A"
        : TRDAYS <= 0 // if free training days is less than 0 it means expired
        ? "Free Training Expired"
        : `${TRDAYS} ${TRDAYS > 1 ? "days" : "day"} left`; // if free training days is greater than 0

    return result;
  }
};

export default personalTrainerDaysLeft;
