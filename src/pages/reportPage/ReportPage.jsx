import "./reportPage.scss";
import logo from "./../../assets/img/logo-2.png";
import GenerateReportModal from "../../components/modals/GenerateReportModal";
import { useState } from "react";
import ByAll from "./ByAll";
import ByExtendedTrainer from "./ByExtendedTrainer";
import ByFreeTrainer from "./ByFreeTrainer";
import getter from "../../getter/getter";
import ByClientsOnWorkout from "./ByClientsOnWorkout";

const GrandTotalInfo = ({ children }) => {
  return <h2>{children}</h2>;
};

const GrandTotalComponent = ({
  subscription,
  totalIncome,
  freeSessionTotal,
  extendedTrainerTotalSession,
}) => {
  switch (subscription) {
    case "all":
      return <GrandTotalInfo>{totalIncome}</GrandTotalInfo>;

    case "free-trainer":
      return <GrandTotalInfo>{freeSessionTotal + " DAYS"}</GrandTotalInfo>;

    case "extended-trainer":
      return (
        <GrandTotalInfo>{extendedTrainerTotalSession + " DAYS"}</GrandTotalInfo>
      );

    case "clients-on-workout":
      return <GrandTotalInfo>{"--"}</GrandTotalInfo>;

    default:
      return null;
  }
};

const AllSubscriptionColumnsCompontent = () => {
  return (
    <div className="row header">
      <div className="col-1 header-col">#</div>
      <div className="col-2 header-col">User</div>
      <div className="col-2 header-col">Date Subscribed</div>
      <div className="col-2 header-col">Subscription</div>
      <div className="col-2 header-col">Free Trainer</div>
      <div className="col-1 header-col">Rate</div>
      <div className="col-2 header-col">Days/Month</div>
    </div>
  );
};

const FreeTrainerColumnsComponent = () => {
  return (
    <div className="row header">
      <div className="col-1 header-col">#</div>
      <div className="col-2 header-col">User</div>
      <div className="col-2 header-col">Date Subscribed</div>
      <div className="col-2 header-col">Subscription</div>
      <div className="col-2 header-col">Free Trainer</div>
      <div className="col-1 header-col">Trainer Session Days</div>
      <div className="col-2 header-col">Subscription Rate</div>
    </div>
  );
};

const ClientsOnWorkoutColumnsComponent = () => {
  return (
    <div className="row header">
      <div className="col-1 header-col">#</div>
      <div className="col-2 header-col">User</div>
      <div className="col-2 header-col">Date Login</div>
      <div className="col-2 header-col">Subscription</div>
      <div className="col-2 header-col">Time In</div>
      <div className="col-1 header-col">Time Out</div>
      <div className="col-2 header-col">Remaining Days Left</div>
    </div>
  );
};

const ExtendedTrainerColumnsComponent = () => {
  return (
    <div className="row header">
      <div className="col-1 header-col">#</div>
      <div className="col-2 header-col">User</div>
      <div className="col-1 header-col">Date Extend Started</div>
      <div className="col-2 header-col">Subscription</div>
      <div className="col-2 header-col">Trainer</div>
      <div className="col-2 header-col">Session days</div>
      <div className="col-1 header-col">PT Rate</div>
      <div className="col-1 header-col">*</div>
    </div>
  );
};

const ReportPage = () => {
  const {
    cFreeSessionTotal,
    cTotalTrainerRate,
    cExtendedTrainerTotalSession,
    cSubscription,
    cSubscriptionTotalIncome,
    cSetModalTitle,
    cSetModalId,
  } = getter();

  const [total, setTotal] = useState(0);

  const handleGenerateData = () => {
    cSetModalTitle("Generate Report");
    cSetModalId("generate-report-data");
  };

  return (
    <div className="container wrapper">
      <div className="banner">
        <img src={logo} alt="" />
        <button
          className="btn btn-danger"
          onClick={handleGenerateData}
          data-toggle="modal"
          data-target="#generate-report-data"
          data-whatever="@mdo"
        >
          Generate
        </button>
      </div>
      {cSubscription === "all" ? (
        <AllSubscriptionColumnsCompontent />
      ) : cSubscription === "free-trainer" ? (
        <FreeTrainerColumnsComponent />
      ) : cSubscription === "clients-on-workout" ? (
        <ClientsOnWorkoutColumnsComponent />
      ) : (
        <ExtendedTrainerColumnsComponent />
      )}

      {cSubscription === "all" ? (
        <ByAll />
      ) : cSubscription === "free-trainer" ? (
        <ByFreeTrainer />
      ) : cSubscription === "clients-on-workout" ? (
        <ByClientsOnWorkout />
      ) : (
        <ByExtendedTrainer />
      )}

      <div className="row total">
        <div className="col-1 total-col"></div>
        <div className="col-1 total-col"></div>
        <div className="col-2 total-col"></div>
        <div className="col-2 total-col"></div>
        <div className="col-2 total-col">
          <h2>TOTAL:</h2>
        </div>
        <div className="col-2 total-col">
          <GrandTotalComponent
            subscription={cSubscription}
            totalIncome={cSubscriptionTotalIncome?.toLocaleString()}
            freeSessionTotal={cFreeSessionTotal}
            extendedTrainerTotalSession={cExtendedTrainerTotalSession}
          />
        </div>
        <div className="col-2 total-col">
          <h2>
            {cSubscription === "extended-trainer" &&
              cTotalTrainerRate.toLocaleString()}
          </h2>
        </div>
      </div>

      <GenerateReportModal />
    </div>
  );
};

export default ReportPage;
