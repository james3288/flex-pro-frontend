import { PageName } from "../../constants/enum";
import DashboardPage from "../DashboardPage";
import "./userHistoryPage.scss";

const UserHistoryPage = () => {
  return (
    <DashboardPage dashboardBg="userHistoryPage" page={PageName.USER_HISTORY} />
  );
};

export default UserHistoryPage;
