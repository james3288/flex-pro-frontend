import React, { useEffect, useState, useMemo } from "react";
import pic from "./../../../../src/assets/img/dummy.png";
import FormatDate from "../../../others/FormatDate";
import remainingDays from "../../../others/GetRemainingDays";
import getSubscriptionDaysLeft from "../../../getData/getSubscriptionDaysLeft";
import DeleteIconSvg from "../../svg/deleteIconSvg";
import { useDayPassStore } from "../../../store/useDayPassStore";

const DayPassUser = ({ user }) => {
  const [remaining, setRemaining] = useState(0);
  const [extendedSubscript] = useState([]); // kept for consistency if used later
  const [myDaysLeft, setMyDaysLeft] = useState(null);

  // Zustand store actions
  const {
    setModalTitle,
    setDayPassUserId,
    setDayPassId,
    setRemoveModalId,
    setRemoveModalTitle,
  } = useDayPassStore((state) => ({
    setModalTitle: state.setModalTitle,
    setDayPassUserId: state.setDayPassUserId,
    setDayPassId: state.setDayPassId,
    setRemoveModalTitle: state.setRemoveModalTitle,
    setRemoveModalId: state.setRemoveModalId,
  }));

  // compute subscription days left once per render
  const subDaysLeft = useMemo(
    () =>
      getSubscriptionDaysLeft(
        remaining,
        extendedSubscript,
        user?.date_subscribed,
        false
      ),
    [remaining, extendedSubscript, user?.date_subscribed]
  );

  // update remaining days with safe interval
  useEffect(() => {
    let isMounted = true;

    const updateRemaining = async () => {
      const value = await remainingDays(user?.date_subscribed, "day", user.id);
      if (isMounted) setRemaining(value);
    };

    updateRemaining(); // initial run

    const intervalId = setInterval(() => {
      if (subDaysLeft === "Expired") {
        if (isMounted) setMyDaysLeft("Expired");
        clearInterval(intervalId);
      } else {
        updateRemaining();
      }
    }, 1000);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, [user?.date_subscribed, user?.id, subDaysLeft]);

  // handlers
  const handleAddPersonalTrainers = () => {
    setModalTitle("Update Personal Trainer");
    setDayPassUserId("add-daypass-trainer");
    setDayPassId(user?.id);
  };

  const handleRemoveTrainer = () => {
    setRemoveModalTitle("Remove Personal Trainer");
    setRemoveModalId("remove-daypass-trainer");
    setDayPassId(user?.id);
  };

  // if expired, don't render
  if (subDaysLeft === "Expired") return null;

  return (
    <div className="col-lg-3 col-xs-12">
      <div className="c-col">
        <div className="c-col-name">
          <img src={pic} alt="" />
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

          {/* MAIN SUBSCRIPTION */}
          <h3>{user?.subscription?.gym_rate_desc}</h3>

          <h5>Remaining Hours:</h5>
          <h4 style={{ fontSize: "20px" }}>{subDaysLeft}</h4>

          <h5 style={{ color: "white" }}>Personal Trainer:</h5>
          <div>
            <a
              className="removeExtendedTrainer"
              data-toggle="modal"
              data-target="#remove-daypass-trainer"
              data-whatever="@mdo"
              onClick={handleRemoveTrainer}
            >
              {user?.personal_trainer?.name && <DeleteIconSvg />}
            </a>
            <a
              className="extendedTrainer"
              data-toggle="modal"
              data-target="#add-daypass-trainer"
              data-whatever="@mdo"
            >
              {user?.personal_trainer?.name}{" "}
              {user?.personal_trainer?.name && FormatDate(user?.date_started)}
            </a>
          </div>
          <br />

          <div>
            <button
              className="btn btn-success"
              style={{ padding: "3px 10px", marginBottom: "5px" }}
              data-toggle="modal"
              data-target="#add-daypass-trainer"
              data-whatever="@mdo"
              onClick={handleAddPersonalTrainers}
            >
              Personal Trainer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DayPassUser;
