import React from "react";
import formatTime from "../../../others/ReadableFormatTime";

const ForRenewal = ({
  pix,
  registeredName,
  remaining,
  user_id,
  subscription,
  date_log,
  per,
}) => {
  const dateLogObj = new Date(date_log);
  const dateLogObj1 = new Date(date_log);

  const now = new Date();

  if (per === "month") {
    dateLogObj1.setMonth(dateLogObj1.getMonth() + 1); // Add 1 month
  } else if (per === "day") {
    dateLogObj1.setDate(dateLogObj1.getDate() + 1); // add 1 day
  } else if (per === "year") {
    dateLogObj1.setFullYear(dateLogObj1.getFullYear() + 1); // add 1 year
  }

  const daysConsume = now.getTime() - dateLogObj.getTime();
  const subDays = dateLogObj1.getTime() - dateLogObj.getTime();
  var remainingDays = subDays - daysConsume;

  return (
    <>
      {formatTime(remainingDays, "days-left") <= 2 && (
        <div className="clients-online">
          <div className="row row2">
            <div className="col-3">
              <img
                src={pix}
                alt=""
                className="circle"
                style={{ border: "2px solid red" }}
              />
            </div>
            <div className="col-7">
              <div className="clients-flex">
                <h5>{registeredName}</h5>
                <p>ID:{user_id}</p>
                <p style={{ color: "yellow" }}>{subscription}</p>
                <p>
                  Remaining:{" "}
                  <strong>
                    {formatTime(remainingDays, "days")}{" "}
                    {formatTime(remainingDays, "hours")}{" "}
                  </strong>
                  left
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ForRenewal;
