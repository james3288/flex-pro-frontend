import React, { useEffect, useState } from "react";
import personalTrainerDaysLeft from "@getData/personalTrainerDaysLeft";
import FormatDate from "@others/FormatDate";
import formatTime from "@others/ReadableFormatTime";
import TrainerRemainingDays from "@components/mySection/forRenewal/TrainerRemainingDays"; //"./TrainerRemainingDays";
import getExtendedTrainer from "@getData/getExtendedTrainer";
import useTrainerRemainingDays from "../hooks/useTrainerRemainingDays";

const PersonalTrainerComponent = ({
  trainers,
  trainerRemainingDays,
  session_days,
  user_id,
  id,
  fontSize = "18px",
  fontColor = "orange",
}) => {
  const [extendedTrainer, setExtendedTrainer] = useState([]);
  const [totalFreeTrainerLeft, setTotalFreeTrainerLeft] = useState(0);

  // get extended trainer
  useEffect(() => {
    const extended = async () => {
      try {
        const data = await getExtendedTrainer(user_id);

        setExtendedTrainer(data);
      } catch (error) {
        console.error("Error in fetchData:", error);
      }
    };

    extended();
  }, [id]);

  const { TrainerRemainingDaysLeftComponent } = useTrainerRemainingDays({
    trainerRemainingDays: trainerRemainingDays,
    session_days: session_days,
    extendedTrainer: extendedTrainer,
    trainers: trainers,
  });

  return (
    <>
      {/* TRAINER REMAINING DAYS
      <h3 style={{ color: "white", fontSize: "16px" }}>
        Extended Trainer Remaning Days:
      </h3>
      {extendedTrainer?.length > 0 ? (
        <TrainerRemainingDaysLeftComponent />
      ) : (
        <h4 style={{ fontSize: "18px", color: "orange" }}>N/A</h4>
      )} */}

      <h5 style={{ fontSize: "16px" }}>Extended Trainer Remaning Days:</h5>
      <TrainerRemainingDaysLeftComponent />
    </>
  );
};

export default PersonalTrainerComponent;
