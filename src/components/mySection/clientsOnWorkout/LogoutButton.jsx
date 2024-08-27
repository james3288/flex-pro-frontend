import React, { useState } from "react";
import UserLogout from "../clientsOnline/userLogout";
import LoadingEffect from "../loadingEffect/LoadingEffect";

const LogoutButton = ({
  onlineOfflineBtnClass,
  time_in,
  id,
  yearValidation,
}) => {
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  //handles logout events
  const handleLogout = async () => {
    const triggerLogout = async () => {
      const result = await UserLogout(time_in, id);
    };

    //   setRefresher((prev) => prev + 1);
    //   setTempTimeOut(formatTimeToString(Date()));

    setIsButtonLoading(true);
    await triggerLogout();
    setIsButtonLoading(false);

    console.log("logout result:", result);
  };

  return yearValidation === 1990 && isButtonLoading === false ? (
    <button className={onlineOfflineBtnClass} onClick={() => handleLogout()}>
      Logout
    </button>
  ) : (
    yearValidation === 1990 && isButtonLoading === true && <LoadingEffect />
  );
};

export default LogoutButton;
