import React from "react";
import { NavLink } from "react-router-dom";

const RenewalComponent = () => {
  return (
    <div className="col-lg-3 col-xs-12">
      <div className="dashboard-col">
        <span>FOR RENEWAL</span>

        <h1>22</h1>

        <div className="scrollable-list-of-user"></div>
      </div>
      <NavLink className="btn btn-danger" to="/for-renewal-users">
        View More
      </NavLink>
    </div>
  );
};

export default RenewalComponent;
