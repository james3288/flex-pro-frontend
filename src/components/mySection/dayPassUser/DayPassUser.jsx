import React, { useEffect, useState } from "react";
import pic from "./../../../../src/assets/img/dummy.png";
import FormatDate from "../../../others/FormatDate";
import remainingDays from "../../../others/GetRemainingDays";
import getSubscriptionDaysLeft from "../../../getData/getSubscriptionDaysLeft";
import DeleteIconSvg from "../../svg/deleteIconSvg";
import { useDayPassStore } from "../../../store/useDayPassStore";
import LoadingEffect from "../loadingEffect/LoadingEffect";

const DayPassUser = ({ user }) => {
  const [remaining, setRemaining] = useState(0);
  const [counter, setCounter] = useState(0);
  const [extendedTrainer, setExtendedTrainer] = useState([]);
  const [extendedSubscript, setExtendedSubscript] = useState([]);
  const [totalFreeTrainerLeft, setTotalFreeTrainerLeft] = useState(0);
  const [myDaysLeft, setMyDaysLeft] = useState();

  //setter
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

  // get the remaining days
  const getRemainingDays = async () => {
    setRemaining(await remainingDays(user.date_subscribed, "day", user.id));
  };

  // checked expired subscription and set from on-going to expired
  useEffect(() => {
    const intervalId = setInterval(() => {
      let daysleft = getSubscriptionDaysLeft(
        remaining,
        extendedSubscript,
        user.date_subscribed,
        false
      );

      if (daysleft === "Expired") {
        // setRefresher2(true)
        // counter == 0 && handleExpired();
        setMyDaysLeft(daysleft);

        clearInterval(intervalId);
      } else {
        getRemainingDays();
      }
    }, 1000);

    // Clean up the interval when the component sunmounts
    return () => clearInterval(intervalId);
  }, [remaining]);

  // HANDLE ADD PERSONAL TRAINERS
  const handleAddPersonalTrainers = () => {
    setModalTitle("Update Personal Trainer");
    setDayPassUserId("add-daypass-trainer");
    setDayPassId(user.id);
  };

  const handleRemoveTrainer = () => {
    setRemoveModalTitle("Remove Personal Trainer");
    setRemoveModalId("remove-daypass-trainer");
    setDayPassId(user.id);
  };

  const context = (
    <>
      <div className="col-lg-3 col-xs-12" key={user.id}>
        <div className="c-col">
          <div className="c-col-name">
            <img src={pic} alt="" />
            <div className="col-name">
              <h4>
                <span style={{ color: "yellowgreen" }}>ID:{user.id}</span>{" "}
                {user.name}
              </h4>
            </div>
          </div>
          <div className="c-col-time-in-out">
            <h5>DATE SUBSCRIBED</h5>
            <h4>{FormatDate(user.date_subscribed)}</h4>

            {/* MAIN SUBSCRIPTION */}
            <h3>{user.subscription.gym_rate_desc}</h3>

            <h5>Remaining Hours:</h5>
            <h4 style={{ fontSize: "20px" }}>
              {getSubscriptionDaysLeft(
                remaining,
                extendedSubscript,
                user.date_subscribed,
                false
              )}
            </h4>

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

            <div className="">
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

            {/* )} */}
          </div>
        </div>
      </div>
    </>
  );

  const subDaysLeft = getSubscriptionDaysLeft(
    remaining,
    extendedSubscript,
    user.date_subscribed,
    false
  );

  return subDaysLeft === "Expired" ? "" : subDaysLeft != "Expired" && context;
};

export default DayPassUser;
