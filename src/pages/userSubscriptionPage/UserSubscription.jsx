import { PageName } from "../../constants/enum";
import DashboardPage from "../DashboardPage";
import "./userSubscription.scss";

const UserSubscription = () => {
  return (
    <>
      <DashboardPage
        dashboardBg="subcriptionPlan"
        page={PageName.SUBSCRIPTION_PLAN}
      />
    </>
  );
};

export default UserSubscription;
