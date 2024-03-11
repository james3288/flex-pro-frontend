import React from "react";
import MyHeader from "../../components/myHeader/MyHeader";
import DashboardPage from "../DashboardPage";
import "./trainorPage.scss";
import TrainersModal from "../../components/mySection/trainers/trainersModal";

const TrainorPage = () => {
  return (
    <>
      <MyHeader />
      <DashboardPage dashboardBg="trainor" page="trainor" />
    </>
  );
};

export default TrainorPage;
