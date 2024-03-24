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
  const [remainingDays, setRemainingDays] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const days = await getTrainerRemainingDays(
          trainerRemainingDays,
          session_days,
          extendedTrainer
        );
        setRemainingDays(days);
      } catch (error) {
        console.error("Error fetching remaining days:", error);
      }
    };

    fetchData();
  }, [trainerRemainingDays, session_days, extendedTrainer]);

  return (
    <h4>
      {" "}
      {remainingDays !== null
        ? remainingDays < 2
          ? personalTrainerDaysLeft(trainers, "trainer-remaining-days")
          : `(${formatTime(remainingDays, "days-hours")})`
        : "Loading..."}
    </h4>
  );
};

export default TrainerRemainingDays;
