import { PageName } from "../../constants/enum";
import DashboardPage from "../DashboardPage";
import "./trainerHistoryPage.scss";

const TrainerHistoryPage = () => {
  return (
    <DashboardPage
      dashboardBg="trainerHistoryPage"
      page={PageName.TRAINOR_HISTORY_PAGE}
    />
  );
};

export default TrainerHistoryPage;
