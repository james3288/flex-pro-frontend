import formatTime from "../others/ReadableFormatTime";

const getTrainerRemainingDays = (
  trainerRemainingDays,
  session_days,
  extendedTrainer
) => {
  let result = formatTime(trainerRemainingDays, "days-only") + session_days;
  //   console.log(result);

  let extendedSession = 0;
  extendedTrainer?.map(
    (extend) => (extendedSession += extend.extended_session_day)
  );
  return result + extendedSession;
};

export default getTrainerRemainingDays;
