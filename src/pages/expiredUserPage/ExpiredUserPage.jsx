import { PageName } from "../../constants/enum";
import DashboardPage from "../DashboardPage";
import "./expiredUserPage.scss";

const ExpiredUserPage = () => {
  return (
    <DashboardPage dashboardBg="expiredUser" page={PageName.EXPIRED_USER} />
  );
};

export default ExpiredUserPage;
