import "./activeUserPage.scss";
import DashboardPage from "../DashboardPage";
import { PageName } from "../../constants/enum";

const ActiveUserPage = () => {
  return (
    <>
      <DashboardPage dashboardBg="active-user" page={PageName.ACTIVE_USER} />
    </>
  );
};

export default ActiveUserPage;
