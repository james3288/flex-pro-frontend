import React, { memo } from "react";
import { shallow } from "zustand/shallow";
import { useReportStore } from "../../store/useReportStore";
import useOnWorkOutDataByDateRange from "../../hooks/useOnWorkOutDataByDateRange";

import FormatDateOnly from "../../others/FormatDateOnly";
import formatTimeToString from "@others/formatTimeToString";
import Loading5 from "../../components/ui/loading5/Loading5";

/* ======================================================
   Utility Helpers (Pure Functions)
====================================================== */

const getExpiryColor = (value) =>
  value === "Expired" ? "red" : "green";

const formatTimeOut = (value) =>
  value?.includes("1990")
    ? "--:--"
    : formatTimeToString(value);

/* ======================================================
   Row Component (Memoized)
====================================================== */

const WorkoutRow = memo(({ user, index, col }) => {
  const {
    id,
    date_log,
    time_in,
    time_out,
    extendedSubDays,
    usersubscription,
  } = user;

  const name = usersubscription?.flexprouser?.name;
  const rateDesc =
    usersubscription?.subscription?.gym_rate_desc;

  const date_subscribed = FormatDateOnly(usersubscription?.date_subscribed);

  const formattedDate = FormatDateOnly(date_log);
  const formattedTimeIn = formatTimeToString(time_in);
  const formattedTimeOut = formatTimeOut(time_out);
  const expiryColor = getExpiryColor(extendedSubDays);


  return (
    <div className="row body">
      <div className={`col-${col[0]?.col}`}>
        <div className="body-col">{index + 1}</div>
      </div>

      <div className={`col-${col[1]?.col}`}>
        <div className="body-col">{name}</div>
      </div>

      <div className={`col-${col[2]?.col}`}>
        <div className="body-col">{formattedDate}</div>
      </div>

      <div className={`col-${col[3]?.col}`}>
        <div className="body-col">{rateDesc}</div>
      </div>

      <div className={`col-${col[4]?.col}`}>
        <div className="body-col">{formattedTimeIn}</div>
      </div>

      <div className={`col-${col[5]?.col}`}>
        <div className="body-col">{formattedTimeOut}</div>
      </div>
     
      <div className={`col-${col[6]?.col}`}>
        <div className="body-col">{date_subscribed}</div>
      </div>

      <div className={`col-${col[7]?.col}`}>
        <div className="body-col" style={{ color: expiryColor }}>
          {extendedSubDays}
        </div>
      </div>
    </div>
  );
});

/* ======================================================
   Main Component
====================================================== */

const ByClientsOnWorkout = ({col}) => {

  const { dateFrom, dateTo } = useReportStore(
    (state) => ({
      dateFrom: state.reportData.dateFrom,
      dateTo: state.reportData.dateTo,
    }),
    shallow
  );

  const { data, isLoading } =
    useOnWorkOutDataByDateRange({
      dateFrom,
      dateTo,
      trigger: false,
    });

  if (isLoading) return <Loading5 />;

  const usersOnline = data?.usersOnline ?? [];

  if (!usersOnline.length) return null;

  return usersOnline.map((user, index) => (
    <WorkoutRow
      key={user?.id ?? `${index}-${user?.date_log}`}
      user={user}
      index={index}
      col={col}
    />
  ));
};

export default memo(ByClientsOnWorkout);
