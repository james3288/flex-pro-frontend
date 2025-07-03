import React, { useState } from "react";
import MyLeftSideMenu from "../myLeftSideMenu/MyLeftSideMenu";
import RightMenu from "../rightMenu/RightMenu";
import MyHeader from "../myHeader/MyHeader";

const MainLayout = ({ children }) => {
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
      <MyHeader
        setIsOpen={setIsOpen}
        setLeftMenuOpen={setLeftMenuOpen}
        setOffCanvasMenu={setOffCanvasMenu}
      />
      {/* End Header */}

      {children}
    </>
  );
};

export default MainLayout;
