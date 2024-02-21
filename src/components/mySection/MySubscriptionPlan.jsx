import React from "react";

const MySubscriptionPlan = () => {
  return (
    <>
      {/* <!-- Pricing Section Begin --> */}

      <div className="container content-margin">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title">
              <span>Our Plan</span>
              <h2>Choose your pricing plan</h2>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-4 col-md-8">
            <div className="ps-item">
              <h3>Day Pass</h3>
              <div className="pi-price">
                <h2>150/DAY</h2>
                <span>GYM Rates</span>
              </div>
              <ul>
                <li>Unlimited use of equipments for 1 day</li>
                <li>Free WIFI</li>
                <li>Free locker</li>
              </ul>
              <a href="#" className="primary-btn pricing-btn">
                Enroll now
              </a>
              <a href="#" className="thumb-icon">
                <i className="fa fa-picture-o"></i>
              </a>
            </div>
          </div>
          <div className="col-lg-4 col-md-8">
            <div className="ps-item">
              <h3>Platinum Access</h3>
              <div className="pi-price">
                <h2>1,500/Month</h2>
                <span>GYM Rate</span>
              </div>
              <ul>
                <li>Unlimited used of equipments for 1 month</li>
                <li>Free Personal Training session for 3 days</li>
                <li>Free WIFI</li>
                <li>Free locker</li>
              </ul>
              <a href="#" className="primary-btn pricing-btn">
                Enroll now
              </a>
              <a href="#" className="thumb-icon">
                <i className="fa fa-picture-o"></i>
              </a>
            </div>
          </div>
          <div className="col-lg-4 col-md-8">
            <div className="ps-item">
              <h3>Gold Access</h3>
              <div className="pi-price">
                <h2>15,000/Year</h2>
                <span>GYM Rates</span>
              </div>
              <ul>
                <li>Unlimited access to the gym and use of equipments</li>
                <li>Free Personal Training Session for 3 days</li>
                <li>
                  Unlimited group class session like zumba,spin class & Tabata
                  for 1 year
                </li>
                <li>Free WIFI</li>
                <li>Free locker</li>
              </ul>
              <a href="#" className="primary-btn pricing-btn">
                Enroll now
              </a>
              <a href="#" className="thumb-icon">
                <i className="fa fa-picture-o"></i>
              </a>
            </div>
          </div>
          <div className="col-lg-4 col-md-8">
            <div className="ps-item sub-wrapper">
              <h3>Personal Training Package</h3>
              <div className="pi-price">
                <span>GYM Rates</span>
              </div>
              <ul>
                <li>
                  Day pass (150) + Personal Trainer Session (150) =
                  <strong> 300/day</strong>
                </li>
                <li>
                  Platinum access (1,500) + Personal Trainer Individual (2,000)
                  = <strong>1,500/Month</strong>
                </li>
                <li>
                  Platinum access (4,500) + Personal Trainer Group (5,000) ={" "}
                  <strong>9,500/Month (3 persons)</strong>
                </li>
              </ul>
              <a href="#" className="primary-btn pricing-btn">
                Enroll now
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Pricing Section End --> */}
    </>
  );
};

export default MySubscriptionPlan;
