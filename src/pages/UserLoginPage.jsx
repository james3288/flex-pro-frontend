import React from "react";
import DashboardPage from "./DashboardPage";
import MyHeader from "../components/myHeader/MyHeader";

const UserLoginPage = () => {
  return (
    <>
      {/* Header */}
      <MyHeader />
      {/* End Header */}
      <DashboardPage dashboardBg="userLogin" page="userLogin" />
    </>
  );
};

export default UserLoginPage;
