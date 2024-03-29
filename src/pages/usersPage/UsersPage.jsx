import React from "react";
import MyHeader from "../../components/myHeader/MyHeader";
import DashboardPage from "../DashboardPage";
import "./usersPage.scss";
// import TrainersModal from "../../components/mySection/trainers/trainersModal";

const UsersPage = () => {
  return (
    <>
      <MyHeader />
      <DashboardPage dashboardBg="usersPage" page="usersPage" />
    </>
  );
};

export default UsersPage;
