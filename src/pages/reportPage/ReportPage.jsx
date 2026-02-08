import "./reportPage.scss";
import logo from "./../../assets/img/logo-2.png";
import GenerateReportModal from "../../components/modals/GenerateReportModal";
import React, { useState } from "react";
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

const CustomDataGridviewColumn = React.memo(({ typeOfSubscription }) => {
  switch (typeOfSubscription) {
    case "all":
      return <AllSubscriptionColumnsCompontent />;
    case "free-trainer":
      return <FreeTrainerColumnsComponent />;
    case "clients-on-workout":
      return <ClientsOnWorkoutColumnsComponent />;

    default:
      return <ExtendedTrainerColumnsComponent />;
  }
});

const CustomDataGridviewBody = React.memo(({ typeOfSubscription }) => {
  switch (typeOfSubscription) {
    case "all":
      return <ByAll />;
    case "free-trainer":
      return <ByFreeTrainer />;
    case "clients-on-workout":
      return <ByClientsOnWorkout />;
    default:
      return <ByExtendedTrainer />;
  }
});

const CustomDataGridviewGrandTotal = React.memo(
  ({
    subscription,
    totalIncome,
    totalExtendedTrainerSession,
    totalFreeSession,
    totalTrainerRate,
  }) => {
    return (
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
            subscription={subscription}
            totalIncome={totalIncome?.toLocaleString()}
            freeSessionTotal={totalFreeSession}
            extendedTrainerTotalSession={totalExtendedTrainerSession}
          />
        </div>
        <div className="col-2 total-col">
          <h2>
            {subscription === "extended-trainer" &&
              totalTrainerRate.toLocaleString()}
          </h2>
        </div>
      </div>
    );
  },
);

// Main Components
const ReportPage = () => {
  const [showReportsModal, setShowReportsModal] = useState(false);
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
    setShowReportsModal(true);
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

      <CustomDataGridviewColumn typeOfSubscription={cSubscription} />
      <CustomDataGridviewBody typeOfSubscription={cSubscription} />
      <CustomDataGridviewGrandTotal
        subscription={cSubscription}
        totalIncome={cSubscriptionTotalIncome}
        totalExtendedTrainerSession={cExtendedTrainerTotalSession}
        totalFreeSession={cFreeSessionTotal}
        totalTrainerRate={cTotalTrainerRate}
      />

      <GenerateReportModal
        show={showReportsModal}
        onHide={() => setShowReportsModal(false)}
        setShowReportsModal={setShowReportsModal}
      />
    </div>
  );
};

export default ReportPage;
