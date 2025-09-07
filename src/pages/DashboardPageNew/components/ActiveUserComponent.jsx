import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import useDashboardDatas from "../hooks/useDashboardDatas";
import { getRemainingDaysLeft } from "../get/getRemainingDaysLeft";
import LoadingEffect from "../../../components/mySection/loadingEffect/LoadingEffect";
import useUsersWithRemainingDaysDatas from "../hooks/useUsersWithRemainingDaysDatas";
const ActiveUserComponent = () => {
  const { ActiveUsersComponent, NoOfActiveUsers } =
    useUsersWithRemainingDaysDatas();

  return (
    <div className="col-lg-3 col-xs-12">
      <div className="dashboard-col">
        <span>ACTIVE USER ({<NoOfActiveUsers />})</span>
        <ActiveUsersComponent />
      </div>
      <NavLink className="btn btn-danger" to="/active-users">
        View More
      </NavLink>
    </div>
  );
};

export default ActiveUserComponent;
