import React from "react";
import { useReportStore } from "../../store/useReportStore";
import FormatDateOnly from "../../others/FormatDateOnly";

const ByAll = () => {
  const cUserSubscriptionReport = useReportStore(
    (state) => state.userSubscriptionReport
  );

  return cUserSubscriptionReport?.map((item) => (
    <>
      <div className="row body" key={item?.id}>
        <div className="col-2">
          <div className="body-col">{item?.user}</div>
        </div>
        <div className="col-2">
          <div className="body-col">
            {FormatDateOnly(item?.date_subscribed)}
          </div>
        </div>
        <div className="col-2">
          <div className="body-col">{item?.gym_rate_desc}</div>
        </div>
        <div className="col-2">
          <div className="body-col">{item?.trainer}</div>
        </div>
        <div className="col-2">
          <div className="body-col">{item?.rate?.toLocaleString()}</div>
        </div>
        <div className="col-2">
          <div className="body-col">{item?.per}</div>
        </div>
      </div>
    </>
  ));
};

export default ByAll;
