import React, { useEffect, useRef, useState } from "react";
import useRemainingDaysLeft from "../../../hooks/useRemainingDaysLeft";
import instance from "../../../others/axiosInstance";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useToastifyMessage from "../../../hooks/useToastifyMessage";
import { useLocation } from "react-router-dom";
import { PageName } from "../../../constants/enum";

const RemainingDaysLeftComponent = ({
  date_subscribed,
  per,
  user_id,
  session_days,
  subscriptionId,
  id,
  fontColor,
  fullname,
  fontSize = "20px",
}) => {
  const hasUpdatedRef = useRef(false); // to track if already updated
  const [remaining, setRemaining] = useState();
  const location = useLocation();

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

  const { showToastMessage } = useToastifyMessage({
    message: (
      <p>
        <span
          style={{
            color: "green",
            fontWeight: "bold",
            fontFamily: "monospace",
          }}
        >
          {fullname}
        </span>{" "}
        was already expired
      </p>
    ),
    position: "top-right",
  });

  const result = async () => {
    setRemaining(await remainingDaysLeft());
  };

  result();

  useEffect(() => {
    if (remaining === "Expired" && !hasUpdatedRef.current) {
      console.log(location.pathname.toString());

      handleExpired();
      if (location.pathname.toString() === "/expired-users") {
        return;
      }
      showToastMessage();
    }
  }, [remaining, id]);

  return (
    <>
      <h5 style={{ fontSize: "18px" }}>Subscription Remaining Days:</h5>
      <h4 style={{ fontSize: fontSize, color: fontColor }}>{remaining}</h4>
    </>
  );
};

export default RemainingDaysLeftComponent;
