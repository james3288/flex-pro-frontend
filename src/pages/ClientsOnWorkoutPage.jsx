import React from "react";
import MyHeader from "../components/myHeader/MyHeader";
import DashboardPage from "./DashboardPage";


const ClientsOnWorkoutPage = () => {
  return (
    <>
      <MyHeader />
      <DashboardPage dashboardBg="clientsOnWorkout" page="clientsOnWorkout" />
    </>
  );
};

export default ClientsOnWorkoutPage;
