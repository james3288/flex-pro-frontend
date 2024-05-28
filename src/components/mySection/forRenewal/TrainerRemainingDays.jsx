import React, { useEffect, useState } from "react";
import getTrainerRemainingDays from "../../../getData/getTrainerRemainingDays";
import personalTrainerDaysLeft from "../../../getData/personalTrainerDaysLeft";
import formatTime from "../../../others/ReadableFormatTime";

const TrainerRemainingDays = ({
  trainerRemainingDays,
  session_days,
  extendedTrainer,
  trainers,
}) => {
  // const [remainingDays, setRemainingDays] = useState(null);
  const [extendedTrainerRemainingDays, setExtendedTrainerRemainingDays] =
    useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const days = await getTrainerRemainingDays(
          trainerRemainingDays,
          session_days,
          extendedTrainer
        );
        setExtendedTrainerRemainingDays(days);
      } catch (error) {
        console.error("Error fetching remaining days:", error);
      }
    };

    fetchData();
  }, [trainerRemainingDays, session_days, extendedTrainer]);

  //false means whole number of days
  const FREE_TRAINER_DAYS_LEFT = personalTrainerDaysLeft(
    trainers,
    "trainer-remaining-days",
    trainerRemainingDays,
    session_days,
    extendedTrainerRemainingDays,
    false
  );

  return (
    <h4 style={{ fontSize: "20px", color: "orange" }}>
      {" "}
      {FREE_TRAINER_DAYS_LEFT === "N/A"
        ? "N/A"
        : // : formatTime(FREE_TRAINER_DAYS_LEFT, "days-hours-minutes") ===
          //   "0 day, 0 hour, 0 minute"
          // ? "Expired"
          formatTime(FREE_TRAINER_DAYS_LEFT, "days-hours-minutes")}
      {/* {extendedTrainerRemainingDays !== null
        ? extendedTrainerRemainingDays < 3
          ? personalTrainerDaysLeft(
              trainers,
              "trainer-remaining-days",
              trainerRemainingDays,
              session_days,
              extendedTrainerRemainingDays
            )
          : `(${formatTime(extendedTrainerRemainingDays, "days-hours")})`
        : "Loading..."} */}
    </h4>
  );
};

export default TrainerRemainingDays;
