import React from "react";
import { NavLink } from "react-router-dom";

const ClientsOnWorkoutComponent = () => {
  return (
    <div className="col-lg-3 col-xs-12">
      <div className="dashboard-col">
        <span>CLIENTS ON WORKOUT</span>
        <h1>22</h1>

        <div className="scrollable-list-of-user"></div>
      </div>
      <NavLink className="btn btn-danger" to="/clients-on-workout">
        View More
      </NavLink>
    </div>
  );
};

export default ClientsOnWorkoutComponent;
