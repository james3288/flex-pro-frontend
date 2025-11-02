import { useEffect, useState } from "react";
import { useDayPassStore } from "../../store/useDayPassStore";

import "./daypassLoginModal.scss";
import getDaypassUser from "./../../../src/getData/getDayPassUser";
import DpUserInfo from "./DpUserInfo";
import PostSaveTimeRecords from "../../postData/postSaveTimeRecords";
import postDayPassTimeRecords from "../../postData/postDayPassTimeRecords";
import FormatDate from "../../others/FormatDate";
import FormatDateOnly from "../../others/FormatDateOnly";

const DayPassLoginModal = ({ setIsOnGoing, setDayPassLogin, dayPassUsers }) => {
  const [myDayPassUsers, setMyDayPassUsers] = useState([]);

  //setter
  const {
    setDayPassUser,
    setDayPassUserOnline,
    setIsLogin,
    setDayPassName,
    setIsAlreadyLogin,
    setSubscriptionName,
  } = useDayPassStore((state) => ({
    setDayPassUser: state.setDayPassUser,
    setDayPassUserOnline: state.setDayPassUserOnline,
    setIsLogin: state.setIsLogin,
    setDayPassName: state.setDayPassName,
    setIsAlreadyLogin: state.setIsAlreadyLogin,
    setSubscriptionName: state.setSubscriptionName,
  }));

  //getter
  const { dayPassUserId, modalTitle, dayPassUser, dayPassUserOnline } =
    useDayPassStore((state) => ({
      dayPassUserId: state.dayPassUserId,
      modalTitle: state.modalTitle,
      dayPassUser: state.dayPassUser,
      dayPassUserOnline: state.dayPassUserOnline,
    }));

  useEffect(() => {
    const listOfDaypassUser = async () => {
      setDayPassUser(await getDaypassUser());
    };

    listOfDaypassUser();
  }, [dayPassUsers]);

  const onChangeDaypassUser = (e) => {
    setMyDayPassUsers(dayPassUsers.filter((user) => user.id == e.target.value));
    setDayPassUserOnline(e.target.value);
  };

  const handleLoginOnclick = async () => {
    // const data = new FormData();
    const dayPassUserId = myDayPassUsers[0] || {};

    // const dayPassUserOnline1990 = dayPassUserOnline.filter(
    //   (user) => FormatDateOnly(user.time_out) === "1990-01-01"
    // );

    console.log(dayPassUserOnline);

    const isDaypassAlreadyLogin = () => {
      const dayPassUserOnline1990 = dayPassUserOnline.filter(
        (user) => FormatDateOnly(user.time_out) === "1990-01-01"
      );

      return dayPassUserOnline1990.length === 0 ? false : true;
    };

    if (isDaypassAlreadyLogin() === false) {
      const data = {
        dayPassId: dayPassUserId?.id,
        time_in: new Date(),
        time_out: new Date(1990, 0, 1, 0, 0),
      };

      console.log(dayPassUserId);

      postDayPassTimeRecords(data);

      // console.log(myDayPassUsers[0]?.subscription?.gym_rate_desc);

      setIsLogin(true);
      // setDayPassName(myDayPassUsers[0].name);
      // setIsOnGoing("on-going");
      // setDayPassLogin(true);
      // setSubscriptionName(myDayPassUsers[0]?.subscription?.gym_rate_desc);
      // setMyDayPassUsers([]);

      setDayPassName(dayPassUserId?.name);
      setIsOnGoing("on-going");
      setDayPassLogin(true);
      setIsAlreadyLogin(false);
      setSubscriptionName(dayPassUserId?.subscription?.gym_rate_desc);
      setMyDayPassUsers([]);
    } else {
      // console.log("nag login pani xa karon");
      // setDayPassLogin(true);
      // setIsOnGoing("already-login");
      // setIsAlreadyLogin(true);
      // setSubscriptionName(myDayPassUsers[0]?.subscription?.gym_rate_desc);
      // setMyDayPassUsers([]);
      // setDayPassName(dayPassUserOnline1990[0]?.flexprouserdaypass.name)

      console.log("already login");
      setIsLogin(true);
      setDayPassName(dayPassUserId?.name);
      setIsOnGoing("already-login");
      setDayPassLogin(false);
      setIsAlreadyLogin(true);
      setSubscriptionName(dayPassUserId?.subscription?.gym_rate_desc);
      setMyDayPassUsers([]);
    }
  };

  return (
    <>
      <div
        className="modal fade"
        id={dayPassUserId}
        role="dialog"
        aria-labelledby="exampleModalLongTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                {modalTitle}
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <label className="col-form-label">FlexPro Daypass Users:</label>
              <div>
                <select
                  className="mySelect"
                  name="daypassUserName"
                  onChange={onChangeDaypassUser}
                >
                  <option value={0}>--- Select User ---</option>
                  {dayPassUsers?.map(
                    (user) =>
                      user?.remaining > -1 && (
                        <option value={user.id} key={user.id}>
                          {user.name} - {user.subscription.gym_rate_desc}
                        </option>
                      )
                  )}
                </select>
              </div>

              {/* <label className="col-form-label">Training Date Started:</label>
              <input
                type="datetime-local"
                className="form-control"
                name="trainer_date_started"
              /> */}
            </div>
            <div className="modal-body">
              <div className="dp-user-info">
                {myDayPassUsers.length > 0 &&
                  myDayPassUsers.map((user) => (
                    <DpUserInfo user={user} key={user.id} />
                  ))}
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              {myDayPassUsers?.length > 0 && (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleLoginOnclick}
                  data-dismiss="modal"
                >
                  Daypass Login
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DayPassLoginModal;
