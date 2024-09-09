import React from "react";
import CheckCircleFillSvg from "../svg/checkCircleFillSvg";
import ExclamationSvg from "../svg/exclamationSvg";

const style1 = {
  color: "orange",
  fontSize: "20px",
  padding: 0,
  margin: 0,
};

const style2 = {
  color: "orange !important",
  padding: 0,
  margin: 0,
};

const LoginMessageAlertDayPass = (props) => {
  return (
    <div className="col-lg-6 col-xs-12">
      <>
        <div className="dashboard-col">
          <span>
            <strong>LOGIN</strong> STATUS
          </span>
          <div className="scan-profile-wrapper">
            <img src={props.pic} alt="" className="scan-profile" />
            <div className="scan-profile-name">
              <h3
                style={{
                  color:
                    props.isOnGoing === "already-login"
                      ? "#be256a"
                      : "yellowgreen",
                }}
              >
                {props.message}
              </h3>

              <h5 style={{ color: "white" }}>
                {props.isOnGoing === "already-login" ? (
                  <ExclamationSvg />
                ) : (
                  <CheckCircleFillSvg />
                )}{" "}
                {props.dayPassName}
              </h5>
            </div>
          </div>
        </div>
        <div className="dashboard-col">
          <div className="personal-trainer">
            <h5>Personal Trainer:</h5>
            <p style={style1}>{props.personalTrainer}</p>
          </div>

          <div className="personal-trainer">
            <h5>Subscription:</h5>
            <h2
              style={{
                fontSize: "50px",
                color: "orange",
              }}
            >
              {props.subscriptionName}
            </h2>
          </div>
        </div>
        <div className="dashboard-col">
          <div className="personal-trainer">
            <h5>Subscription Remaining Days:</h5>
            <h3 style={{ color: "yellowgreen" }}>{props.remainingHours}</h3>
          </div>
        </div>
        <div class="back-to-dashboard">
          {/* <form action=""> */}
          <button className="btn btn-success" onClick={props.handleRefresh}>
            PROCEED
          </button>
          {/* </form> */}
        </div>
      </>
    </div>
  );
};

export default LoginMessageAlertDayPass;
