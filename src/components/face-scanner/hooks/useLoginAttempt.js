import { useEffect, useState } from "react";
import { useCurrentlyLoginStore } from "../store/currentlyLoginStore";

const useLoginAttempt = () => {
  const [isThisYourFace, setIsThisYourFace] = useState(false);

  const validLoginAttempt = 5;
  const [cLoginAttempt, cSetIsFound, cIsFound] = useCurrentlyLoginStore(
    (state) => [
      state.loginAttempt,
      state.setLoginAttempt,
      state.setIsFound,
      state.isFound,
    ]
  );

  useEffect(() => {
    if (validLoginAttempt === cLoginAttempt) {
      setIsThisYourFace(true);
      if (!cIsFound) cSetIsFound(true);
    }
  }, [cIsFound, cLoginAttempt, isThisYourFace]);

  return { isThisYourFace, setIsThisYourFace };
};

export default useLoginAttempt;
