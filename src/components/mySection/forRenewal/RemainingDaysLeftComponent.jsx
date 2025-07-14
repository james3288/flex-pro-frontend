import React, { useEffect, useRef, useState } from "react";
import useRemainingDaysLeft from "../../../hooks/useRemainingDaysLeft";
import instance from "../../../others/axiosInstance";

const RemainingDaysLeftComponent = ({
  date_subscribed,
  per,
  user_id,
  session_days,
  subscriptionId,
  id,
  fontColor,
}) => {
  const hasUpdatedRef = useRef(false); // to track if already updated

  const handleExpired = async () => {
    try {
      await instance.put(`/api/user_status_update/${id}`, {
        status: "expired",
      });
      console.log("Update successful");
      hasUpdatedRef.current = true;
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const { remainingDaysLeft } = useRemainingDaysLeft(
    date_subscribed,
    per,
    user_id,
    session_days,
    subscriptionId
  );

  const result = remainingDaysLeft();

  useEffect(() => {
    if (result === "Expired" && !hasUpdatedRef.current) {
      handleExpired();
    }
  }, [result]);

  return (
    <>
      <h5>Subscription Remaining Days:</h5>
      <h4 style={{ fontSize: "20px", color: fontColor }}>{result}</h4>
    </>
  );
};

export default RemainingDaysLeftComponent;
