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
  setExtendedSubId,
  setExtendedTrainerId,
  contactNo,
  trainer_date_started,
  packages_details,
}) => {
  const [remaining, setRemaining] = useState(0);
  const [counter, setCounter] = useState(0);
  const [extendedTrainer, setExtendedTrainer] = useState([]);
  const [extendedSubscript, setExtendedSubscript] = useState([]);
  const [totalFreeTrainerLeft, setTotalFreeTrainerLeft] = useState(0);

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

  // checked expired subscription and set from on-going to expired
  useEffect(() => {
    const intervalId = setInterval(() => {
      let daysleft = getSubscriptionDaysLeft(
        remaining,
        extendedSubscript,
        date_subscribed,
        false
      );

      if (daysleft === "Expired") {
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
      } catch (error) {
        console.error("Error in fetching Extended Subscription:", error);
      }
    };

    extendedSub();
  }, [subscriptionId]);

  // HANDLE ADD PERSONAL TRAINERS
  const handleAddPersonalTrainers = () => {
    setModalTitle("Add Personal Trainers");
    setUserSubscriptionId(subscriptionId);
  };

  // HANDLE EXTEND PERSONAL TRAINERS
  const handleExtendPersonalTrainers = () => {
    setModalTitle("Extend Personal Trainers");
    setUserSubscriptionId(subscriptionId);
  };

  // HANDLE EXTEND SUBSCRIPTIONS
  const handleExtendSubscriptions = () => {
    setModalTitle("Extend Subscriptions");
    setUserSubscriptionId(subscriptionId);
  };

  // HANDLE UPDATE EXTENDED SUBSUBSCRIPTIONS
  const handleUpdateExtendSubscriptions = (id) => {
    setModalTitle("Update Extended Subscriptions");
    setUserSubscriptionId(id);
  };

  // HANDLE REMOVE EXTENDED TRAINER
  const handleUpdateExtendedTrainer = (id) => {
    setModalTitle("Update Extended Trainer");
    setExtendedTrainerId(id);
  };

  // HANDLE REMOVE EXTENDED SUBSCRIPTION
  const handleRemoveExtendedSub = (id) => {
    setModalTitle("Remove Extended Subscriptions");
    setExtendedSubId(id);
  };

  // HANDLE REMOVE EXTENDED TRAINER
  const handleRemoveExtendedTrainer = (id) => {
    setModalTitle("Remove Extended Trainers");
    setExtendedTrainerId(id);
  };

  // const getTrainerRemainingDays = () => {
  //   retsurn formatTime(trainerRemainingDays, "days-only") + session_days;
  // };

  const context = (
    <>
      <div className="col-lg-3 col-xs-12">
        <div className="c-col">
          <div className="c-col-name">
            <img src={blobPic} alt="" />
            <div className="col-name">
              <h4>
                <span style={{ color: "yellowgreen" }}>ID:{user_id}</span>{" "}
                {registeredName}
              </h4>
              <p>
                {contactNo} <br />
                User Subscription Id: {subscriptionId}
              </p>
            </div>
          </div>
          <div className="c-col-time-in-out">
            <h5>DATE SUBSCRIBED</h5>
            <h4>{FormatDate(date_subscribed)}</h4>

            {/* MAIN SUBSCRIPTION */}
            <h3>{subscription}</h3>

            {/* PACKAGES DETAILS */}
            <span style={{ fontSize: "12px", color: "yellowgreen" }}>
              {packages_details?.map(
                (packages) => packages.packages_details + "▐ "
              )}
            </span>
            {extendedSubscript?.map((ex, index) => (
              <>
                <div key={index}>
                  <a
                    className="extendSubscript"
                    data-toggle="modal"
                    data-target="#extendSubscriptionModal"
                    data-whatever="@mdo"
                    onClick={() => handleUpdateExtendSubscriptions(ex.id)}
                  >
                    - {ex?.subscription.gym_rate_desc} /{" extend "}
                    {ex?.extended_session_day} {" days"}
                  </a>{" "}
                  <a
                    className="removeExtendedSubs"
                    data-toggle="modal"
                    data-target="#removeExtendedSubModal"
                    data-whatever="@mdo"
                    onClick={() => handleRemoveExtendedSub(ex.id)}
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
                </div>
              </>
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
            <h5>Subscription Remaining Days:</h5>
            <h4 style={{ fontSize: "20px" }}>
              {getSubscriptionDaysLeft(
                remaining,
                extendedSubscript,
                date_subscribed,
                false
              )}
            </h4>

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
              )
              {trainers === undefined
                ? ""
                : " - " + FormatDate(trainer_date_started)}
            </h4>
            <h5 style={{ color: "white" }}>Extended Personal Trainer:</h5>
            {extendedTrainer?.map((extended) => (
              <>
                <div key={extended.id}>
                  <a
                    className="removeExtendedTrainer"
                    data-toggle="modal"
                    data-target="#removeExtendedSubModal"
                    data-whatever="@mdo"
                    onClick={() => handleRemoveExtendedTrainer(extended?.id)}
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
                  <a
                    className="extendedTrainer"
                    key={extended.id}
                    data-toggle="modal"
                    data-target="#addTrainerModal"
                    data-whatever="@mdo"
                    onClick={() => handleUpdateExtendedTrainer(extended.id)}
                  >
                    {extended.trainer.name} ({extended.extended_session_day}{" "}
                    days) - {FormatDate(extended.date_extend)}
                  </a>
                </div>
              </>
            ))}

            {/* TRAINER REMAINING DAYS */}
            <h5>Extended Trainer Remaning Days:</h5>
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
                style={{
                  padding: "3px 10px",
                  marginRight: "5px",
                  marginBottom: "5px",
                }}
                onClick={handleAddPersonalTrainers}
                data-toggle="modal"
                data-target="#addTrainerModal"
                data-whatever="@mdo"
              >
                Free Personal Trainer
              </button>
              <button
                className="btn btn-success"
                style={{ padding: "3px 10px", marginBottom: "5px" }}
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
};

export default RenewalUsers;
