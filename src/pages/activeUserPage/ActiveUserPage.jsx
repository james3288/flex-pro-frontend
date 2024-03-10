import React from "react";
import "./activeUserPage.scss";
import MyHeader from "../../components/myHeader/MyHeader";
import DashboardPage from "../DashboardPage";

const ActiveUserPage = () => {
  return (
    <>
      <MyHeader />
      <DashboardPage dashboardBg="active-user" page="active-user" />
    </>
  );
};

export default ActiveUserPage;
