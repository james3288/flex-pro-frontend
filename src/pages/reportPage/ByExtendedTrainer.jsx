import React, { memo } from "react";
import { shallow } from "zustand/shallow";
import { useReportStore } from "../../store/useReportStore";
import FormatDateOnly from "../../others/FormatDateOnly";

/* ======================================================
   Utilities
====================================================== */

const formatDaysLabel = (days) => {
  if (!days) return "0 days";
  return `${days} ${days > 1 ? "days" : "day"}`;
};

const formatCurrency = (value) => Number(value ?? 0).toLocaleString();

/* ======================================================
   Row Component (Memoized)
====================================================== */

const ExtendedTrainerRow = memo(({ item, index }) => {
  const {
    id,
    user,
    date_extend,
    gym_rate_desc,
    trainer,
    extended_session_day,
    rate_per_session,
    trainer_rate,
  } = item;

  const formattedDate = FormatDateOnly(date_extend);
  const daysLabel = formatDaysLabel(extended_session_day);
  const formattedTrainerRate = formatCurrency(trainer_rate);

  return (
    <div className="row body">
      <div className="col-1">
        <div className="body-col">{index + 1}</div>
      </div>

      <div className="col-2">
        <div className="body-col">{user}</div>
      </div>

      <div className="col-1">
        <div className="body-col">{formattedDate}</div>
      </div>

      <div className="col-2">
        <div className="body-col">{gym_rate_desc}</div>
      </div>

      <div className="col-2">
        <div className="body-col">{trainer}</div>
      </div>

      <div className="col-2">
        <div className="body-col">{daysLabel}</div>
      </div>

      <div className="col-1">
        <div className="body-col">{rate_per_session}</div>
      </div>

      <div className="col-1">
        <div className="body-col">{formattedTrainerRate}</div>
      </div>
    </div>
  );
});

/* ======================================================
   Main Component
====================================================== */

const ByExtendedTrainer = () => {
  const reportData = useReportStore(
    (state) => state.extendedTrainerReport,
    shallow,
  );

  if (!reportData?.length) return null;

  return reportData.map((item, index) => (
    <ExtendedTrainerRow
      key={item?.id ?? `${index}-${item?.date_extend}`}
      item={item}
      index={index}
    />
  ));
};

export default memo(ByExtendedTrainer);
