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
    <p style={{ fontSize: "24px", color: "yellowgreen" }}>
      {" "}
      {FREE_TRAINER_DAYS_LEFT === "N/A"
        ? "N/A"
        : formatTime(FREE_TRAINER_DAYS_LEFT, "days-hours-minutes")}
    </p>
  );
};

export default TrainerRemainingDays;
