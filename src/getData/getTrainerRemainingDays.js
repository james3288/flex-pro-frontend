import formatTime from "../others/ReadableFormatTime";

const getTrainerRemainingDays = (trainerRemainingDays, session_days) => {
  
  let result = formatTime(trainerRemainingDays, "days-only") + session_days;
  //   console.log(result);
  return result;
};

export default getTrainerRemainingDays;
