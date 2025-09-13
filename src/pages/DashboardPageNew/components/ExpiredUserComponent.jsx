import { NavLink } from "react-router-dom";
import useExpiredUserDatas from "../hooks/useExpiredUserDatas";
const ExpiredUserComponent = () => {
  const { ExpiredUsersComponent, NoOfExpiredUsers } = useExpiredUserDatas();

  return (
    <div className="col-lg-3 col-xs-12">
      <div className="dashboard-col">
        <h3 style={{ color: "yellowGreen" }}>
          EXPIRED USER <span>{<NoOfExpiredUsers />}</span>
        </h3>
        <ExpiredUsersComponent />
      </div>
      <NavLink className="btn btn-danger" to="/active-users">
        View More
      </NavLink>
    </div>
  );
};

export default ExpiredUserComponent;

//ExpiredUserComponent
