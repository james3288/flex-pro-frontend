import { createContext } from "react";
import useGetActiveAndInactiveUsers from "@hooks/useGetActiveAndInactiveUsers";

export const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const { data, isLoading, isPending, fetchStatus } =
    useGetActiveAndInactiveUsers();

  return (
    <DashboardContext.Provider
      value={{
        activeAndInactiveDatas: data,
        isLoading,
        isPending,
        fetchStatus,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
