import { NavLink } from "react-router-dom";
import Pic3 from "../../../assets/img/dummy.png";
const ExpiredUserComponent = () => {
  return (
    <div className="col-lg-3 col-xs-12">
      <div className="dashboard-col">
        <h3 style={{ color: "yellowGreen" }}>
          EXPIRED USER <span>0</span>
        </h3>
        <div className="scrollable-list-of-user">
          <div className="clients-online">
            <div className="row row2">
              <div className="col-7">
                <div className="clients-flex">
                  <h5>Coming soon</h5>

                  <p
                    style={{
                      color: "yellow",
                      fontSize: "18px",
                      lineHeight: "19px",
                    }}
                  >
                    under maintenance...
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <NavLink className="btn btn-danger" to="/expired-users">
        View More
      </NavLink>
    </div>
  );
};

export default ExpiredUserComponent;

//ExpiredUserComponent
