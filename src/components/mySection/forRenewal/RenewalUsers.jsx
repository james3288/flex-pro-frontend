import React, { useEffect, useReducer, useState, useCallback } from "react";
import getExtendedSubscription from "../../../getData/getExtendedSubscription";
import RemainingDaysLeftComponent from "./RemainingDaysLeftComponent";
import SubscriptionComponents from "./SubscriptionComponents";
import PersonalTrainerComponents from "./PersonalTrainerComponents";
import {
  extendSubscriptionReducer,
  INITIAL_STATE,
} from "../../../reducers/extendSubscriptionReducer";

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
  setShowAddTrainerModal,
  setShowExtendSubscriptionModal,
  setShowRemoveExtendedSubscriptionModal,
  contactNo,
  trainer_date_started,
  packages_details,
  sub_session_days,
  isExpired,
}) => {
  const [extendedSubscript, setExtendedSubscript] = useState([]);

  const [state, dispatch] = useReducer(
    extendSubscriptionReducer,
    INITIAL_STATE,
  );

  // Fetch extended subscription safely
  useEffect(() => {
    let isMounted = true;

    const fetchExtendedSub = async () => {
      try {
        const data = await getExtendedSubscription(subscriptionId);
        if (isMounted) {
          setExtendedSubscript((prev) =>
            JSON.stringify(prev) !== JSON.stringify(data) ? data : prev,
          );
        }
      } catch (error) {
        console.error("Error in fetching Extended Subscription:", error);
      }
    };

    fetchExtendedSub();
    return () => {
      isMounted = false;
    };
  }, [subscriptionId]);

  // Handlers (memoized to avoid unnecessary re-renders)
  const handleExtendSubscriptions = useCallback(() => {
    dispatch({ type: "CLEAR" });
    setModalTitle("Extend Subscriptions");
    setUserSubscriptionId(subscriptionId);
  }, [dispatch, setModalTitle, setUserSubscriptionId, subscriptionId]);

  const handleUpdateExtendSubscriptions = useCallback(
    (id) => {
      setModalTitle("Update Extended Subscriptions");
      setUserSubscriptionId(id);
    },
    [setModalTitle, setUserSubscriptionId],
  );

  const handleRemoveExtendedSub = useCallback(
    (id) => {
      setModalTitle("Remove Extended Subscriptions");
      setExtendedSubId(id);
      setShowRemoveExtendedSubscriptionModal(true);
    },
    [setModalTitle, setExtendedSubId, setShowRemoveExtendedSubscriptionModal],
  );

  return (
    <div className="col-lg-3 col-xs-12">
      <div className="c-col">
        <div className="c-col-name">
          <img src={blobPic} alt={`${registeredName}'s profile`} />
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

        <div className="c-col-time-in-out" key={id}>
          {/* CARD REMAINING DAYS COMPONENTS */}
          <RemainingDaysLeftComponent
            date_subscribed={date_subscribed}
            per={per}
            user_id={user_id}
            session_days={sub_session_days}
            subscriptionId={subscriptionId}
            id={id}
            fullname={registeredName}
          />
          {/* CARD SUBSCRIPTION COMPONENTS */}
          <SubscriptionComponents
            date_subscribed={date_subscribed}
            packages_details={packages_details}
            extendedSubscript={extendedSubscript}
            handleExtendSubscriptions={handleExtendSubscriptions}
            handleUpdateExtendSubscriptions={handleUpdateExtendSubscriptions}
            handleRemoveExtendedSub={handleRemoveExtendedSub}
            subscription={subscription}
            isExpired={isExpired}
            setShowExtendSubscriptionModal={setShowExtendSubscriptionModal}
          />
          <hr />
          {/* CARD PERSONAL TRAINERS COMPONENTS */}
          <PersonalTrainerComponents
            trainers={trainers}
            trainerRemainingDays={trainerRemainingDays}
            session_days={session_days}
            trainer_date_started={trainer_date_started}
            user_id={user_id}
            id={id}
            setExtendedTrainerId={setExtendedTrainerId}
            subscriptionId={subscriptionId}
            setUserSubscriptionId={setUserSubscriptionId}
            setModalTitle={setModalTitle}
            setShowAddTrainerModal={setShowAddTrainerModal}
            isExpired={isExpired}
          />
        </div>
      </div>
    </div>
  );
};

export default RenewalUsers;
