import React, { memo } from "react";
import { useReportStore } from "../../store/useReportStore";
import FormatDateOnly from "../../others/FormatDateOnly";

/* ======================================================
   Pure Helper Functions (No React Component Overhead)
====================================================== */

const getRate = (option, promoRate, defaultRate) =>
  option === "promo" ? Number(promoRate || 0) : Number(defaultRate || 0);

const getPerLabel = (option, per) =>
  option === "promo" ? `${per} (PROMO)` : per;

/* ======================================================
   Row Component (Memoized)
====================================================== */

const ByAllRow = memo(({ item, index }) => {
  const {
    user,
    date_subscribed,
    gym_rate_desc,
    trainer,
    promo_option,
    promo_rate,
    extended_session,
    per,
  } = item;

  const formattedDate = FormatDateOnly(date_subscribed);
  const rate = getRate(promo_option, promo_rate, extended_session);
  const perLabel = getPerLabel(promo_option, per);

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
        <div className="body-col">{rate}</div>
      </div>
      <div className="col-2">
        <div className="body-col">{perLabel}</div>
      </div>
    </div>
  );
});

/* ======================================================
   Main Component
====================================================== */

const ByAll = () => {
  const [userSubscriptionReport, cSelectedUsers] = useReportStore((state) => [
    state.userSubscriptionReport,
    state.selectedUsers,
  ]);

  if (!userSubscriptionReport?.length) return null;

  if (cSelectedUsers?.length) {
    const subNew = userSubscriptionReport
      ?.filter((x) =>
        cSelectedUsers.some((name) => x.user.includes(name.value)),
      )
      .map((item, index) => (
        <ByAllRow
          key={item?.id ?? `${item?.user}-${index}`}
          item={item}
          index={index}
        />
      ));

    return subNew;
  }

  return userSubscriptionReport.map((item, index) => (
    <ByAllRow
      key={item?.id ?? `${item?.user}-${index}`}
      item={item}
      index={index}
    />
  ));
};

export default memo(ByAll);
