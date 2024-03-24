import React, { useEffect, useState } from "react";
import FormatDate from "../../../others/FormatDate";
import formatTime from "../../../others/ReadableFormatTime";
import remainingDays from "../../../others/GetRemainingDays";
import instance from "../../../others/axiosInstance";
import getTrainerRemainingDays from "../../../getData/getTrainerRemainingDays";
import getExtendedTrainer from "../../../getData/getExtendedTrainer";
import personalTrainerDaysLeft from "../../../getData/personalTrainerDaysLeft";
import getExtendedSubscription from "../../../getData/getExtendedSubscription";
import getSubscriptionDaysLeft from "../../../getData/getSubscriptionDaysLeft";
import TrainerRemainingDays from "./TrainerRemainingDays";

const RenewalUsers = ({
  blobPic,
  registeredName,
  date_subscribed,
  subscription,
  per,
  user_id,
  id,
  trainers,
  trainerRemainingDays,
  subscriptionId,
  setUserSubscriptionId,
  session_days,
  setModalTitle,
}) => {
  const [remaining, setRemaining] = useState(0);
  const [counter, setCounter] = useState(0);
  const [extendedTrainer, setExtendedTrainer] = useState([]);
  const [extendedSubscript, setExtendedSubscript] = useState([]);

  // get the remaining days
  const getRemainingDays = async () => {
    setRemaining(await remainingDays(date_subscribed, per, user_id));
  };

  // function for expired subscription
  const handleExpired = () => {
    setCounter((prev) => prev + 1);
    instance
      .put(`/api/user_status_update/${id}`, {
        status: "expired",
      })
      .then((response) => {
        console.log("Update successful:", response.data);
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      });
  };

  // checked expired subscription
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (formatTime(remaining, "minutes-left") < 0) {
        // setRefresher2(true);

        counter == 0 && handleExpired();

        clearInterval(intervalId);
      } else {
        getRemainingDays();
      }
    }, 1000);

    // Clean up the interval when the component sunmounts
    return () => clearInterval(intervalId);
  }, [remaining]);

  // get extended trainer
  useEffect(() => {
    const extended = async () => {
      try {
        const data = await getExtendedTrainer(subscriptionId);
        setExtendedTrainer(data);
      } catch (error) {
        console.error("Error in fetchData:", error);
      }
    };

    extended();
  }, [id]);

  // get extended subscription
  useEffect(() => {
    const extendedSub = async () => {
      try {
        const data = await getExtendedSubscription(subscriptionId);
        setExtendedSubscript(data);

        console.log("extendedSubscription", data);
      } catch (error) {
        console.error("Error in fetching Extended Subscription:", error);
      }
    };

    extendedSub();
  }, [subscriptionId]);

  const handleAddPersonalTrainers = () => {
    setModalTitle("Add Personal Trainers");
    setUserSubscriptionId(subscriptionId);
  };

  const handleExtendPersonalTrainers = () => {
    setModalTitle("Extend Personal Trainers");
    setUserSubscriptionId(subscriptionId);
  };

  const handleExtendSubscriptions = () => {
    setModalTitle("Extend Subscriptions");
    setUserSubscriptionId(subscriptionId);
  };

  const handleUpdateExtendSubscriptions = (id) => {
    setModalTitle("Update Extended Subscriptions");
    setUserSubscriptionId(id);
  };

  // const getTrainerRemainingDays = () => {
  //   return formatTime(trainerRemainingDays, "days-only") + session_days;
  // };

  const context = (
    <>
      <div className="col-lg-3 col-xs-12">
        <div className="c-col">
          <div className="c-col-name">
            <img src={blobPic} alt="" />
            <div className="col-name">
              <h4>
                <span>ID:{user_id}</span> {registeredName}
              </h4>
            </div>
          </div>
          <div className="c-col-time-in-out">
            <h5>DATE SUBSCRIBED</h5>
            <h4>{FormatDate(date_subscribed)}</h4>
            <h3>{subscription}</h3>

            {extendedSubscript?.map((ex) => (
              <a
                className="extendSubscript"
                key={ex?.id}
                data-toggle="modal"
                data-target="#extendSubscriptionModal"
                data-whatever="@mdo"
                onClick={() => handleUpdateExtendSubscriptions(ex.id)}
              >
                - {ex?.subscription.gym_rate_desc} /{" "}
                {ex?.subscription.rate.toLocaleString()} per{" "}
                {ex.subscription.per.per}
              </a>
            ))}
            <button
              className="btn btn-secondary btn-sm extend-subscription"
              data-toggle="modal"
              data-target="#extendSubscriptionModal"
              data-whatever="@mdo"
              onClick={handleExtendSubscriptions}
            >
              Extend Subscripition
            </button>
            <h5>Remaining Days:</h5>
            <h4>
              {getSubscriptionDaysLeft(
                remaining,
                extendedSubscript,
                date_subscribed
              )}
            </h4>

            <h5>Personal Trainers:</h5>

            <h4 style={{ color: "pink" }}>
              {trainers} (
              {personalTrainerDaysLeft(
                trainers,
                "remaining-days",
                trainerRemainingDays,
                session_days
              )}
              )
            </h4>
            <h5 style={{ color: "white" }}>Extended Personal Trainer:</h5>
            {extendedTrainer?.map((extended) => (
              // <h4 style={{ color: "pink" }}>
              //   {extended.trainer.name} ({extended.extended_session_day} days)
              // </h4>
              <a style={{ color: "pink", cursor: "pointer" }} key={extended.id}>
                {extended.trainer.name} ({extended.extended_session_day} days) -{" "}
                {FormatDate(extended.date_extend)}
              </a>
            ))}
            <h5>Trainer Remaning Days:</h5>
            <TrainerRemainingDays
              trainerRemainingDays={trainerRemainingDays}
              session_days={session_days}
              extendedTrainer={extendedTrainer}
              trainers={trainers}
            />

            {/* <h4>
              {" "}
              {getTrainerRemainingDays(
                trainerRemainingDays,
                session_days,
                extendedTrainer
              ) < 2
                ? // formatTime(trainerRemainingDays, "days-only") + session_days < 2
                  // trainers == null
                  // ? "N/A"
                  // : "- Expired"
                  personalTrainerDaysLeft(trainers, "trainer-remaining-days")
                : "(" +
                  getTrainerRemainingDays(
                    trainerRemainingDays,
                    session_days,
                    extendedTrainer
                  ) +
                  ")"}
            </h4> */}
            {/* {trainers == null ? (
              <button
                className="btn btn-primary"
                style={{ padding: "3px 10px" }}
                onClick={handleAddPersonalTrainers}
                data-toggle="modal"
                data-target="#addTrainerModal"
                data-whatever="@mdo"
              >
                Add Personal Trainer
              </button>
            ) : ( */}
            <div className="">
              {" "}
              <button
                className="btn btn-primary"
                style={{ padding: "3px 10px", marginRight: "5px" }}
                onClick={handleAddPersonalTrainers}
                data-toggle="modal"
                data-target="#addTrainerModal"
                data-whatever="@mdo"
              >
                Add Personal Trainer
              </button>
              <button
                className="btn btn-success"
                style={{ padding: "3px 10px" }}
                data-toggle="modal"
                data-target="#addTrainerModal"
                data-whatever="@mdo"
                onClick={handleExtendPersonalTrainers}
              >
                Extend Personal Trainer
              </button>
            </div>

            {/* )} */}
          </div>
        </div>
      </div>
    </>
  );

  return context;
  // if (trainers == null && formatTime(remaining, "days-only") > 2) {
  //   return;
  // } else {
  //   return context;
  // }
};

export default RenewalUsers;
