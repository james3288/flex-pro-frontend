import React, { useState } from "react";
import { useReportStore } from "../../store/useReportStore";
import FormatDateOnly from "../../others/FormatDateOnly";
import getter from "../../getter/getter";

const CustomRate = ({ option, promo_rate, defaultRate }) => {
  if (option === "promo") {
    return parseFloat(promo_rate);
  }
  return parseFloat(defaultRate);
};

const CustomPer = ({ options, per }) => {
  if (options === "promo") {
    return `${per} (PROMO)`;
  }
  return per;
};

const ByAll = React.memo(() => {
  // const cUserSubscriptionReport = useReportStore(
  //   (state) => state.userSubscriptionReport
  // );

  const { cUserSubscriptionReport } = getter();

  console.log(cUserSubscriptionReport);

  return cUserSubscriptionReport?.map((item, index) => (
    <div className="row body" key={item?.id}>
      <div className="col-1">
        <div className="body-col">{index + 1}</div>
      </div>
      <div className="col-2">
        <div className="body-col">{item?.user}</div>
      </div>
      <div className="col-2">
        <div className="body-col">{FormatDateOnly(item?.date_subscribed)}</div>
      </div>
      <div className="col-2">
        <div className="body-col">{item?.gym_rate_desc}</div>
      </div>
      <div className="col-2">
        <div className="body-col">{item?.trainer}</div>
      </div>
      <div className="col-1">
        {/*{item?.extended_session} */}
        <div className="body-col">
          <CustomRate
            option={item?.promo_option}
            promo_rate={item?.promo_rate}
            defaultRate={item?.extended_session}
          />
        </div>
      </div>
      <div className="col-2">
        <div className="body-col">
          <CustomPer options={item?.promo_option} per={item?.per} />
        </div>
      </div>
    </div>
  ));
});

export default ByAll;
