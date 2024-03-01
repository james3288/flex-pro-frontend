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
    </>
  );
}

export default App;
