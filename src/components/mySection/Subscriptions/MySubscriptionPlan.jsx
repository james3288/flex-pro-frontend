import React, { useEffect, useState } from "react";
import instance from "../../../others/axiosInstance";
import ListOfSubscriptions from "./ListOfSubscriptions";
import SubscriptionModal from "./subscriptionModal";

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
              {/* <button
                className="btn btn-primary"
                data-toggle="modal"
                data-target="#subscriptionModal"
                data-whatever="@mdo"
              >
                Add Pricing Plan
              </button> */}
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
      <SubscriptionModal id="subscriptionModal" />
      {/* <!-- Pricing Section End --> */}
    </>
  );
};

export default MySubscriptionPlan;
