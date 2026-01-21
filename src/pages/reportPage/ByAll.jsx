import React, { useState } from "react";
import { useReportStore } from "../../store/useReportStore";
import FormatDateOnly from "../../others/FormatDateOnly";
import getter from "../../getter/getter";

const ByAll = () => {
  // const cUserSubscriptionReport = useReportStore(
  //   (state) => state.userSubscriptionReport
  // );

  const { cUserSubscriptionReport } = getter();

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
        <div className="body-col">{item?.extended_session}</div>
      </div>
      <div className="col-2">
        <div className="body-col">{item?.per}</div>
      </div>
    </div>
  ));
};

export default ByAll;
