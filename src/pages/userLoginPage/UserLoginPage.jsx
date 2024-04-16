import React, { useState } from "react";
import DashboardPage from "../DashboardPage";
import MyHeader from "../../components/myHeader/MyHeader";
import "./userLoginPage.scss";
import MyLeftSideMenu from "../../components/myLeftSideMenu/MyLeftSideMenu";

const UserLoginPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [leftMenuOpen, setLeftMenuOpen] = useState(false);
  const [offCanvasMenu, setOffCanvasMenu] = useState(true);

  return (
    <>
      {isOpen && <RightMenu isOpen={isOpen} />}

      {/* left side menu */}
      <MyLeftSideMenu
        setLeftMenuOpen={setLeftMenuOpen}
        leftMenuOpen={leftMenuOpen}
        offCanvasMenu={offCanvasMenu}
        setOffCanvasMenu={setOffCanvasMenu}
      />

      {/* Header */}
      {/* <MyHeader
        setIsOpen={setIsOpen}
        setLeftMenuOpen={setLeftMenuOpen}
        setOffCanvasMenu={setOffCanvasMenu}
      /> */}
      {/* End Header */}
      <DashboardPage dashboardBg="userLogin" page="userLogin" />
    </>
  );
};

export default UserLoginPage;
