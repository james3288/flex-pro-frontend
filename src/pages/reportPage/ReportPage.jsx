import React, { useMemo, useState, useCallback } from "react";
import "./reportPage.scss";
import logo from "./../../assets/img/logo-2.png";

import GenerateReportModal from "../../components/modals/GenerateReportModal";
import ReportsFilterModal from "../../components/modals/ReportsFilterModal";

import ByAll from "./ByAll";
import ByExtendedTrainer from "./ByExtendedTrainer";
import ByFreeTrainer from "./ByFreeTrainer";
import ByClientsOnWorkout from "./ByClientsOnWorkout";

import getter from "../../getter/getter";

/* =========================================================
   Subscription Configuration (Single Source of Truth)
========================================================= */

const SUBSCRIPTION_CONFIG = {
  all: {
    columns: [
      { label: "#", col: 1 },
      { label: "User", col: 2 },
      { label: "Date Subscribed", col: 2 },
      { label: "Subscription", col: 2 },
      { label: "Free Trainer", col: 2 },
      { label: "Rate", col: 1 },
      { label: "Days/Month", col: 2 },
    ],
    BodyComponent: ByAll,
  },
  "free-trainer": {
    columns: [
      { label: "#", col: 1 },
      { label: "User", col: 2 },
      { label: "Date Subscribed", col: 2 },
      { label: "Subscription", col: 2 },
      { label: "Free Trainer", col: 2 },
      { label: "Trainer Session Days", col: 1 },
      { label: "Subscription Rate", col: 2 },
    ],
    BodyComponent: ByFreeTrainer,
  },
  "clients-on-workout": {
    columns: [
      { label: "#", col: 1 },
      { label: "User", col: 2 },
      { label: "Date Login", col: 2 },
      { label: "Subscription", col: 2 },
      { label: "Time In", col: 2 },
      { label: "Time Out", col: 1 },
      { label: "Remaining Days Left", col: 2 },
    ],
    BodyComponent: ByClientsOnWorkout,
  },
  "extended-trainer": {
    columns: [
      { label: "#", col: 1 },
      { label: "User", col: 2 },
      { label: "Date Extend Started", col: 1 },
      { label: "Subscription", col: 2 },
      { label: "Trainer", col: 2 },
      { label: "Session Days", col: 2 },
      { label: "PT Rate", col: 1 },
      { label: "*", col: 1 },
    ],
    BodyComponent: ByExtendedTrainer,
  },
};

/* =========================================================
   Reusable Components
========================================================= */

const HeaderRow = React.memo(({ columns }) => (
  <div className="row header">
    {columns.map((column, index) => (
      <div key={index} className={`col-${column.col} header-col`}>
        {column.label}
      </div>
    ))}
  </div>
));

const GrandTotalRow = React.memo(
  ({
    subscription,
    totalIncome,
    totalExtendedTrainerSession,
    totalFreeSession,
    totalTrainerRate,
  }) => {
    const formattedIncome = useMemo(
      () => Number(totalIncome || 0).toLocaleString(),
      [totalIncome],
    );

    const formattedTrainerRate = useMemo(
      () => Number(totalTrainerRate || 0).toLocaleString(),
      [totalTrainerRate],
    );

    const renderTotalValue = () => {
      switch (subscription) {
        case "all":
          return formattedIncome;

        case "free-trainer":
          return `${totalFreeSession || 0} DAYS`;

        case "extended-trainer":
          return `${totalExtendedTrainerSession || 0} DAYS`;

        case "clients-on-workout":
          return "--";

        default:
          return null;
      }
    };

    return (
      <div className="row total">
        <div className="col-4 total-col" />
        <div className="col-2 total-col">
          <h2>TOTAL:</h2>
        </div>
        <div className="col-2 total-col">
          <h2>{renderTotalValue()}</h2>
        </div>
        <div className="col-2 total-col">
          {subscription === "extended-trainer" && (
            <h2>{formattedTrainerRate}</h2>
          )}
        </div>
      </div>
    );
  },
);

/* =========================================================
   Main Component
========================================================= */

const ReportPage = () => {
  const [showReportsModal, setShowReportsModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);

  const {
    cFreeSessionTotal,
    cTotalTrainerRate,
    cExtendedTrainerTotalSession,
    cSubscription,
    cSubscriptionTotalIncome,
    cSetModalTitle,
    cSetModalId,
  } = getter();

  const subscriptionConfig =
    SUBSCRIPTION_CONFIG[cSubscription] ||
    SUBSCRIPTION_CONFIG["extended-trainer"];

  const handleGenerateData = useCallback(() => {
    cSetModalTitle("Generate Report");
    cSetModalId("generate-report-data");
    setShowReportsModal(true);
  }, [cSetModalId, cSetModalTitle]);

  const handleFilterData = useCallback(() => {
    setShowFilterModal(true);
  }, []);

  const BodyComponent = subscriptionConfig.BodyComponent;

  return (
    <div className="container wrapper">
      {/* Banner */}
      <div className="banner">
        <img src={logo} alt="Company Logo" />
        <div>
          <button className="btn btn-primary" onClick={handleFilterData}>
            Filter
          </button>
          <button className="btn btn-danger" onClick={handleGenerateData}>
            Generate
          </button>
        </div>
      </div>

      {/* Dynamic Header */}
      <HeaderRow columns={subscriptionConfig.columns} />

      {/* Dynamic Body */}
      <BodyComponent />

      {/* Grand Total */}
      <GrandTotalRow
        subscription={cSubscription}
        totalIncome={cSubscriptionTotalIncome}
        totalExtendedTrainerSession={cExtendedTrainerTotalSession}
        totalFreeSession={cFreeSessionTotal}
        totalTrainerRate={cTotalTrainerRate}
      />

      {/* Modals */}
      <GenerateReportModal
        show={showReportsModal}
        onHide={() => setShowReportsModal(false)}
      />

      <ReportsFilterModal
        show={showFilterModal}
        onHide={() => setShowFilterModal(false)}
      />
    </div>
  );
};

export default ReportPage;
