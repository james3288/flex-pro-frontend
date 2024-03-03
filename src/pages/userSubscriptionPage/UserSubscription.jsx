import React from "react";
import DashboardPage from "../DashboardPage";
import MyHeader from "../../components/myHeader/MyHeader";
import "./userSubscription.scss";

const UserSubscription = () => {
  return (
    <>
      {/* Header */}
      <MyHeader />
      {/* End Header */}
      <DashboardPage dashboardBg="subcriptionPlan" page="subcriptionPlan" />
    </>
  );
};

export default UserSubscription;
