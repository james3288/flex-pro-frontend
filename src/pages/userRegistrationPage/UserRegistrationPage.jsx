import React, { useState } from "react";
import DashboardPage from "../DashboardPage";
import MyHeader from "../../components/myHeader/MyHeader";
import "./userRegistrationPage.scss";

import MyLeftSideMenu from "../../components/myLeftSideMenu/MyLeftSideMenu";

const UserRegistrationPage = () => {
  const [formDone, setFormDone] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    weights: "",
    contact_number: "",
    contact_number_ioe: "",
    agreements: [],
    folder: "http://localhost:5173/",
  });

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
      {/* page user registration */}
      <DashboardPage
        dashboardBg="userRegistration"
        page="userRegistration"
        formDone={formDone}
        setFormDone={setFormDone}
        formData={formData}
        setFormData={setFormData}
      />
      {/* end user registration */}

      <DashboardPage
        dashboardBg="userImageRegistration"
        page="userImageRegistration"
        formDone={formDone}
        setFormDone={setFormDone}
        formData={formData}
        setFormData={setFormData}
      />
    </>
  );
};

export default UserRegistrationPage;
