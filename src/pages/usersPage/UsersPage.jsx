import { PageName } from "../../constants/enum";
import DashboardPage from "../DashboardPage";
import "./usersPage.scss";

const UsersPage = () => {
  return <DashboardPage dashboardBg="usersPage" page={PageName.USERS_PAGE} />;
};

export default UsersPage;
