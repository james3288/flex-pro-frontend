import { useState } from "react";
import remainingDays from "../others/GetRemainingDays";
import formatTime from "../others/ReadableFormatTime";

const getTrainerRemainingDays = async (
  trainerRemainingDays,
  session_days,
  extendedTrainer
) => {
  // let result = formatTime(trainerRemainingDays, "days-only") + session_days;

  let extendedSession = 0;
  let result = 0;

  if (extendedTrainer && Array.isArray(extendedTrainer)) {
    await Promise?.all(
      extendedTrainer.map(async (extend, index) => {
        extendedSession += await remainingDays(
          extend.date_extend,
          "personal_training_day",
          extend.extended_session_day
        );

        result += extendedSession >= 0 && extendedSession;
      })
    );
  } else {
    console.error("extendedTrainer is not defined or is not an array.");
  }

  return result;
};

export default getTrainerRemainingDays;
