import React, { useEffect, useReducer, useRef, useState } from "react";
import {
  INITIAL_STATE,
  addTrainorReducer,
} from "../../../reducers/addTrainorsReducer";
import getTrainors from "../../../getData/getTrainors";
import updatePersonalTrainer from "./updatePersonalTrainer";
import extendPersonalTrainer from "./extendPersonalTrainer";
import getSpecificExtendedTrainer from "../../../getData/getSpecificExtendedTrainer";
import updateExtendedTrainer from "./updateExtendedTrainer";
import FormatDate from "../../../others/FormatDate";
import FormatDateISO from "../../../others/FormatDateISO";
import getSpecificUserSubscription from "../../../getData/getSpecificUserSubscription";
const AddTrainerModal = ({
  id,
  userSubscriptionId,
  modalTitle,
  extendedTrainerId,
}) => {
  const [state, dispatch] = useReducer(addTrainorReducer, INITIAL_STATE);
  const refTrainingSession = useRef(0);
  const [trainers, setTrainers] = useState([]);
  const [extendedTrainer, setExtendedTrainer] = useState({});
  const [freeTrainer, setFreeTrainer] = useState({});

  useEffect(() => {
    const getTrainers = async () => {
      let data = await getTrainors();
      // console.log('data',data);
      setTrainers(data);
    };

    getTrainers();
  }, []);

  useEffect(() => {
    if (
      modalTitle === "Extend Personal Trainers" ||
      modalTitle === "Update Extended Trainer"
    ) {
      const getSpecificExtendedTr = async () => {
        let data = await getSpecificExtendedTrainer(extendedTrainerId);
        // setExtendedSubscription(data);
        setExtendedTrainer(data);

        let date_extend = new Date(data?.date_extend);

        dispatch({
          type: "CHANGE_INPUT",
          payload: {
            name: "trainersName",
            value: data?.trainer?.id,
          },
        });

        dispatch({
          type: "CHANGE_INPUT",
          payload: {
            name: "session_days",
            value: data?.extended_session_day,
          },
        });

        dispatch({
          type: "CHANGE_INPUT",
          payload: {
            name: "trainer_date_started",
            value: FormatDateISO(date_extend),
          },
        });
      };

      const clearExntededTr = async () => {
        dispatch({
          type: "CHANGE_INPUT",
          payload: {
            name: "trainersName",
            value: 0,
          },
        });

        dispatch({
          type: "CHANGE_INPUT",
          payload: {
            name: "session_days",
            value: 0,
          },
        });

        dispatch({
          type: "CHANGE_INPUT",
          payload: {
            name: "trainer_date_started",
            value: null,
          },
        });
      };

      modalTitle === "Extend Personal Trainers" && clearExntededTr();
      modalTitle === "Update Extended Trainer" && getSpecificExtendedTr();
    }

    //: clearExntededTr();
  }, [extendedTrainerId]);

  useEffect(() => {
    const getSpecificUserSubscriptions = async () => {
      let data = await getSpecificUserSubscription(userSubscriptionId);

      // setExtendedSubscription(data);
      setFreeTrainer(data);

      let trainer_date_started = new Date(data?.trainer_date_started);

      dispatch({
        type: "CHANGE_INPUT",
        payload: {
          name: "trainersName",
          value: data?.trainer?.id,
        },
      });

      dispatch({
        type: "CHANGE_INPUT",
        payload: {
          name: "session_days",
          value: data?.session_days,
        },
      });

      dispatch({
        type: "CHANGE_INPUT",
        payload: {
          name: "trainer_date_started",
          value: FormatDateISO(trainer_date_started),
        },
      });
    };

    const clear = async () => {
      dispatch({
        type: "CHANGE_INPUT",
        payload: {
          name: "trainersName",
          value: 0,
        },
      });

      dispatch({
        type: "CHANGE_INPUT",
        payload: {
          name: "session_days",
          value: 0,
        },
      });

      dispatch({
        type: "CHANGE_INPUT",
        payload: {
          name: "trainer_date_started",
          value: null,
        },
      });
    };

    clear();

    getSpecificUserSubscriptions();
  }, [userSubscriptionId]);

  const handleChange = (e) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  // update personal trainer
  const handleSave = async (option) => {
    if (state.trainersName == 0) {
      return;
    } else if (state.session_days == "" || state.session_days < 0) {
      return;
    } else if (state.trainer_date_started === null) {
      return;
    }

    const updateData = new FormData();
    updateData.append("id", userSubscriptionId);
    updateData.append("trainersName", state.trainersName);
    updateData.append("session_days", state.session_days);
    updateData.append("trainer_date_started", state.trainer_date_started);

    if (option === "update-personal-trainer") {
      updatePersonalTrainer(updateData);
    } else if (option === "extend-personal-trainer") {
      extendPersonalTrainer(updateData);
    } else if (option === "update-extended-trainer") {
      updateData.append("extendedTrainerId", extendedTrainerId);
      updateExtendedTrainer(updateData);
    }

    // dispatch({ type: "CLEAR" });
  };

  return (
    <>
      <div
        className="modal fade"
        id={id}
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
              <label className="col-form-label">Personal Trainer:</label>
              <div>
                <select
                  className="mySelect"
                  name="trainersName"
                  onChange={handleChange}
                  value={state?.trainersName}
                >
                  {/* <option value="day">King James Uayan</option>
                  <option value="month">John Mayer</option>
                  <option value="year">Jeoseph Bejec</option> */}
                  <option value={0}>--- Select Trainer ---</option>
                  {trainers?.map((trainer) => (
                    <option key={trainer?.id} value={trainer?.id}>
                      {trainer?.name}
                    </option>
                  ))}
                </select>
                <br />
                {state.trainersName == 0 && (
                  <span style={{ color: "red" }}>select trainers</span>
                )}
              </div>
              <label className="col-form-label">
                Personal Training Session (days):
              </label>
              <input
                type="text"
                className="form-control"
                id="personal-training-session"
                name="session_days"
                onChange={handleChange}
                ref={refTrainingSession}
                value={state.session_days}
              />
              {state.session_days == "" ? (
                <span style={{ color: "red" }}>Fill session days</span>
              ) : (
                isNaN(state.session_days) && (
                  <span style={{ color: "red" }}>input must day/s</span>
                )
              )}
              <br />
              <label className="col-form-label">Training Date Started:</label>
              <input
                type="datetime-local"
                className="form-control"
                name="trainer_date_started"
                onChange={handleChange}
                value={state?.trainer_date_started}
              />
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              {modalTitle === "Add Personal Trainers" ? (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => handleSave("update-personal-trainer")}
                >
                  Save changes
                </button>
              ) : modalTitle === "Extend Personal Trainers" ? (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => handleSave("extend-personal-trainer")}
                >
                  Save changes
                </button>
              ) : modalTitle === "Update Extended Trainer" ? (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => handleSave("update-extended-trainer")}
                >
                  Update
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddTrainerModal;
