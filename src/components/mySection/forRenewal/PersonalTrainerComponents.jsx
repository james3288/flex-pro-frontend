import React, { useEffect, useState } from "react";
import personalTrainerDaysLeft from "../../../getData/personalTrainerDaysLeft";
import FormatDate from "../../../others/FormatDate";
import formatTime from "../../../others/ReadableFormatTime";
import TrainerRemainingDays from "./TrainerRemainingDays";
import getExtendedTrainer from "../../../getData/getExtendedTrainer";

const AddButton = ({
  label,
  className,
  onClick,
  target = "#addTrainerModal",
}) => (
  <button
    className={className}
    style={{ padding: "3px 10px", marginRight: "5px", marginBottom: "5px" }}
    onClick={onClick}
    data-toggle="modal"
    data-target={target}
    data-whatever="@mdo"
  >
    {label}
  </button>
);

const PersonalTrainerComponents = ({
  trainers,
  trainerRemainingDays,
  session_days,
  trainer_date_started,
  user_id,
  setExtendedTrainerId,
  subscriptionId,
  setUserSubscriptionId,
  setModalTitle,
  isExpired,
}) => {
  const [extendedTrainer, setExtendedTrainer] = useState([]);
  const [totalFreeTrainerLeft, setTotalFreeTrainerLeft] = useState(0);

  // HANDLERS
  const handleRemoveExtendedTrainer = (id) => {
    setModalTitle("Remove Extended Trainers");
    setExtendedTrainerId(id);
  };

  const handleUpdateExtendedTrainer = (id) => {
    setModalTitle("Update Extended Trainer");
    setExtendedTrainerId(id);
  };

  const handleAddPersonalTrainers = () => {
    setModalTitle("Add Personal Trainers");
    setUserSubscriptionId(subscriptionId);
  };

  const handleExtendPersonalTrainers = () => {
    setModalTitle("Extend Personal Trainers");
    setUserSubscriptionId(subscriptionId);
  };

  // Fetch extended trainer (cancel safe)
  useEffect(() => {
    let isMounted = true;
    const fetchExtendedTrainer = async () => {
      try {
        const data = await getExtendedTrainer(user_id);
        if (isMounted) setExtendedTrainer(data || []);
      } catch (error) {
        console.error("Error in fetchExtendedTrainer:", error);
      }
    };
    fetchExtendedTrainer();
    return () => {
      isMounted = false;
    };
  }, [user_id]);

  return (
    <>
      {/* FREE PERSONAL TRAINER */}
      <h5>Free Personal Trainer:</h5>
      <h4 style={{ color: "pink" }}>
        {trainers?.toUpperCase()} - (
        {personalTrainerDaysLeft(
          trainers,
          "remaining-days",
          trainerRemainingDays,
          session_days
        )}
        ){trainers ? " - " + FormatDate(trainer_date_started) : ""}
      </h4>

      {/* EXTENDED TRAINERS */}
      <h5 style={{ color: "white" }}>Extended Personal Trainer:</h5>
      {extendedTrainer?.map((extended) => (
        <div key={extended.id}>
          {extended.PT > 0 && (
            <>
              {/* REMOVE BUTTON */}
              <a
                className="removeExtendedTrainer"
                data-toggle="modal"
                data-target="#removeExtendedSubModal"
                data-whatever="@mdo"
                onClick={() => handleRemoveExtendedTrainer(extended.id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-trash"
                  viewBox="0 0 16 16"
                >
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                </svg>
              </a>

              {/* EXTENDED TRAINER ENTRY */}
              <a
                className="extendedTrainer"
                data-toggle="modal"
                data-target="#addTrainerModal"
                data-whatever="@mdo"
                onClick={() => handleUpdateExtendedTrainer(extended.id)}
              >
                {extended.trainer.name} ({extended.extended_session_day} days) -{" "}
                {FormatDate(extended.date_extend)}
                <br />
                <span style={{ color: "yellow" }}>
                  {extended.PT <= 0
                    ? "Expired"
                    : formatTime(extended.PT, "days-hours")}
                </span>
              </a>
            </>
          )}
        </div>
      ))}

      {/* TRAINER REMAINING DAYS */}
      <h5>Extended Trainer Remaining Days:</h5>
      {extendedTrainer?.length > 0 ? (
        <TrainerRemainingDays
          trainerRemainingDays={trainerRemainingDays}
          session_days={session_days}
          extendedTrainer={extendedTrainer}
          trainers={trainers}
          totalFreeTrainerLeft={totalFreeTrainerLeft}
          setTotalFreeTrainerLeft={setTotalFreeTrainerLeft}
        />
      ) : (
        <h4 style={{ fontSize: "20px", color: "orange" }}>N/A</h4>
      )}

      {/* BUTTONS */}
      {!isExpired && (
        <div>
          <AddButton
            label="Free Personal Trainer"
            className="btn btn-primary"
            onClick={handleAddPersonalTrainers}
          />
          <AddButton
            label="Extend Personal Trainer"
            className="btn btn-success"
            onClick={handleExtendPersonalTrainers}
          />
        </div>
      )}
    </>
  );
};

export default PersonalTrainerComponents;
