import { createContext, useState } from "react";

export const ExtendedSubscriptionContext = createContext();

export const ExtendedSubscriptionProvider = ({ children }) => {
  const [subScriptions, setSubscriptions] = useState([]);

  const contextDatas = {
    subScriptions,
  };
  return (
    <ExtendedSubscriptionContext.Provider value={contextDatas}>
      {children}
    </ExtendedSubscriptionContext.Provider>
  );
};
