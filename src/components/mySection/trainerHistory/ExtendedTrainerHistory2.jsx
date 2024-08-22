import FormatDate from "../../../others/FormatDate";
import formatTime from "../../../others/ReadableFormatTime";

const ExtendedTrainerHistory2 = ({ extendedTraining }) => {
  return (
    <>
      <div className="col-lg-12 col-sm-12">
        <div className="card myCard" style={{ marginTop: "6px" }}>
          {extendedTraining?.map((user) => (
            <>
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
                    <span style={{ fontSize: "18px" }}>Expired</span>
                  ) : (
                    <span style={{ fontSize: "18px" }}>
                      {formatTime(user.PT, "days-hours-minutes")}
                    </span>
                  )}
                </div>
              </div>
            </>
          ))}

          {/* <div className="card-footer myCard-footer">
          <h4>
            {user.usersubscription.subscription.gym_rate_desc} /{" "}
            {user.usersubscription.subscription.rate.toLocaleString()}
          </h4>
        </div> */}
        </div>
      </div>
    </>
  );
};

export default ExtendedTrainerHistory2;
