import React, { useEffect, useState, useMemo } from "react";
import getTrainerRemainingDays from "@getData/getTrainerRemainingDays";
import personalTrainerDaysLeft from "@getData/personalTrainerDaysLeft";
import formatTime from "@others/ReadableFormatTime";

const useTrainerRemainingDays = ({
  trainerRemainingDays,
  session_days,
  extendedTrainer,
  trainers,
  fontSize = "14px",
  color = "orange",
  lineHeight = "18px",
}) => {
  const [extendedTrainerRemainingDays, setExtendedTrainerRemainingDays] =
    useState(null);

  useEffect(() => {
    let isActive = true; // prevent memory leaks if unmounted

    (async () => {
      try {
        const days = await getTrainerRemainingDays(
          trainerRemainingDays,
          session_days,
          extendedTrainer
        );

        if (isActive) setExtendedTrainerRemainingDays(days);
      } catch (error) {
        console.error("Error fetching remaining days:", error);
        if (isActive) setExtendedTrainerRemainingDays(null);
      }
    })();

    return () => {
      isActive = false;
    };
  }, [trainerRemainingDays, session_days, extendedTrainer]);

  // Derived value memoization
  const FREE_TRAINER_DAYS_LEFT = useMemo(
    () =>
      personalTrainerDaysLeft(
        trainers,
        "trainer-remaining-days",
        trainerRemainingDays,
        session_days,
        extendedTrainerRemainingDays,
        false
      ),
    [trainers, trainerRemainingDays, session_days, extendedTrainerRemainingDays]
  );

  // Memoize styles to avoid reallocation
  const headingStyle = useMemo(
    () => ({ fontSize, color, lineHeight }),
    [fontSize, color, lineHeight]
  );

  const TrainerRemainingDaysLeftComponent = useMemo(() => {
    return () => (
      <h3 style={headingStyle}>
        {FREE_TRAINER_DAYS_LEFT === "N/A"
          ? "N/A"
          : formatTime(FREE_TRAINER_DAYS_LEFT, "days-hours-minutes")}
      </h3>
    );
  }, [FREE_TRAINER_DAYS_LEFT, headingStyle]);

  return {
    TrainerRemainingDaysLeftComponent,
    personalTrainerDaysLeft: FREE_TRAINER_DAYS_LEFT,
  };
};

export default useTrainerRemainingDays;
