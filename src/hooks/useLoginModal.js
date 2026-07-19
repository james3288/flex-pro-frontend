import React, { useState } from "react";
import getActiveAndInactiveUsers from "../getData/getActiveAndInactiveUsers";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import getActiveUsers from "../getData/getActiveUsers";
//import getActiveAndInactiveUsers from "../getData/getActiveAndInactiveUsers";

const useLoginModal = () => {
  const handleEnterOnClick = () => {
    // setIsLoading(false);
    console.log("hello");
    GETDATA();
  };

  const handleNumpadOnClick = (e) => {
    console.log(e.target.value);
  };

  const handleDelOnClick = () => {
    console.log(e.target.value());
  };

  const handleClearOnClick = () => {
    console.log(e.target.value());
  };

  return {
    handleEnterOnClick,
    handleNumpadOnClick,
    handleDelOnClick,
    handleClearOnClick,
  };
};

const GETDATA = () => {
  console.log("hello");
  const queryclient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["forActiveAndInactive"],
    queryFn: getActiveUsers(),
  });

  if (isLoading) {
    console.log("loading...");
  }

  console.log(data);
};

export default useLoginModal;
