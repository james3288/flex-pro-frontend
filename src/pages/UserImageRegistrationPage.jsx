import React from "react";
import DashboardPage from "./DashboardPage";
import MyHeader from "../components/myHeader/MyHeader";

const UserImageRegistrationPage = () => {
  return (
    <>
      {/* Header */}
      <MyHeader />
      {/* End Header */}
      <DashboardPage
        dashboardBg="userImageRegistration"
        page="userImageRegistration"
      />
    </>
  );
};

export default UserImageRegistrationPage;
