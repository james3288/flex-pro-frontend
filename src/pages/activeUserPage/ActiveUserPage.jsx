import React, { useState } from "react";
import "./activeUserPage.scss";
import MyHeader from "../../components/myHeader/MyHeader";
import DashboardPage from "../DashboardPage";
import RightMenu from "../../components/rightMenu/RightMenu";
import MyLeftSideMenu from "../../components/myLeftSideMenu/MyLeftSideMenu";

const ActiveUserPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [leftMenuOpen, setLeftMenuOpen] = useState(false);
  const [offCanvasMenu, setOffCanvasMenu] = useState(true);
  return (
    <>
      {/* left side menu */}
      <MyLeftSideMenu
        setLeftMenuOpen={setLeftMenuOpen}
        leftMenuOpen={leftMenuOpen}
        offCanvasMenu={offCanvasMenu}
        setOffCanvasMenu={setOffCanvasMenu}
      />

      {/* Header */}
      <MyHeader
        setIsOpen={setIsOpen}
        setLeftMenuOpen={setLeftMenuOpen}
        setOffCanvasMenu={setOffCanvasMenu}
      />
      {/* End Header */}
      <DashboardPage dashboardBg="active-user" page="active-user" />
    </>
  );
};

export default ActiveUserPage;
