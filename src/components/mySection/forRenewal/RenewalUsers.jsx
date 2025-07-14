import React, { useEffect, useReducer, useState } from "react";
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
  contactNo,
  trainer_date_started,
  packages_details,
  sub_session_days,
}) => {
  const [extendedSubscript, setExtendedSubscript] = useState([]);

  let n = 0;

  const [state, dispatch] = useReducer(
    extendSubscriptionReducer,
    INITIAL_STATE
  );

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

  // HANDLE EXTEND SUBSCRIPTIONS MODAL
  const handleExtendSubscriptions = () => {
    dispatch({
      type: "CLEAR",
    });

    setModalTitle("Extend Subscriptions");
    setUserSubscriptionId(subscriptionId);
  };

  // HANDLE UPDATE EXTENDED SUBSUBSCRIPTIONS MODAL
  const handleUpdateExtendSubscriptions = (id) => {
    setModalTitle("Update Extended Subscriptions");
    setUserSubscriptionId(id);
  };

  // HANDLE REMOVE EXTENDED SUBSCRIPTION
  const handleRemoveExtendedSub = (id) => {
    setModalTitle("Remove Extended Subscriptions");
    setExtendedSubId(id);
  };

  const CardContext = (
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
          <div className="c-col-time-in-out" key={id}>
            {/* CARD SUBSCRIPTION COMPONENTS */}
            <SubscriptionComponents
              date_subscribed={date_subscribed}
              packages_details={packages_details}
              extendedSubscript={extendedSubscript}
              handleExtendSubscriptions={handleExtendSubscriptions}
              handleUpdateExtendSubscriptions={handleUpdateExtendSubscriptions}
              handleRemoveExtendedSub={handleRemoveExtendedSub}
              subscription={subscription}
            />

            {/* CARD REMAINING DAYS COMPONENTS */}
            <RemainingDaysLeftComponent
              date_subscribed={date_subscribed}
              per={per}
              user_id={user_id}
              session_days={sub_session_days}
              subscriptionId={subscriptionId}
              id={id}
            />

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
            />
          </div>
        </div>
      </div>
    </>
  );

  return CardContext;
};

export default RenewalUsers;
