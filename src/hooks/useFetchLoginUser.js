import { useQuery } from "@tanstack/react-query";
import useCheckIfAlreadyLogin from "../hooks/useCheckIfAlreadyLogin";
const useFetchLoginUser = ({ user_id }) => {
  const { checkIfAlreadyIn } = useCheckIfAlreadyLogin();

  const queryKey = ["forLoginUser"];
  const { isPending, error, data, fetchStatus, isLoading } = useQuery({
    queryKey,
    queryFn: async () => {
      const loginUserData = await checkIfAlreadyIn(user_id); //getActiveUser();

      return {
        loginUser: loginUserData,
      };
    },
    refetchOnWindowFocus: false,
  });
  return { loginUser: data, isLoading };
};

export default useFetchLoginUser;
