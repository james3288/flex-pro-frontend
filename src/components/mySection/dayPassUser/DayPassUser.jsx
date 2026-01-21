import React, { useEffect, useMemo, useCallback } from "react";
import pic from "../../../../src/assets/img/dummy.png";
import FormatDate from "../../../others/FormatDate";
import remainingDays from "../../../others/GetRemainingDays";
import getSubscriptionDaysLeft from "../../../getData/getSubscriptionDaysLeft";
import DeleteIconSvg from "../../svg/deleteIconSvg";
import { useDayPassStore } from "../../../store/useDayPassStore";

const DayPassUser = ({
  user,
  setShowAddPersonalTrainerModal,
  setShowRemovePersonalTrainer,
}) => {
  /** ───────── Zustand actions (atomic subscriptions) ───────── */
  const setModalTitle = useDayPassStore((s) => s.setModalTitle);
  const setDayPassUserId = useDayPassStore((s) => s.setDayPassUserId);
  const setDayPassId = useDayPassStore((s) => s.setDayPassId);
  const setRemoveModalTitle = useDayPassStore((s) => s.setRemoveModalTitle);
  const setRemoveModalId = useDayPassStore((s) => s.setRemoveModalId);
  // const setDayPassTrainer = useDayPassStore((s) => s.setDayPassTrainer);
  const setDayPassTrainer2 = useDayPassStore((s) => s.setDayPassTrainer2);

  /** ───────── Remaining days ───────── */
  const [remaining, setRemaining] = React.useState(0);

  const personalTrainerStyle = {
    display: "flex",
    gap: "5px",
  };

  useEffect(() => {
    if (!user?.date_subscribed || !user?.id) return;

    let cancelled = false;

    const fetchRemaining = async () => {
      const value = await remainingDays(user.date_subscribed, "day", user.id);
      if (!cancelled) setRemaining(value);
    };

    fetchRemaining();

    return () => {
      cancelled = true;
    };
  }, [user?.date_subscribed, user?.id]);

  /** ───────── Subscription days left (derived) ───────── */
  const subDaysLeft = useMemo(() => {
    return getSubscriptionDaysLeft(remaining, [], user?.date_subscribed, false);
  }, [remaining, user?.date_subscribed]);

  /** ───────── Handlers ───────── */

  const toDateTimeLocal = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toISOString().slice(0, 16);
  };

  const handleAddPersonalTrainers = useCallback(() => {
    setModalTitle("Update Personal Trainer");
    setDayPassUserId("add-daypass-trainer");
    setDayPassId(user?.id);

    // 🔥 THIS IS THE KEY
    setDayPassTrainer2({
      trainer_id: user?.personal_trainer?.id ?? 0,
      trainingDateStarted: toDateTimeLocal(user?.date_started),
    });
    setShowAddPersonalTrainerModal(true);
  }, [
    setModalTitle,
    setDayPassUserId,
    setDayPassId,
    setDayPassTrainer2,
    setShowAddPersonalTrainerModal,
    user?.id,
    user?.personal_trainer,
    user?.date_started,
  ]);

  const handleRemoveTrainer = useCallback(() => {
    setRemoveModalTitle("Remove Personal Trainer");
    setRemoveModalId("remove-daypass-trainer");
    setDayPassId(user?.id);
    setShowRemovePersonalTrainer(true);
  }, [
    setRemoveModalTitle,
    setRemoveModalId,
    setDayPassId,
    setShowRemovePersonalTrainer,
    user?.id,
  ]);

  /** ───────── Don't render expired users ───────── */
  if (subDaysLeft === "Expired") return null;

  /** ───────── Render ───────── */
  return (
    <div className="col-lg-3 col-xs-12">
      <div className="c-col">
        <div className="c-col-name">
          <img src={pic} alt="User avatar" />
          <div className="col-name">
            <h4>
              <span style={{ color: "yellowgreen" }}>ID:{user?.id}</span>{" "}
              {user?.name}
            </h4>
          </div>
        </div>

        <div className="c-col-time-in-out">
          <h5>DATE SUBSCRIBED</h5>
          <h4>{FormatDate(user?.date_subscribed)}</h4>

          <h3>{user?.subscription?.gym_rate_desc}</h3>

          <h5>Remaining Hours:</h5>
          <h4 style={{ fontSize: "20px" }}>{subDaysLeft}</h4>

          <h5 style={{ color: "white" }}>Personal Trainer:</h5>
          <div style={personalTrainerStyle}>
            {user?.personal_trainer?.name && (
              <a
                className="removeExtendedTrainer"
                onClick={handleRemoveTrainer}
                aria-label="Remove personal trainer"
              >
                <DeleteIconSvg />
              </a>
            )}

            {user?.personal_trainer?.name && (
              <a
                className="extendedTrainer"
                onClick={handleAddPersonalTrainers}
              >
                {user?.personal_trainer?.name}
                {user?.date_started && `(${FormatDate(user?.date_started)})`}
              </a>
            )}
          </div>

          <br />

          <button
            className="btn btn-success"
            style={{ padding: "3px 10px", marginBottom: "5px" }}
            onClick={handleAddPersonalTrainers}
          >
            Personal Trainer
          </button>
        </div>
      </div>
    </div>
  );
};

export default DayPassUser;
