import { useState } from "react";

import "./assets/css/style.css";
import "./assets/css/myStyle.css";

import "./assets/css/font-awesome.min.css";
import "./assets/css/bootstrap.min.css";

import MyHeader from "./components/myHeader/MyHeader";
import MySection from "./components/mySection/MyDashboardSection";
import DashboardPage from "./pages/DashboardPage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* Header */}
      <MyHeader />
      {/* End Header */}

      {/* page dashboard */}
      <DashboardPage dashboardBg="dashboard" page="dashboard" />
      {/* end page dashboard */}

      {/* page user registration */}
      {/* <DashboardPage dashboardBg="userRegistration" page="userRegistration" /> */}
      {/* end user registration */}

      {/* page user image registration */}
      {/* <DashboardPage
        dashboardBg="userImageRegistration"
        page="userImageRegistration"
      /> */}
      {/* end user image registration */}

      {/* page user image registration */}
      {/* <DashboardPage dashboardBg="userLogin" page="userLogin" /> */}
      {/* end user image registration */}

      {/* page user image registration */}
      {/* <DashboardPage dashboardBg="subcriptionPlan" page="subcriptionPlan" /> */}
      {/* end user image registration */}
    </>
  );
}

export default App;
