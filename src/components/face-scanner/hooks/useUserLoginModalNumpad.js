import React, { useCallback, useState } from "react";

const useUserLoginModalNumpad = () => {
  const [numpadResult, setNumpadResult] = useState("");
  const [userFound, setUserFound] = useState(0);
  const [flexProUserIdStorage, setFlexProUserIdStorage] = useState(0);

  const handleNumpadOnClick = (e) => {
    setNumpadResult((prev) => prev + e.target.value);
  };

  const handleDelOnClick = () => {
    setNumpadResult((prev) => prev.slice(0, -1));
  };

  const handleClearOnClick = () => {
    setNumpadResult("");
    setUserFound(undefined);
  };

  const handleEnterOnClick = useCallback(
    async ({ activeAndInactiveUsers, flexProUserId }) => {
      const newUser = await activeAndInactiveUsers?.find(
        (user) =>
          String(user.usersubscription.flexprouser?.id) ===
          String(flexProUserId)
      );

      setUserFound(newUser);
    }
  );

  const handleLoginOnclick = async () => {
    if (userFound) {
      setFlexProUserIdStorage(userFound?.usersubscription.flexprouser?.id);
    }
  };

  return {
    numpadResult,
    userFound,
    flexProUserIdStorage,
    handleNumpadOnClick,
    handleDelOnClick,
    handleClearOnClick,
    handleEnterOnClick,
    handleLoginOnclick,
  };
};

export default useUserLoginModalNumpad;
