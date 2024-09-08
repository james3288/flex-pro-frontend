import React from "react";
import TrainerRemainingDays from "../mySection/forRenewal/TrainerRemainingDays";
import personalTrainerDaysLeft from "../../getData/personalTrainerDaysLeft";
import CheckCircleFillSvg from "../svg/checkCircleFillSvg";
import FormatDate from "../../others/FormatDate";
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

const LoginMessageAlert = (props) => {
  return (
    <div className="col-lg-6 col-xs-12">
      <>
        <div className="dashboard-col">
          <span>
            <strong>LOGIN</strong> STATUS
          </span>
          <div className="scan-profile-wrapper">
            <img
              src={props.userFoundWithImage?.image}
              alt=""
              className="scan-profile"
            />
            <div className="scan-profile-name">
              <h3
                style={{
                  color:
                    props.isOnGoing === "already-login"
                      ? "orange"
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
                {props.userFoundWithImage.flex_pro_user?.name}
              </h5>
            </div>
          </div>
        </div>
        <div className="dashboard-col">
          <div className="personal-trainer">
            <h5>Free Personal Trainer:</h5>

            <p style={{ fontSize: "24px" }}>
              {/* original: trainers */}
              {props.cUser?.usersubscription?.trainer?.name} -{" "}
              <strong>
                {props.cUser?.usersubscription?.trainer?.position}
              </strong>
              {" - "}
              <strong style={{ color: "orange" }}>
                {personalTrainerDaysLeft(
                  props.cUser?.usersubscription?.trainer?.name,
                  "remaining-days",
                  props.cTrainersRemainingDays,
                  props.cSessionDays
                )}
              </strong>
            </p>
          </div>

          <div className="personal-trainer">
            <h5>Extended Trainer:</h5>

            {props.cExtendedTrainer?.map((extended) => (
              <p style={style1} key={extended?.id}>
                {extended?.trainer?.name} - {FormatDate(extended?.date_extend)}{" "}
                ({extended?.extended_session_day} day/s)
              </p>
            ))}
            <br />
            <div className="trainerRemainingDays">
              <TrainerRemainingDays
                trainerRemainingDays={props.cTrainersRemainingDays}
                session_days={props.cSessionDays}
                extendedTrainer={props.cExtendedTrainer}
                trainers={props.cUser?.usersubscription?.trainer?.name}
                totalFreeTrainerLeft={props.totalFreeTrainerLeft}
                setTotalFreeTrainerLeft={props.setTotalFreeTrainerLeft}
              />
            </div>
          </div>

          <div className="personal-trainer">
            <h5>Subscription Status:</h5>
            <h2
              style={{
                color: props.cUser.status === "expired" ? "red" : "orange",
                fontSize: "50px",
              }}
            >
              {props.cUser.status}
            </h2>
            {props.cUser.status === "expired" && (
              <p style={style1}>
                kindly contact the attendant to extend your subscription, thank
                you.
              </p>
            )}
          </div>
        </div>
        <div class="back-to-dashboard">
          {/* <NavLink className="btn btn-danger" to={"/"}>
          Back to Dashboard
        </NavLink> */}
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

export default LoginMessageAlert;
