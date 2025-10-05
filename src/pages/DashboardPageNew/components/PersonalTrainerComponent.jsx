import { useEffect, useState } from "react";
import getExtendedTrainer from "@getData/getExtendedTrainer";
import useTrainerRemainingDays from "../hooks/useTrainerRemainingDays";

const headerStyle = { fontSize: "16px" };

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

  // Fetch extended trainer data
  useEffect(() => {
    let isMounted = true; // guard against state update on unmounted component

    const fetchExtendedTrainer = async () => {
      try {
        const data = await getExtendedTrainer(user_id);
        if (isMounted) setExtendedTrainer(data || []);
      } catch (error) {
        console.error("Error fetching extended trainer:", error);
      }
    };

    if (user_id) {
      fetchExtendedTrainer();
    }

    return () => {
      isMounted = false;
    };
  }, [user_id]);

  const { TrainerRemainingDaysLeftComponent } = useTrainerRemainingDays({
    trainerRemainingDays,
    session_days,
    extendedTrainer,
    trainers,
  });

  return (
    <>
      <h5 style={headerStyle}>Extended Trainer Remaining Days:</h5>
      <TrainerRemainingDaysLeftComponent />
    </>
  );
};

export default PersonalTrainerComponent;
