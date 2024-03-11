import React, { useState } from "react";
import MyHeader from "../../components/myHeader/MyHeader";
import DashboardPage from "../DashboardPage";
import "./clientsOnWorkout.scss";
import RightMenu from "../../components/rightMenu/RightMenu";

const ClientsOnWorkoutPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      {isOpen && <RightMenu isOpen={isOpen} />}
      <MyHeader setIsOpen={setIsOpen} />
      <DashboardPage dashboardBg="clientsOnWorkout" page="clientsOnWorkout" />
    </>
  );
};

export default ClientsOnWorkoutPage;
