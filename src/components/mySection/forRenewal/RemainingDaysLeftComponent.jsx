import React, { useEffect, useRef, useState } from "react";
import useRemainingDaysLeft from "../../../hooks/useRemainingDaysLeft";
import instance from "../../../others/axiosInstance";
import "react-toastify/dist/ReactToastify.css";
import useToastifyMessage from "../../../hooks/useToastifyMessage";
import { useLocation } from "react-router-dom";

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
  daysOnly = false,
}) => {
  const hasUpdatedRef = useRef(false); // prevents duplicate API update
  const [remaining, setRemaining] = useState(null);
  const location = useLocation();

  const { remainingDaysLeft } = useRemainingDaysLeft(
    date_subscribed,
    per,
    user_id,
    session_days,
    subscriptionId,
    daysOnly
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

  // Fetch remaining days safely
  useEffect(() => {
    let isMounted = true;

    const fetchRemaining = async () => {
      try {
        const days = await remainingDaysLeft();
        if (isMounted) {
          setRemaining(days);
        }
      } catch (err) {
        console.error("Error fetching remaining days:", err);
      }
    };

    fetchRemaining();

    return () => {
      isMounted = false; // cleanup → prevent memory leak
    };
  }, [remainingDaysLeft]);

  // Handle expired users
  useEffect(() => {
    if (remaining === "Expired" && !hasUpdatedRef.current) {
      const updateStatus = async () => {
        try {
          await instance.put(`/api/user_status_update/${id}`, {
            status: "expired",
          });
          hasUpdatedRef.current = true;
          console.log("Update successful");
        } catch (error) {
          console.error("Error updating data:", error);
        }
      };

      updateStatus();

      if (location.pathname !== "/expired-users") {
        showToastMessage();
      }
    }
  }, [remaining, id, location.pathname, showToastMessage]);

  return daysOnly ? (
    remaining
  ) : (
    <>
      <h5 style={{ fontSize: "18px" }}>Subscription Remaining Days:</h5>
      <h4 style={{ fontSize, color: fontColor }}>
        {remaining ?? "Loading..."}
      </h4>
    </>
  );
};

export default RemainingDaysLeftComponent;
