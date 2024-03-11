import React, { useState } from "react";
import "./forRenewalPage.scss";
import MyHeader from "../../components/myHeader/MyHeader";
import DashboardPage from "../DashboardPage";
import "./forRenewalPage.scss";
import RightMenu from "../../components/rightMenu/RightMenu";

const ForRenewalPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      {isOpen && <RightMenu isOpen={isOpen} />}
      <MyHeader setIsOpen={setIsOpen} />
      <DashboardPage dashboardBg="forRenewalUser" page="forRenewalUser" />
    </>
  );
};

export default ForRenewalPage;
