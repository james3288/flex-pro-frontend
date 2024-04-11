import { createContext, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import getAgreements from "../getData/getAgreements";

export const AgreementContext = createContext();

export const AgreementProvider = ({ children }) => {
  const queryKey = useMemo(() => ["forUserAgreement"], []);

  const {
    isLoading: agreementPending,
    error: agreementError,
    data: data,
  } = useQuery({
    queryKey,
    queryFn: () => getAgreements(),
    // refetchInterval: 1000,
  });

  const agreementDatas = {
    agreementData: data,
    pending: agreementPending,
    error: agreementError,
  };

  return (
    <AgreementContext.Provider value={{ agreementDatas }}>
      {children}
    </AgreementContext.Provider>
  );
};
