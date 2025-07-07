import { PageName } from "../../constants/enum";
import DashboardPage from "../DashboardPage";
import "./clientsOnWorkout.scss";

const ClientsOnWorkoutPage = () => {
  return (
    <>
      <DashboardPage
        dashboardBg="clientsOnWorkout"
        page={PageName.CLIENTS_ON_WORKOUT}
      />
    </>
  );
};

export default ClientsOnWorkoutPage;
