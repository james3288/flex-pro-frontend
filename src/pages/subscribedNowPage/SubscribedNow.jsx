import { PageName } from "../../constants/enum";
import DashboardPage from "../DashboardPage";
import "./subscribedNow.scss";

const SubscribedNow = () => {
  return (
    <>
      <DashboardPage dashboardBg="subscribeNow" page={PageName.SUBSCRIBE_NOW} />
    </>
  );
};

export default SubscribedNow;
