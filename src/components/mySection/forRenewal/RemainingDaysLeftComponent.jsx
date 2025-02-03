import React, { useEffect } from "react";
import useRemainingDaysLeft from "../../../hooks/useRemainingDaysLeft";
import instance from "../../../others/axiosInstance";

const RemainingDaysLeftComponent = ({
  date_subscribed,
  per,
  user_id,
  session_days,
  subscriptionId,
  id,
}) => {
  // function for expired subscription
  const handleExpired = async () => {
    // setCounter((prev) => prev + 1);

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

  const { remainingDaysLeft } = useRemainingDaysLeft(
    date_subscribed,
    per,
    user_id,
    session_days,
    subscriptionId
  );

  const result = remainingDaysLeft();

  useEffect(() => {
    const ifExpired = async () => {
      if (result == "Expired") {
        const interval = setInterval(async () => {
          await handleExpired();

          console.log(result, id);
        }, 1000);

        return () => clearInterval(interval);
      }
    };

    ifExpired();
  }, [result]);

  return (
    <>
      <h5>Subscription Remaining Days:</h5>
      <h4 style={{ fontSize: "20px" }}>{result}</h4>
    </>
  );
};

export default RemainingDaysLeftComponent;
