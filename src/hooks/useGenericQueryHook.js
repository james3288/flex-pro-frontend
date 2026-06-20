import { useQuery } from "@tanstack/react-query";

import fetchGenericData from "../getData/fetchGenericData";
import processGenericData from "../others/processGenericData";

const useGenericQueryHook = (
  paramA,
  paramB,
  resourceId,
  options = {},
) => {
  const normalizedParamB = paramB === 0 ? 1 : paramB;

  const queryKey = ["genericQuery", resourceId, normalizedParamB];

  const { data, isLoading, error, isFetching } = useQuery({
    queryKey,
    queryFn: async () => {
      const [rawData, processed] = await Promise.all([
        fetchGenericData(resourceId),
        processGenericData(paramA, normalizedParamB),
      ]);

      return {
        rawData,
        processed,
      };
    },
    staleTime: 1000 * 60,
    refetchOnWindowFocus: true,
    retry: 1,
  });

  const getResult = async () => {
    if (!data) return null;
    return {
      ...data,
      combined: {
        ...data.rawData,
        processed: data.processed,
      },
    };
  };

  return {
    data,
    isLoading,
    isFetching,
    error,
    getResult,
  };
};

export default useGenericQueryHook;
