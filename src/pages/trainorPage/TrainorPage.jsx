import React from "react";
import MyHeader from "../../components/myHeader/MyHeader";
import DashboardPage from "../DashboardPage";
import "./trainorPage.scss";
const TrainorPage = () => {
  return (
    <>
      <MyHeader />
      <DashboardPage dashboardBg="trainor" page="trainor" />
    </>
  );
};

export default TrainorPage;
