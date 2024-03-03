import React from "react";
import DashboardPage from "../DashboardPage";
import MyHeader from "../../components/myHeader/MyHeader";
import "./subscribedNow.scss";

const SubscribedNow = () => {
  return (
    <>
      {/* Header */}
      <MyHeader />
      {/* End Header */}
      <DashboardPage dashboardBg="subscribeNow" page="subscribeNow" />
    </>
  );
};

export default SubscribedNow;
