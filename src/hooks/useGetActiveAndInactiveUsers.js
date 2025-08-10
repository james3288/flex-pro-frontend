import { useQuery } from "@tanstack/react-query";
import getActiveAndInactiveUsers from "../getData/getActiveAndInactiveUsers";

const useGetActiveAndInactiveUsers = () => {
  const queryKey = ["forActiveAndInactiveUsers"];
  const { isPending, error, data, fetchStatus, isLoading } = useQuery({
    queryKey,
    queryFn: async () => {
      const activeAndInactiveUsers = await getActiveAndInactiveUsers(); //getActiveUser();

      return {
        activeAndInactiveUsers: activeAndInactiveUsers,
      };
    },
    refetchOnWindowFocus: false,
    // refetchInterval: 1000,
  });

  return { isPending, data, fetchStatus, isLoading };
};

export default useGetActiveAndInactiveUsers;
