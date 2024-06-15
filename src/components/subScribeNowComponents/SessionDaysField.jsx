import React from "react";

const SessionDaysField = ({
  per,
  sessionDays,
  setSessionDays,
  setSubscriptionData,
}) => {
  const handleNumberOnly = (e) => {
    setSessionDays(e.target.value);

    setSubscriptionData((prev) => ({
      ...prev,
      sub_session_days: e.target.value,
    }));
  };

  const context = (
    <>
      <input
        type="text"
        placeholder="Session Days..."
        onChange={handleNumberOnly}
      />
      {isNaN(sessionDays) && (
        <label style={{ color: "red" }}>
          character is not allowed to session days field
        </label>
      )}
    </>
  );

  return per === "day" && context;
};

export default SessionDaysField;
