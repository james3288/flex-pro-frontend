import React, { useContext } from "react";
import { DashboardContext } from "../context/DashboardContext";

const useDashboardDatas = () => {
  const context = useContext(DashboardContext);
  return context;
};

export default useDashboardDatas;
