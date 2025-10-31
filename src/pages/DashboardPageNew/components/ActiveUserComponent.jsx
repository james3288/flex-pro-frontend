import { NavLink } from "react-router-dom";
import useUsersWithRemainingDaysDatas from "../hooks/useUsersWithRemainingDaysDatas";

const ActiveUserComponent = () => {
  const { ActiveUsersComponent, NoOfActiveUsers, isLoading } =
    useUsersWithRemainingDaysDatas();

  return (
    <div className="col-lg-3 col-xs-12">
      <div className="dashboard-col">
        <h3 style={{ color: "yellowGreen" }}>
          ACTIVE USER <span>{<NoOfActiveUsers />}</span>
        </h3>
        <ActiveUsersComponent />
      </div>
      <NavLink
        className="btn btn-danger"
        to="/active-users"
        style={{ display: isLoading && "none" }}
      >
        View More
      </NavLink>
    </div>
  );
};

export default ActiveUserComponent;
