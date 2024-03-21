import React, { useEffect, useReducer, useRef, useState } from "react";
import {
  INITIAL_STATE,
  addTrainorReducer,
} from "../../../reducers/addTrainorsReducer";
import getTrainors from "../../../getData/getTrainors";
import updatePersonalTrainer from "./updatePersonalTrainer";

const AddTrainerModal = ({ id, userSubscriptionId, modalTitle }) => {
  const [state, dispatch] = useReducer(addTrainorReducer, INITIAL_STATE);
  const refTrainingSession = useRef(0);
  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    const getTrainers = async () => {
      let data = await getTrainors();
      // console.log('data',data);
      setTrainers(data);
    };

    getTrainers();
  }, []);

  const handleChange = (e) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  const handleSave = async () => {
    if (state.trainersName == 0) {
      return;
    } else if (state.session_days == "" || state.session_days <= 0) {
      return;
    }

    const updateData = new FormData();
    updateData.append("id", userSubscriptionId);
    updateData.append("trainersName", state.trainersName);
    updateData.append("session_days", state.session_days);

    updatePersonalTrainer(updateData);

    // dispatch({ type: "CLEAR" });
  };

  const handleExtendTrainerSave = async () => {
    
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
                >
                  {/* <option value="day">King James Uayan</option>
                  <option value="month">John Mayer</option>
                  <option value="year">Jeoseph Bejec</option> */}
                  {trainers.map((trainer) => (
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
              />
              {state.session_days == "" ? (
                <span style={{ color: "red" }}>Fill session days</span>
              ) : (
                isNaN(state.session_days) && (
                  <span style={{ color: "red" }}>input must day/s</span>
                )
              )}
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
                  onClick={handleSave}
                >
                  Save changes
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleExtendTrainerSave}
                >
                  Save changes
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddTrainerModal;
