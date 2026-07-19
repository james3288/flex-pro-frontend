import React, { memo } from "react";
import { shallow } from "zustand/shallow";
import { useReportStore } from "../../store/useReportStore";
import FormatDateOnly from "../../others/FormatDateOnly";

/* ======================================================
   Utility Helpers
====================================================== */

const formatDaysLabel = (days) => {
  if (!days) return "0 days";
  return `${days} ${days > 1 ? "days" : "day"}`;
};

const formatCurrency = (value) => Number(value ?? 0).toLocaleString();

/* ======================================================
   Row Component (Memoized)
====================================================== */

const FreeTrainerRow = memo(({ item, index }) => {
  const {
    id,
    user,
    date_subscribed,
    gym_rate_desc,
    trainer,
    free_session_days,
    rate,
  } = item;

  const formattedDate = FormatDateOnly(date_subscribed);
  const daysLabel = formatDaysLabel(free_session_days);
  const formattedRate = formatCurrency(rate);

  return (
    <div className="row body">
      <div className="col-1">
        <div className="body-col">{index + 1}</div>
      </div>

      <div className="col-2">
        <div className="body-col">{user}</div>
      </div>

      <div className="col-2">
        <div className="body-col">{formattedDate}</div>
      </div>

      <div className="col-2">
        <div className="body-col">{gym_rate_desc}</div>
      </div>

      <div className="col-2">
        <div className="body-col">{trainer}</div>
      </div>

      <div className="col-1">
        <div className="body-col">{daysLabel}</div>
      </div>

      <div className="col-2">
        <div className="body-col">{formattedRate}</div>
      </div>
    </div>
  );
});

/* ======================================================
   Main Component
====================================================== */

const ByFreeTrainer = () => {
  const reportData = useReportStore(
    (state) => state.userSubscriptionReportByFreeTrainer,
    shallow,
  );

  if (!reportData?.length) return null;

  return reportData.map((item, index) => (
    <FreeTrainerRow
      key={item?.id ?? `${index}-${item?.date_subscribed}`}
      item={item}
      index={index}
    />
  ));
};

export default memo(ByFreeTrainer);
