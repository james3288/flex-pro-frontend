import React, { useState } from "react";
import MyHeader from "../../components/myHeader/MyHeader";
import DashboardPage from "../DashboardPage";
import "./usersPage.scss";
import MyLeftSideMenu from "../../components/myLeftSideMenu/MyLeftSideMenu";
// import TrainersModal from "../../components/mySection/trainers/trainersModal";

const UsersPage = () => {
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
      <DashboardPage dashboardBg="usersPage" page="usersPage" />
    </>
  );
};

export default UsersPage;
