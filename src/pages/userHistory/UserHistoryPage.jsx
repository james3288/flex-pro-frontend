import React from "react";
import MyHeader from "../../components/myHeader/MyHeader";
import DashboardPage from "../DashboardPage";
import "./userHistoryPage.scss";
// import TrainersModal from "../../components/mySection/trainers/trainersModal";

const UserHistoryPage = () => {
  return (
    <>
      <MyHeader />
      <DashboardPage dashboardBg="userHistoryPage" page="userHistoryPage" />
    </>
  );
};

export default UserHistoryPage;
