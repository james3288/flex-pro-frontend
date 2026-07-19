// import React, { useState } from "react";
import { PageName } from "../../constants/enum";
import DashboardPage from "../DashboardPage";
// import MyHeader from "../../components/myHeader/MyHeader";
import "./userLoginPage.scss";
const UserDaypassLoginPage = () => {
  return (
    <>
      <DashboardPage
        dashboardBg="userDaypassLogin"
        page={PageName.USER_DAYPASS_LOGIN}
      />
    </>
  );
};

export default UserDaypassLoginPage;
