import getExtendedSubscription from "../../../getData/getExtendedSubscription";
import getSubscriptionDaysLeft from "../../../getData/getSubscriptionDaysLeft";
import remainingDays from "../../../../src/others/GetRemainingDays";

export async function getRemainingDaysLeft(
  date_subscribed,
  per,
  flexProUserId,
  sub_session_days,
  userSubscriptionId,
  daysOnly = false
) {
  try {
    // Normalize sub_session_days once
    const normalizedSessionDays = sub_session_days === 0 ? 1 : sub_session_days;

    // Run async calls in parallel (if independent)
    const [extSub, remDays] = await Promise.all([
      getExtendedSubscription(userSubscriptionId),
      remainingDays(date_subscribed, per, flexProUserId, normalizedSessionDays),
    ]);

    return getSubscriptionDaysLeft(remDays, extSub, date_subscribed, daysOnly);
  } catch (error) {
    console.error("Error in getRemainingDaysLeft:", error);
    throw error; // rethrow so callers can handle it
  }
}
