import { useQuery } from "@tanstack/react-query";
import getExtendedTrainer from "../getData/getExtendedTrainer";

const useGetTotalExtendedRemainingDays = (
  userId,
  options = {},
) => {

  const queryKey = ["totalExtendedRemainingDaysQuery", userId];

  const { data, isLoading, error, isFetching } = useQuery({
    queryKey,
    queryFn: async () => {
      console.log(userId);
      const extendedTrainerResult = await getExtendedTrainer(userId);

      console.log(extendedTrainerResult);

      return {
        extendedTrainerResult,
      };
    },
    refetchInterval: 1000,
  });

  return {
    data,
    isLoading,
    isFetching,
    error
  };
};

export default useGetTotalExtendedRemainingDays;
