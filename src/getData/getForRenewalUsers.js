import remainingDays from "../others/GetRemainingDays";
import formatTime from "../others/ReadableFormatTime";
import instance from "../others/axiosInstance";
import getExtendedSubscription from "./getExtendedSubscription";
import getExtendedTrainer from "./getExtendedTrainer";
import getImagePath from "./getImagePath";
import getSubscriptionDaysLeft from "./getSubscriptionDaysLeft";
import getTrainerRemainingDays from "./getTrainerRemainingDays";
import loadImageData from "./loadImageData";
import personalTrainerDaysLeft from "./personalTrainerDaysLeft";

/* -----------------------------
   Helpers (Query utilities)
------------------------------ */

const safeCall = async (fn, fallback) => {
  try {
    return await fn();
  } catch (e) {
    console.error(e);
    return fallback;
  }
};

/* -----------------------------
   Main Query
------------------------------ */

const getForRenewalUsers = async () => {
  try {
    const { data: users } = await instance.get("/api/user_all_status/");

    return await Promise.all(
      users.map(async (user) => {
        const sub = user.usersubscription;
        const flexProUserId = sub.flexprouser?.id ?? 0;

        /* --------------------------------
           COMMON (used by both paths)
        --------------------------------- */

        const baseRemainingDays = await remainingDays(
          sub.date_subscribed,
          sub.subscription.per.per,
          0,
          sub.sub_session_days
        );

        const extendedSubData = await safeCall(
          () => getExtendedSubscription(sub.id),
          []
        );

        const extendedSubDays = getSubscriptionDaysLeft(
          baseRemainingDays,
          extendedSubData,
          sub.date_subscribed,
          true
        );

        /* --------------------------------
           🚨 ESCAPE: NO TRAINER
        --------------------------------- */
        if (flexProUserId === 0) {
          return {
            ...user,
            image: "/media/image/default.jpg",
            trainerRemainingDays: 0,
            remainingDays: formatTime(baseRemainingDays, "days-left"),
            extendedSubDays,
            extendedTrainerDays: formatTime(0, "days-only"),
            extendedTrainerData: 0,
          };
        }

        /* --------------------------------
           NORMAL FLOW (Trainer exists)
        --------------------------------- */

        const [imgpath, trainerRemaining, extendedTrainerData] =
          await Promise.all([
            safeCall(() => getImagePath(flexProUserId), null),
            remainingDays(
              sub.trainer_date_started,
              "personal_training_day",
              sub.subscription.personal_training_session
            ),
            safeCall(() => getExtendedTrainer(sub.id), []),
          ]);

        const imageDataUrl = imgpath?.image1
          ? await loadImageData(imgpath.image1)
          : null;

        const extendedTrainerRemaining = await safeCall(
          () =>
            getTrainerRemainingDays(
              trainerRemaining,
              sub.session_days,
              extendedTrainerData
            ),
          0
        );

        const finalTrainerDays = personalTrainerDaysLeft(
          sub.trainer,
          "trainer-remaining-days",
          trainerRemaining,
          sub.session_days,
          extendedTrainerRemaining,
          false
        );

        return {
          ...user,
          image: imageDataUrl || "/media/image/default.jpg",
          trainerRemainingDays: trainerRemaining,
          remainingDays: formatTime(baseRemainingDays, "days-left"),
          extendedSubDays,
          extendedTrainerDays: formatTime(
            finalTrainerDays === "Expired" ? 0 : finalTrainerDays,
            "days-only"
          ),
          extendedTrainerData: extendedTrainerData.length,
        };
      })
    );
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

export default getForRenewalUsers;
