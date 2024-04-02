import React from "react";
import MyHeader from "../../components/myHeader/MyHeader";
import DashboardPage from "../DashboardPage";
import "./trainerHistoryPage.scss";
// import TrainersModal from "../../components/mySection/trainers/trainersModal";

const TrainerHistoryPage = () => {
  return (
    <>
      <MyHeader />
      <DashboardPage
        dashboardBg="trainerHistoryPage"
        page="trainerHistoryPage"
      />
    </>
  );
};

export default TrainerHistoryPage;
