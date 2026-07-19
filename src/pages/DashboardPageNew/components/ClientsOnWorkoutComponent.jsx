import React from "react";
import { NavLink } from "react-router-dom";
import useOnlineUsersData from "../hooks/useOnlineUsersData";

const ClientsOnWorkoutComponent = () => {
  const { OnlineUserComponent, NoOfOnlineUsers, isLoading } =
    useOnlineUsersData();
  return (
    <div className="col-lg-3 col-xs-12">
      <div className="dashboard-col">
        <h3 style={{ color: "yellowGreen" }}>
          ONLINE USER <span>{NoOfOnlineUsers()}</span>
        </h3>
        <OnlineUserComponent />
      </div>
      <NavLink
        className="btn btn-danger"
        to="/clients-on-workout"
        style={{ display: isLoading && "none" }}
      >
        View More
      </NavLink>
    </div>
  );
};

export default ClientsOnWorkoutComponent;
