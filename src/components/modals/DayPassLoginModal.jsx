import { useEffect, useState } from "react";
import { useDayPassStore } from "../../store/useDayPassStore";

import "./daypassLoginModal.scss";
import getDaypassUser from "./../../../src/getData/getDayPassUser";
import DpUserInfo from "./DpUserInfo";
const DayPassLoginModal = () => {
  const [myDayPassUsers, setMyDayPassUsers] = useState([]);

  //setter
  const { setDayPassUser } = useDayPassStore((state) => ({
    setDayPassUser: state.setDayPassUser,
  }));

  //getter
  const { dayPassUserId, modalTitle, dayPassUser } = useDayPassStore(
    (state) => ({
      dayPassUserId: state.dayPassUserId,
      modalTitle: state.modalTitle,
      dayPassUser: state.dayPassUser,
    })
  );

  useEffect(() => {
    const listOfDaypassUser = async () => {
      setDayPassUser(await getDaypassUser());
    };

    listOfDaypassUser();
  }, []);

  useEffect(() => {
    console.log(myDayPassUsers);
  }, [myDayPassUsers]);

  const onChangeDaypassUser = (e) => {
    setMyDayPassUsers(dayPassUser.filter((user) => user.id == e.target.value));
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
                  <option value={0}>--- Select Trainer ---</option>
                  {dayPassUser?.map(
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
                  myDayPassUsers.map((user) => <DpUserInfo user={user} />)}
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
                <button type="button" className="btn btn-danger">
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
