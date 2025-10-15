import React from "react";
import { NavLink } from "react-router-dom";
import useUsersRenewal from "../hooks/useUsersRenewal";

const RenewalComponent = () => {
  const { ActiveUsersComponent, NoOfActiveUsers } = useUsersRenewal();

  return (
    <div className="col-lg-3 col-xs-12">
      <div className="dashboard-col">
        <h3 style={{ color: "yellowGreen" }}>
          RENEWAL USER <span>{<NoOfActiveUsers />}</span>
        </h3>
        <ActiveUsersComponent />
      </div>
      <NavLink className="btn btn-danger" to="/for-renewal-users">
        View More
      </NavLink>
    </div>
  );
};

export default RenewalComponent;
