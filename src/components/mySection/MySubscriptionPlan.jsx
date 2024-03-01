import React, { useEffect, useState } from "react";
import instance from "../../others/axiosInstance";
import ListOfSubscriptions from "./Subscriptions/ListOfSubscriptions";

const MySubscriptionPlan = () => {
  const [plans, setPlan] = useState([]);

  const get_subscription = async () => {
    const response = await instance.get(`/api/subscription/`);
    // console.log(response.data);
    setPlan(response.data);
  };

  useEffect(() => {
    get_subscription();
  }, []);

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
          {plans.map((plan) => (
            <ListOfSubscriptions
              plan={plan}
              key={plan.id}
              option={true}
              per={plan.per.per}
            />
          ))}
        </div>
      </div>

      {/* <!-- Pricing Section End --> */}
    </>
  );
};

export default MySubscriptionPlan;
