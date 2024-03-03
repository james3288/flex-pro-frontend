import React from "react";
import MyHeader from "../../components/myHeader/MyHeader";
import DashboardPage from "../DashboardPage";
import "./clientsOnWorkout.scss";

const ClientsOnWorkoutPage = () => {
  return (
    <>
      <MyHeader />
      <DashboardPage dashboardBg="clientsOnWorkout" page="clientsOnWorkout" />
    </>
  );
};

export default ClientsOnWorkoutPage;
