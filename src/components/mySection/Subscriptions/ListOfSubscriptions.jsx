import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";

const ListOfSubscriptions = ({ plan, option, per }) => {
  return (
    <>
      <div className="col-lg-4 col-md-8">
        <div className="ps-item">
          <h3>{plan.gym_rate_desc}</h3>
          <div className="pi-price">
            <h2>{plan.rate.toLocaleString()}</h2>
            <span>per {per}</span>
          </div>
          <ul>
            {plan.packages_details.map((p) => (
              <li key={p.id}>{p.packages_details}</li>
            ))}
          </ul>
          {option && (
            <NavLink
              className="primary-btn pricing-btn"
              to={`/subscribed-now/?q=${plan.id}`}
            >
              Subscribed Now
            </NavLink>
          )}
          <button className="btn btn-danger" style={{ marginTop: "10px" }}>
            Edit
          </button>
        </div>
      </div>
    </>
  );
};

export default ListOfSubscriptions;
