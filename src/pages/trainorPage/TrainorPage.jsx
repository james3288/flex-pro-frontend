import { PageName } from "../../constants/enum";
import DashboardPage from "../DashboardPage";
import "./trainorPage.scss";

const TrainorPage = () => {
  return <DashboardPage dashboardBg="trainor" page={PageName.TRAINOR} />;
};

export default TrainorPage;
