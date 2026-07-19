import { useQuery } from "@tanstack/react-query";
import useCheckIfAlreadyLogin from "../hooks/useCheckIfAlreadyLogin";
import { useEffect, useState } from "react";
const useFetchLoginUser = ({ user_id }) => {
  const { checkIfAlreadyIn } = useCheckIfAlreadyLogin();

  const queryKey = ["forLoginUser", user_id];
  const { isPending, error, data, fetchStatus, isLoading } = useQuery({
    queryKey,
    queryFn: async () => {
      const loginUserData = await checkIfAlreadyIn(user_id); //getActiveUser();

      return {
        loginUser: loginUserData,
      };
    },
  });

  return { loginUser: data };

  // return { loginUser: data, isLoading };
};

export default useFetchLoginUser;
