import React, { useEffect, useState } from "react";
import instance from "../../../others/axiosInstance";
import ListOfSubscriptions from "./ListOfSubscriptions";
import SubscriptionModal from "./subscriptionModal";

const MySubscriptionPlan = () => {
  const [plans, setPlan] = useState([]);
  const exempted_plans = ["DAY PASS", "DAY PASS + PT"];

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
          {plans.map(
            (plan) =>
              !exempted_plans.includes(plan?.gym_rate_desc) && (
                <ListOfSubscriptions
                  plan={plan}
                  key={plan.id}
                  option={true}
                  per={plan.per.per}
                />
              )
          )}
        </div>
      </div>
      <SubscriptionModal id="subscriptionModal" />
      {/* <!-- Pricing Section End --> */}
    </>
  );
};

export default MySubscriptionPlan;
