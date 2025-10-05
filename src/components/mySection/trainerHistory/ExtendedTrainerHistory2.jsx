import React, { useMemo } from "react";
import FormatDate from "@others/FormatDate";
import formatTime from "@others/ReadableFormatTime";

const ExtendedTrainerHistory2 = ({ extendedTraining }) => {
  return (
    <>
      <div className="col-lg-12 col-sm-12">
        {extendedTraining?.map((user) => (
          <>
            <div className="card myCard" style={{ marginTop: "6px" }}>
              <div className="card-header myCard-header">
                <h5>
                  {user.user.toUpperCase()} -{" "}
                  <span style={{ color: "gray" }}>{user.gym_rate_desc}</span>
                </h5>
              </div>
              <div className="card-body">
                <div className="card-title myCard-title">
                  <b>PT Remaining Days: ({FormatDate(user.date_extend)})</b>
                </div>
                <div className="card-text">
                  {user.PT < 0 ? (
                    <span style={{ fontSize: "22px", color: "red" }}>
                      Expired
                    </span>
                  ) : (
                    <span style={{ fontSize: "22px", color: "green" }}>
                      {formatTime(user.PT, "days-hours-minutes")}
                    </span>
                  )}
                </div>
              </div>
              <div className="card-footer myCard-footer">
                <h4></h4>
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  );
};

export default ExtendedTrainerHistory2;
