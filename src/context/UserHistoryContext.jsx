import { createContext, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import getUserHistory from "../getData/getUserHistory";
import getUserSubscription from "../getData/getUserSubscription";

export const UserHistoryContext = createContext();

export const UserHistoryProvider = ({ children, id }) => {
  const queryKey = useMemo(() => ["forUserSubscription1"], [id]);
  const queryKey2 = useMemo(() => ["forUserHistory1"], [id]);
  const queryKey3 = useMemo(() => ["forExtendedTrainer1"], [id]);

  const {
    isLoading: userSubscriptionPending,
    error: userSubscriptionError,
    data: data,
  } = useQuery({
    queryKey,
    queryFn: async () => await getUserSubscription(id),
    // refetchInterval: 1000,
  });

  const {
    isLoading: userHistoryPending,
    error: userHistoryError,
    data: data2,
  } = useQuery({
    queryKey2,
    queryFn: async () => await getUserHistory(id),
    // refetchInterval: 1000,
  });

  // const {
  //   isLoading: extendedTrainerPending,
  //   error: extendedTrainerError,
  //   data: data3,
  // } = useQuery({
  //   queryKey3,
  //   queryFn: () => getExtendedTrainer(id),
  //   // refetchInterval: 1000,
  // });

  const userSubscriptionDatas = {
    userSubscriptionData: data,
    pending: userSubscriptionPending,
    error: userSubscriptionError,
  };

  const userHistoryDatas = {
    userHistoryData: data2,
    pending: userHistoryPending,
    error: userHistoryError,
  };

  // const extendedTrainerDatas = {
  //   extendedTrainerData: data3,
  //   pending: extendedTrainerPending,
  //   error: extendedTrainerError,
  // };

  return (
    <UserHistoryContext.Provider
      value={{ userSubscriptionDatas, userHistoryDatas }}
    >
      {children}
    </UserHistoryContext.Provider>
  );
};
