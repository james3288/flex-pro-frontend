import { NavLink } from "react-router-dom";
import useExpiredUserDatas from "../hooks/useExpiredUserDatas";
const ExpiredUserComponent = () => {
  return (
    <div className="col-lg-3 col-xs-12">
      <div className="dashboard-col">
        <h3 style={{ color: "yellowGreen" }}>
          EXPIRED USER <span>0</span>
        </h3>
        <div className="scrollable-list-of-user"></div>
      </div>
      <NavLink className="btn btn-danger" to="/expired-users">
        View More
      </NavLink>
    </div>
  );
};

export default ExpiredUserComponent;

//ExpiredUserComponent
