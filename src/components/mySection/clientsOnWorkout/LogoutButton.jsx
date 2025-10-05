import React, { useState, useCallback } from "react";
import UserLogout from "../clientsOnline/userLogout";
import LoadingEffect from "../loadingEffect/LoadingEffect";

const LogoutButton = React.memo(
  ({ onlineOfflineBtnClass, time_in, id, yearValidation }) => {
    const [isButtonLoading, setIsButtonLoading] = useState(false);

    // Memoized logout handler
    const handleLogout = useCallback(async () => {
      setIsButtonLoading(true);
      try {
        await UserLogout(time_in, id);
      } catch (error) {
        console.error("Error during logout:", error);
      } finally {
        setIsButtonLoading(false);
      }
    }, [time_in, id]);

    if (yearValidation !== 1990) return null;

    return isButtonLoading ? (
      <LoadingEffect />
    ) : (
      <button
        className={onlineOfflineBtnClass}
        onClick={handleLogout}
        disabled={isButtonLoading}
      >
        Logout
      </button>
    );
  }
);

export default LogoutButton;
