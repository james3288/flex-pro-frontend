import dayjs from "dayjs";
import useRemainingDaysLeft from "../../../hooks/useRemainingDaysLeft";
import { useEffect, useState } from "react";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

const RemainingDaysLeft2 = ({
  date_subscribed,
  per,
  user_id,
  session_days,
  subscriptionId,
  id,
}) => {
  const [cEextended, setcExtended] = useState();
  const { data } = useRemainingDaysLeft(
    date_subscribed,
    per,
    user_id,
    session_days,
    subscriptionId
  );

  const dateSubscribed_expired_default = async (
    per,
    param_date_subscribed,
    noOfDays
  ) => {
    let dateExpired = new Date();
    if (per === "month") {
      dateExpired = dayjs(param_date_subscribed).add(
        dayjs.duration({ months: 1 })
      );
    } else if (per === "day") {
      dateExpired = dayjs(param_date_subscribed).add(
        dayjs.duration({ days: noOfDays })
      );
    } else if (per === "year") {
      dateExpired = dayjs(param_date_subscribed).add(
        dayjs.duration({ years: 1 })
      );
    }

    return dateExpired;
  };

  useEffect(() => {
    const extended = data?.extendedSub.filter((x) => {
      return (x.subscriptionId = subscriptionId);
    });

    const getDateSubExpired = async () => {
      const result = dateSubscribed_expired_default(
        per,
        date_subscribed,
        session_days
      );
      return result;
    };

    const executeFunction = async () => {
      const current = await getDateSubExpired();
      const a = dayjs(current);
      const extendedDays = extended?.reduce((acc, orig) => {
        return acc + (orig?.extended_session_day || 0);
      }, 0);

      const targetDate = a.add(dayjs.duration({ days: extendedDays }));
      const now = dayjs();

      // / Calculate the difference in milliseconds
      const diffMs = targetDate.diff(now);

      // Convert the difference to a duration
      const remainingTime = dayjs.duration(diffMs);

      // Format the output
      const formattedRemaining = `${remainingTime.days()} days, ${remainingTime.hours()} hours, ${remainingTime.minutes()} minutes, ${remainingTime.seconds()} sec`;

      console.log(formattedRemaining);
      setcExtended(formattedRemaining);
    };

    executeFunction();

    // const targetDate = a.add(dayjs.duration({ days: extendedDays }));
    // const now = dayjs();

    // // / Calculate the difference in milliseconds
    // const diffMs = targetDate.diff(now);

    // // Convert the difference to a duration
    // const remainingTime = dayjs.duration(diffMs);

    // // Format the output
    // const formattedRemaining = `${remainingTime.days()} days, ${remainingTime.hours()} hours, ${remainingTime.minutes()} minutes, ${remainingTime.seconds()} sec`;

    // console.log(formattedRemaining);
    // setcExtended(targetDate);
  }, [cEextended, user_id]);

  return <div style={{ color: "white" }}>{cEextended}</div>;
};

export default RemainingDaysLeft2;
