import getExtendedSubscription from "../../../getData/getExtendedSubscription";
import getSubscriptionDaysLeft from "../../../getData/getSubscriptionDaysLeft";
import remainingDays from "../../../../src/others/GetRemainingDays";

export async function getRemainingDaysLeftRaw(
  date_subscribed,
  per,
  flexProUserId,
  sub_session_days,
  userSubscriptionId,
  daysOnly = false
) {
  const extSub = await getExtendedSubscription(userSubscriptionId);
  const remDays = await remainingDays(
    date_subscribed,
    per,
    flexProUserId,
    sub_session_days === 0 ? 1 : sub_session_days
  );

  return getSubscriptionDaysLeft(remDays, extSub, date_subscribed, daysOnly);
}
