import React from "react";

const ListOfSubscriptions = ({ plan }) => {
  return (
    <>
      <div className="col-lg-4 col-md-8">
        <div className="ps-item">
          <h3>{plan.gym_rate_desc}</h3>
          <div className="pi-price">
            <h2>{plan.rate}</h2>
            <span>GYM Rates</span>
          </div>
          <ul>
            {plan.packages_details.map((p) => (
              <li key={p.id}>{p.packages_details}</li>
            ))}
          </ul>
          <a href="#" className="primary-btn pricing-btn">
            Enroll now
          </a>
        </div>
      </div>
    </>
  );
};

export default ListOfSubscriptions;
