import { useQuery } from "@tanstack/react-query";
import getRenewalUsers from "@pages/DashboardPageNew/get/getRenewalUsers";
const useGetRenewalUsers = () => {
  const queryKey = ["forActiveAndInactiveUsers"];
  const { isPending, error, data, fetchStatus, isLoading } = useQuery({
    queryKey,
    queryFn: async () => {
      const renewalUsers = await getRenewalUsers(); //getActiveUser();

      return {
        renewalUsers: renewalUsers,
      };
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    // refetchInterval: 1000,
  });

  return {
    isPending,
    renewalData: data,
    fetchStatus,
    renewalDataIsLoading: isLoading,
  };
};

export default useGetRenewalUsers;
