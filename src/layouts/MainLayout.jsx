import { useState } from "react";
import MyHeader from "../components/myHeader/MyHeader";
import MyLeftSideMenu from "../components/myLeftSideMenu/MyLeftSideMenu";
import RightMenu from "../components/rightMenu/RightMenu";

const MainLayoutNew = ({ children }) => {
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

export default MainLayoutNew;
