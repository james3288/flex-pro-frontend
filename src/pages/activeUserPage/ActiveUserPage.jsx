import React, { useState } from "react";
import "./activeUserPage.scss";
import MyHeader from "../../components/myHeader/MyHeader";
import DashboardPage from "../DashboardPage";
import RightMenu from "../../components/rightMenu/RightMenu";

const ActiveUserPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      {isOpen && <RightMenu isOpen={isOpen} />}
      <MyHeader setIsOpen={setIsOpen} />
      <DashboardPage dashboardBg="active-user" page="active-user" />
    </>
  );
};

export default ActiveUserPage;
