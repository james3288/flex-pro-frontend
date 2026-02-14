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
  const [userSubscriptionReport, cSelectedUsers, cSelectedSubscriptions] =
    useReportStore((state) => [
      state.userSubscriptionReport,
      state.selectedUsers,
      state.selectedSubscriptions,
    ]);

  if (!userSubscriptionReport?.length) return null;

  let { usersFilter, gymRateDescFilter } = [];

  // FILTER BY SELECTED USERS
  if (cSelectedUsers?.length) {
    usersFilter = userSubscriptionReport?.filter((x) =>
      cSelectedUsers.some((name) => x.user.includes(name.value)),
    );
  }

  // FILTER BY SELECTED USERS & SELECTED SUBSCRIPTIONS
  if (cSelectedSubscriptions?.length) {
    gymRateDescFilter = usersFilter?.filter((x) =>
      cSelectedSubscriptions.some((name) =>
        x.gym_rate_desc.includes(name.value),
      ),
    );
  }

  // MAP BY SELECTED USERS ONLY
  if (usersFilter?.length && gymRateDescFilter === undefined) {
    const subNew = usersFilter.map((item, index) => (
      <ByAllRow
        key={item?.id ?? `${item?.user}-${index}`}
        item={item}
        index={index}
      />
    ));

    return subNew;

    // MAP BY SELECTED USERS AND SELECTED SUBSCRIPTION
  } else if (usersFilter?.length && gymRateDescFilter?.length) {
    const subNew = gymRateDescFilter.map((item, index) => (
      <ByAllRow
        key={item?.id ?? `${item?.user}-${index}`}
        item={item}
        index={index}
      />
    ));

    return subNew;

    // MAP BY SELECTED SUBSCRIPTION ONLY
  } else if (cSelectedSubscriptions.length && cSelectedUsers.length === 0) {
    const filterC = userSubscriptionReport?.filter((x) =>
      cSelectedSubscriptions.some((name) =>
        x.gym_rate_desc.includes(name.value),
      ),
    );

    const subNew = filterC.map((item, index) => (
      <ByAllRow
        key={item?.id ?? `${item?.user}-${index}`}
        item={item}
        index={index}
      />
    ));

    return subNew;
  }

  // MAP BY DEFAULT
  return userSubscriptionReport.map((item, index) => (
    <ByAllRow
      key={item?.id ?? `${item?.user}-${index}`}
      item={item}
      index={index}
    />
  ));
};

export default memo(ByAll);
