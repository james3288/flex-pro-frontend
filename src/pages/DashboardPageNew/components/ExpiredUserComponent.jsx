import React from "react";
import { NavLink } from "react-router-dom";

const ExpiredUserComponent = () => {
  return (
    <div className="col-lg-3 col-xs-12">
      <div className="dashboard-col">
        <span>EXPIRED USER</span>
        <h1 style={{ fontSize: "20px" }}>22</h1>

        <div className="scrollable-list-of-user"></div>
      </div>
      <NavLink className="btn btn-danger" to="/expired-users">
        View More
      </NavLink>
    </div>
  );
};

export default ExpiredUserComponent;
