import "./forRenewalPage.scss";

import DashboardPage from "../DashboardPage";
import "./forRenewalPage.scss";
import { PageName } from "../../constants/enum";

const ForRenewalPage = () => {
  return (
    <>
      <DashboardPage
        dashboardBg="forRenewalUser"
        page={PageName.FOR_RENEWAL_USER}
      />
    </>
  );
};

export default ForRenewalPage;
