import React, { useEffect, useState, useCallback, useMemo } from "react";
import personalTrainerDaysLeft from "../../../getData/personalTrainerDaysLeft";
import FormatDate from "../../../others/FormatDate";
import formatTime from "../../../others/ReadableFormatTime";
import TrainerRemainingDays from "./TrainerRemainingDays";
import getExtendedTrainer from "../../../getData/getExtendedTrainer";

/* Small presentational components kept top-level so they are not re-created per render */
const AddButton = React.memo(
  ({ label, className, onClick, target = "#addTrainerModal" }) => (
    <button
      className={className}
      style={{
        padding: "3px 10px",
        marginRight: "5px",
        marginBottom: "5px",
        width: "100%",
      }}
      onClick={onClick}
      data-toggle="modal"
      data-target={target}
      data-whatever="@mdo"
      type="button"
    >
      {label}
    </button>
  )
);

const RecyleBinIcon = React.memo(() => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    className="bi bi-trash"
    viewBox="0 0 16 16"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
  </svg>
));

const isExtendedTrainerExpired = (extendRemainingDays) =>
  extendRemainingDays <= 0
    ? "Expired"
    : formatTime(extendRemainingDays, "days-hours");

/* Move ExtendedTrainerDetails out of parent component so React.memo works */
const ExtendedTrainerDetails = React.memo(
  ({ trainersName, dateExtended, extendRemainingDays }) => {
    return (
      <div>
        <span className="fs-4!">{trainersName}</span> -{" "}
        {FormatDate(dateExtended)} {" - "}
        <span style={{ color: "yellowgreen" }}>
          {isExtendedTrainerExpired(extendRemainingDays)}
        </span>
      </div>
    );
  }
);

/* Main exported component — kept name and export unchanged */
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

  /* Stable callbacks to avoid re-creating on each render */
  const handleRemoveExtendedTrainer = useCallback(
    (id) => {
      setModalTitle("Remove Extended Trainers");
      setExtendedTrainerId(id);
    },
    [setModalTitle, setExtendedTrainerId]
  );

  const handleUpdateExtendedTrainer = useCallback(
    (id) => {
      setModalTitle("Update Extended Trainer");
      setExtendedTrainerId(id);
    },
    [setModalTitle, setExtendedTrainerId]
  );

  const handleAddPersonalTrainers = useCallback(() => {
    setModalTitle("Add Personal Trainers");
    setUserSubscriptionId(subscriptionId);
  }, [setModalTitle, setUserSubscriptionId, subscriptionId]);

  const handleExtendPersonalTrainers = useCallback(() => {
    setModalTitle("Extend Personal Trainers");
    setUserSubscriptionId(subscriptionId);
  }, [setModalTitle, setUserSubscriptionId, subscriptionId]);

  /* memoize derived display text to prevent re-computation if inputs don't change */
  const freeTrainerDisplay = useMemo(() => {
    const name = trainers ? trainers.toUpperCase() : "";
    const remaining = personalTrainerDaysLeft(
      trainers,
      "remaining-days",
      trainerRemainingDays,
      session_days
    );
    const started = trainers ? ` - ${FormatDate(trainer_date_started)}` : "";
    return `${name} - (${remaining})${started}`;
    // If personalTrainerDaysLeft is expensive, memoization helps.
  }, [trainers, trainerRemainingDays, session_days, trainer_date_started]);

  /* Fetch extended trainer — safe cancellation */
  useEffect(() => {
    let cancelled = false;

    const fetchExtendedTrainer = async () => {
      try {
        const data = await getExtendedTrainer(user_id);
        if (!cancelled) {
          setExtendedTrainer(data || []);
        }
      } catch (error) {
        if (!cancelled) {
          console.error("Error in fetchExtendedTrainer:", error);
        }
      }
    };

    if (user_id != null) {
      fetchExtendedTrainer();
    } else {
      setExtendedTrainer([]);
    }

    return () => {
      cancelled = true;
    };
  }, [user_id]);

  return (
    <>
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

      {/* FREE PERSONAL TRAINER */}
      <h5>Free Personal Trainer:</h5>
      <h4 style={{ color: "pink" }}>{freeTrainerDisplay}</h4>

      {/* EXTENDED TRAINERS */}
      <h5 style={{ color: "white" }}>Extended Personal Trainer:</h5>
      {extendedTrainer?.map((extended) => (
        <div
          key={extended.id}
          style={{
            display: "flex",
            alignItems: "flex-start",
            marginBottom: "4px",
          }}
        >
          {extended.PT > 0 && (
            /* Using button for action semantics; on click we open addTrainerModal and set the id for update */
            <>
              <button
                type="button"
                className="extendedTrainer"
                data-toggle="modal"
                data-target="#addTrainerModal"
                data-whatever="@mdo"
                onClick={() => handleUpdateExtendedTrainer(extended.id)}
                style={{
                  background: "transparent",
                  border: "none",
                  padding: 0,
                  textAlign: "left",
                  width: "100%",
                }}
              >
                <ExtendedTrainerDetails
                  trainersName={extended.trainer?.name || ""}
                  dateExtended={extended.date_extend}
                  extendRemainingDays={extended.PT}
                />
              </button>

              <button
                className="removeExtendedTrainer"
                data-toggle="modal"
                data-target="#removeExtendedSubModal"
                data-whatever="@mdo"
                onClick={() => handleRemoveExtendedTrainer(extended.id)}
                type="button"
                aria-label={`Remove extended trainer ${extended.trainer?.name}`}
                style={{
                  background: "transparent",
                  border: "none",
                  padding: 0,
                  marginLeft: 8,
                }}
              >
                <RecyleBinIcon />
              </button>
            </>
          )}
        </div>
      ))}

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
