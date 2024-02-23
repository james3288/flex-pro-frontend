import React from "react";
import ReactTimeAgo from "react-time-ago";

function ClientsOnline({
  client_id,
  clientName,
  timeIn,
  timeOut,
  status,
  pix,
  timeAgo,
  weights,
  gym_rate_desc,
  rate,
  per,
  date_log,
}) {
  // initialize here
  // Convert milliseconds to readable format
  const formatTime = (milliseconds, option) => {
    const seconds = Math.floor((milliseconds / 1000) % 60);
    const minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
    const hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 24);
    const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));

    if (option === "days") {
      return `${days} days`;
    } else if (option === "hours") {
      return `${hours} hours`;
    } else if (option === "all") {
      return `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
    }
  };

  // Parse the timestamp
  const timeInObj = new Date(timeIn);
  const timeOutObj = new Date(timeOut);

  // parse the datelog
  const dateLogObj = new Date(date_log); // kanus.a na days nag subscribe

  const dateLogObj1 = new Date(date_log);

  if (per === "month") {
    dateLogObj1.setMonth(dateLogObj1.getMonth() + 1); // Add 1 month
  } else if (per === "day") {
    dateLogObj1.setDate(dateLogObj1.getDate() + 1);
  } else if (per === "year") {
    dateLogObj1.setFullYear(dateLogObj1.getFullYear() + 1);
  }

  const now = new Date();

  const daysConsume = now.getTime() - dateLogObj.getTime();
  const subDays = dateLogObj1.getTime() - dateLogObj.getTime();
  var remainingDays = subDays - daysConsume;

  // Get the time portion
  const timeInString = timeInObj.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const timeOutString = timeOutObj.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const yearValidation = timeOutObj.getFullYear();

  return (
    <div className="clients-online">
      <div className="row row2">
        <div className="col-3">
          {status === "true" ? (
            <img src={pix} alt="" className="circle" />
          ) : (
            <img
              src={pix}
              alt=""
              className="circle"
              style={{ border: "2px solid red" }}
            />
          )}
        </div>
        <div className="col-7">
          <div className="clients-flex">
            <h5>{clientName}</h5>
            <p>{weights} lbs</p>
            <div className="timein_timeout">
              <p>
                IN: <strong>{timeInString}</strong>- OUT:
                <strong>
                  {yearValidation === 1990 ? "--:--" : timeOutString}
                </strong>
              </p>
              <button className="btn btn-warning">Logout</button>
            </div>

            <p
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                color: "gold",
                lineHeight: "20px",
              }}
            >
              {gym_rate_desc} - {rate} / {per}
            </p>

            <p>
              <ReactTimeAgo date={timeAgo} locale="en-US" timeStyle="twitter" />{" "}
              ago
            </p>
            <hr />
            <p>Remaining days:</p>
            <p style={{ color: "orange" }}>
              {formatTime(remainingDays, "days")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientsOnline;
