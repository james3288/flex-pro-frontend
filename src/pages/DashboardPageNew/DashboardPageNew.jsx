import React from "react";
import "./DashboardPageNew.scss";
import "../../assets/css/style.css";
import "../../assets/css/myStyle.css";
import ActiveUserComponent from "./components/ActiveUserComponent";
import ExpiredUserComponent from "./components/ExpiredUserComponent";
import RenewalComponent from "./components/RenewalComponent";
import ClientsOnWorkoutComponent from "./components/ClientsOnWorkoutComponent";
import { DashboardProvider } from "./context/DashboardContext";

const DashboardPageNew = () => {
  return (
    <section className="hero-section">
      <div className={`hs-item set-bg dashboard`}>
        <div className="container-fluid content-margin">
          <div className="row">
            <DashboardProvider>
              <ActiveUserComponent />
              <ExpiredUserComponent />
              <ClientsOnWorkoutComponent />
              <RenewalComponent />
            </DashboardProvider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardPageNew;
