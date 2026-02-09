import React, { useEffect, useState, useCallback, useMemo } from "react";
import personalTrainerDaysLeft from "../../../getData/personalTrainerDaysLeft";
import FormatDate from "../../../others/FormatDate";
import formatTime from "../../../others/ReadableFormatTime";
import TrainerRemainingDays from "./TrainerRemainingDays";
import getExtendedTrainer from "../../../getData/getExtendedTrainer";
import DeleteIconSvg from "../../svg/deleteIconSvg";

/* ───────────── constants ───────────── */
const transparentButtonStyle = {
  background: "transparent",
  border: "none",
  padding: 0,
  width: "100%",
  textAlign: "left",
};

const iconButtonStyle = {
  background: "transparent",
  border: "none",
  padding: 0,
  marginLeft: 8,
  color: "orange",
};

/* ───────────── helpers ───────────── */
const getExtendedTrainerLabel = (days) =>
  days <= 0 ? "Expired" : formatTime(days, "days-hours");

/* ───────────── small components ───────────── */
const AddButton = React.memo(({ label, className, onClick }) => (
  <button
    className={className}
    style={{ padding: "3px 10px", marginBottom: "5px", width: "100%" }}
    onClick={onClick}
    type="button"
  >
    {label}
  </button>
));

const RecyleBinIcon = React.memo(() => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    className="bi bi-trash"
    viewBox="0 0 16 16"
    aria-hidden="true"
  >
    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1z" />
  </svg>
));

const ExtendedTrainerDetails = React.memo(
  ({ trainersName, dateExtended, extendRemainingDays }) => (
    <span>
      <strong>{trainersName}</strong> – {FormatDate(dateExtended)} –{" "}
      <span style={{ color: "yellowgreen" }}>
        {getExtendedTrainerLabel(extendRemainingDays)}
      </span>
    </span>
  ),
);

/* ───────────── main component ───────────── */
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
  setShowAddTrainerModal,
  isExpired,
  setShowRemovePersonalTrainer,
  setShowRemoveExtendedSubscriptionModal,
  subscription,
}) => {
  const [extendedTrainer, setExtendedTrainer] = useState([]);

  const handleRemoveExtendedTrainer = useCallback(
    (id) => {
      setModalTitle("Remove Extended Trainers");
      setExtendedTrainerId(id);
      setShowRemoveExtendedSubscriptionModal(true);
    },
    [setModalTitle, setExtendedTrainerId],
  );

  const handleUpdateExtendedTrainer = useCallback(
    (id) => {
      setModalTitle("Update Extended Trainer");
      setExtendedTrainerId(id);
      setShowAddTrainerModal(true);
    },
    [setModalTitle, setExtendedTrainerId, setShowAddTrainerModal],
  );

  const handleAddPersonalTrainers = useCallback(() => {
    setModalTitle("Add Personal Trainers");
    setUserSubscriptionId(subscriptionId);
    setShowAddTrainerModal(true);
  }, [
    setModalTitle,
    setUserSubscriptionId,
    subscriptionId,
    setShowAddTrainerModal,
  ]);

  const handleExtendPersonalTrainers = useCallback(() => {
    setModalTitle("Extend Personal Trainers");
    setUserSubscriptionId(subscriptionId);
    setShowAddTrainerModal(true);
  }, [
    setModalTitle,
    setUserSubscriptionId,
    subscriptionId,
    setShowAddTrainerModal,
  ]);

  const freeTrainerDisplay = useMemo(() => {
    if (!trainers) return "";
    return `${trainers.toUpperCase()} - (${personalTrainerDaysLeft(
      trainers,
      "remaining-days",
      trainerRemainingDays,
      session_days,
    )}) - ${FormatDate(trainer_date_started)}`;
  }, [trainers, trainerRemainingDays, session_days, trainer_date_started]);

  useEffect(() => {
    let cancelled = false;

    const fetchExtendedTrainer = async () => {
      try {
        const data = await getExtendedTrainer(user_id);
        if (!cancelled) setExtendedTrainer(data || []);
      } catch (e) {
        if (!cancelled) console.error(e);
      }
    };

    user_id ? fetchExtendedTrainer() : setExtendedTrainer([]);

    return () => {
      cancelled = true;
    };
  }, [user_id]);

  return (
    <div style={{ marginBottom: "7px" }}>
      <h5>Extended Trainer Remaining Days:</h5>
      {extendedTrainer.length > 0 ? (
        <TrainerRemainingDays
          trainerRemainingDays={trainerRemainingDays}
          session_days={session_days}
          extendedTrainer={extendedTrainer}
          trainers={trainers}
        />
      ) : (
        <h4 style={{ color: "orange" }}>N/A</h4>
      )}

      <h5>Free Personal Trainer:</h5>
      <h4 style={{ color: "pink", lineHeight: "1.5rem" }}>
        {freeTrainerDisplay}
      </h4>

      <h5>Extended Personal Trainer:</h5>
      <div style={{ margin: "15px 0" }}>
        {extendedTrainer.map((extended) =>
          extended.PT > 0 ? (
            <div key={extended.id} style={{ display: "flex" }}>
              <button
                type="button"
                className="extendedTrainer"
                onClick={() => handleUpdateExtendedTrainer(extended.id)}
                style={transparentButtonStyle}
              >
                <ExtendedTrainerDetails
                  trainersName={extended.trainer?.name || ""}
                  dateExtended={extended.date_extend}
                  extendRemainingDays={extended.PT}
                />
              </button>

              <button
                type="button"
                onClick={() => handleRemoveExtendedTrainer(extended.id)}
                aria-label="Remove extended trainer"
                style={iconButtonStyle}
              >
                <DeleteIconSvg />
              </button>
            </div>
          ) : null,
        )}
      </div>

      {!isExpired && subscription != "MEMBERSHIP" && (
        <>
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
        </>
      )}
    </div>
  );
};

export default PersonalTrainerComponents;
