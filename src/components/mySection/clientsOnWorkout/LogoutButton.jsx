import React, { useState, useCallback, useEffect } from "react";
import UserLogout from "../clientsOnline/userLogout";
import LoadingEffect from "../loadingEffect/LoadingEffect";
import { useLogoutStore } from "../../../store/useLogoutStore";

const LogoutButton = React.memo(
  ({
    onlineOfflineBtnClass,
    time_in,
    id,
    yearValidation,
    setLocalTimeOut,
    setIsLoggedOut,
    isFromOnlineToLogout,
  }) => {
    const [isButtonLoading, setIsButtonLoading] = useState(false);
    const [triggerLogout, trigger] = useLogoutStore((state) => [
      state.triggerLogout,
      state.trigger,
    ]);

    // Memoized logout handler
    const handleLogout = useCallback(async () => {
      // setIsButtonLoading(true);
      // triggerLogout(!trigger);

      try {
        await UserLogout(time_in, id);

        const now = new Date(); // local current time
        setLocalTimeOut(now); // update immediate UI
        setIsLoggedOut(true); // hide the button
      } catch (error) {
        console.error("Error during logout:", error);
      } finally {
        // setIsButtonLoading(false);
      }
    }, [time_in, id]);

    if (yearValidation !== 1990) return null;
    return (
      isFromOnlineToLogout() && (
        <button
          className={onlineOfflineBtnClass}
          onClick={handleLogout}
          disabled={isButtonLoading}
        >
          Logout
        </button>
      )
    );
    // return isButtonLoading ? (
    //   <LoadingEffect />
    // ) : (
    //   <button
    //     className={onlineOfflineBtnClass}
    //     onClick={handleLogout}
    //     disabled={isButtonLoading}
    //   >
    //     Logout
    //   </button>
    // );
  }
);

export default LogoutButton;
