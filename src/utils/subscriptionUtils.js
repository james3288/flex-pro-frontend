/**
 * Convert an image Blob into a Data URL string for easy usage in <img> tags.
 * @param {Blob} blob - The binary image blob.
 * @returns {Promise<string>} A promise that resolves with the Data URL.
 */
export function getImageDataUrl(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

/**
 * Calculate how many days remain on a subscription based on its start date and duration.
 * @param {string|Date} subscriptionDate - ISO string or Date object when subscription began.
 * @param {number} planDuration - Total duration of subscription in days.
 * @returns {number} Days left (0 if expired).
 */
export function calculateRemainingDays(subscriptionDate, planDuration) {
  const start = new Date(subscriptionDate);
  const now = new Date();
  const elapsedMs = now - start;
  const elapsedDays = Math.floor(elapsedMs / (1000 * 60 * 60 * 24));
  const remaining = planDuration - elapsedDays;
  return remaining > 0 ? remaining : 0;
}

/**
 * Determine the total days left, taking into account any extended subscriptions.
 * @param {number} initialRemaining - Days left from the main subscription.
 * @param {Object|Array} extendedSubs - Extended subscription info (object or array).
 *        If object, should have a `daysRemaining` number property.
 *        If array, each element may have `daysRemaining`.
 * @param {string|Date} subscriptionDate - Original subscription start date (not used here but available if needed).
 * @returns {number} Effective days left.
 */
export function getSubscriptionDaysLeft(
  initialRemaining,
  extendedSubs,
  subscriptionDate
) {
  if (extendedSubs) {
    if (Array.isArray(extendedSubs)) {
      const totalExtended = extendedSubs.reduce(
        (sum, ext) => sum + (ext.daysRemaining || 0),
        0
      );
      return initialRemaining + totalExtended;
    }
    if (typeof extendedSubs.daysRemaining === "number") {
      return extendedSubs.daysRemaining;
    }
  }
  return initialRemaining;
}
