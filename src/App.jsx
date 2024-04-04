import { useEffect, useState } from "react";

import "./assets/css/style.css";
import "./assets/css/myStyle.css";

import "./assets/css/font-awesome.min.css";
import "./assets/css/bootstrap.min.css";

import MyHeader from "./components/myHeader/MyHeader";
import MySection from "./components/mySection/MyDashboardSection";
import DashboardPage from "./pages/DashboardPage";
import RightMenu from "./components/rightMenu/RightMenu";
import MyLeftSideMenu from "./components/myLeftSideMenu/MyLeftSideMenu";

function App() {
  const [count, setCount] = useState(0);
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

      {/* page dashboard */}
      <DashboardPage dashboardBg="dashboard" page="dashboard" />
      {/* end page dashboard */}
    </>
  );
}

export default App;
