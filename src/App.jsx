import "./assets/css/style.css";
import "./assets/css/myStyle.css";

import "./assets/css/font-awesome.min.css";
import "./assets/css/bootstrap.min.css";

import DashboardPage from "./pages/DashboardPage";
import { PageName } from "./constants/enum";

function App() {
  return (
    <>
      {/* page dashboard */}
      <DashboardPage dashboardBg="dashboard" page={PageName.DASHBOARD} />
      {/* end page dashboard */}
    </>
  );
}

export default App;
