import React from "react";
import "./forRenewalPage.scss";
import MyHeader from "../../components/myHeader/MyHeader";
import DashboardPage from "../DashboardPage";
import "./forRenewalPage.scss";

const ForRenewalPage = () => {
  return (
    <>
      <MyHeader />
      <DashboardPage dashboardBg="forRenewalUser" page="forRenewalUser" />
    </>
  );
};

export default ForRenewalPage;
