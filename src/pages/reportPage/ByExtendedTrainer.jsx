import React from "react";
import { useReportStore } from "../../store/useReportStore";
import FormatDateOnly from "../../others/FormatDateOnly";

const ByExtendedTrainer = () => {
  const cExtendedTrainerReport = useReportStore(
    (state) => state.extendedTrainerReport
  );

  return cExtendedTrainerReport?.map((item, index) => (
    <>
      <div className="row body" key={item?.id}>
        <div className="col-1">
          <div className="body-col">{index + 1}</div>
        </div>
        <div className="col-2">
          <div className="body-col">{item?.user}</div>
        </div>
        <div className="col-1">
          <div className="body-col">{FormatDateOnly(item?.date_extend)}</div>
        </div>
        <div className="col-2">
          <div className="body-col">{item?.gym_rate_desc}</div>
        </div>
        <div className="col-2">
          <div className="body-col">{item?.trainer}</div>
        </div>
        <div className="col-2">
          <div className="body-col">
            {item?.extended_session_day}{" "}
            {item?.extended_session_day > 1 ? "days" : "day"}
          </div>
        </div>
        <div className="col-1">
          <div className="body-col">{item?.rate_per_session}</div>
        </div>
        <div className="col-1">
          <div className="body-col">{item?.trainer_rate?.toLocaleString()}</div>
        </div>
      </div>
    </>
  ));
};

export default ByExtendedTrainer;
