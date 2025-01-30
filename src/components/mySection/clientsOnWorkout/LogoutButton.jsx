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
    setIsButtonLoading(true); // Assuming you want a loading indicator
    try {
      const result = await UserLogout(time_in, id); // Call the logout function
      console.log("Logout result:", result); // Log the result
    } catch (error) {
      console.error("Error during logout:", error); // Handle potential errors
    } finally {
      setIsButtonLoading(false); // Ensure loading indicator is hidden
    }
  };

  return yearValidation === 1990 && isButtonLoading === false ? (
    <button
      className={onlineOfflineBtnClass}
      onClick={() => handleLogout()}
      disabled={isButtonLoading}
    >
      Logout
    </button>
  ) : (
    yearValidation === 1990 && isButtonLoading === true && <LoadingEffect />
  );
};

export default LogoutButton;
