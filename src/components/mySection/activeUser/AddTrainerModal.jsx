import React, { useEffect, useReducer, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import {
  INITIAL_STATE,
  addTrainorReducer,
} from "../../../reducers/addTrainorsReducer";
import getTrainors from "../../../getData/getTrainors";
import updatePersonalTrainer from "./updatePersonalTrainer";
import extendPersonalTrainer from "./extendPersonalTrainer";
import getSpecificExtendedTrainer from "../../../getData/getSpecificExtendedTrainer";
import updateExtendedTrainer from "./updateExtendedTrainer";
import FormatDateISO from "../../../others/FormatDateISO";
import getSpecificUserSubscription from "../../../getData/getSpecificUserSubscription";

const AddTrainerModal = ({
  show,
  onHide,
  userSubscriptionId,
  modalTitle,
  extendedTrainerId,
}) => {
  const [state, dispatch] = useReducer(addTrainorReducer, INITIAL_STATE);
  const [trainers, setTrainers] = useState([]);

  // Load trainers
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await getTrainors();
        if (mounted) setTrainers(data);
      } catch (e) {
        console.error("Failed to fetch trainers:", e);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  // Handle extended trainer fetch/update
  useEffect(() => {
    if (
      modalTitle === "Extend Personal Trainers" ||
      modalTitle === "Update Extended Trainer"
    ) {
      (async () => {
        try {
          if (modalTitle === "Update Extended Trainer") {
            const data = await getSpecificExtendedTrainer(extendedTrainerId);

            if (!data) return;

            dispatch({
              type: "BULK_UPDATE",
              payload: {
                trainersName: data?.trainer?.id ?? 0,
                session_days: data?.extended_session_day ?? 0,
                trainer_date_started: data?.date_extend
                  ? FormatDateISO(new Date(data.date_extend))
                  : null,
              },
            });

            console.log(state.trainersName);
          } else {
            dispatch({
              type: "BULK_UPDATE",
              payload: {
                trainersName: 0,
                session_days: 0,
                trainer_date_started: null,
              },
            });
          }
        } catch (e) {
          console.error("Error loading extended trainer:", e);
        }
      })();
    }
  }, [modalTitle, extendedTrainerId]);

  // Handle specific subscription fetch/update
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        dispatch({
          type: "BULK_UPDATE",
          payload: {
            trainersName: 0,
            session_days: 0,
            trainer_date_started: null,
          },
        });

        const data = await getSpecificUserSubscription(userSubscriptionId);
        if (!mounted || !data) return;

        dispatch({
          type: "BULK_UPDATE",
          payload: {
            trainersName: data?.trainer?.id ?? 0,
            session_days: data?.session_days ?? 0,
            trainer_date_started: data?.trainer_date_started
              ? FormatDateISO(new Date(data.trainer_date_started))
              : null,
          },
        });
      } catch (e) {
        console.error("Error fetching subscription:", e);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [userSubscriptionId]);

  const handleChange = (e) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  // Save handler
  const handleSave = async (option) => {
    const { trainersName, session_days, trainer_date_started } = state;
    if (
      !trainersName ||
      !session_days ||
      session_days < 0 ||
      !trainer_date_started
    )
      return;

    const updateData = new FormData();
    updateData.append("id", userSubscriptionId);
    updateData.append("trainersName", trainersName);
    updateData.append("session_days", session_days);
    updateData.append("trainer_date_started", trainer_date_started);

    try {
      if (option === "update-personal-trainer") {
        await updatePersonalTrainer(updateData);
      } else if (option === "extend-personal-trainer") {
        await extendPersonalTrainer(updateData);
      } else if (option === "update-extended-trainer") {
        updateData.append("extendedTrainerId", extendedTrainerId);
        await updateExtendedTrainer(updateData);
      }
    } catch (e) {
      console.error("Error saving trainer:", e);
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <label className="col-form-label">Personal Trainer:</label>
        <div>
          <select
            className="mySelect"
            name="trainersName"
            onChange={handleChange}
            value={state.trainersName}
          >
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
          name="session_days"
          onChange={handleChange}
          value={state.session_days}
        />
        {state.session_days === "" ? (
          <span style={{ color: "red" }}>Fill session days</span>
        ) : (
          isNaN(state.session_days) && (
            <span style={{ color: "red" }}>input must be day/s</span>
          )
        )}
        <br />
        <label className="col-form-label">Training Date Started:</label>
        <input
          type="datetime-local"
          className="form-control"
          name="trainer_date_started"
          onChange={handleChange}
          value={state.trainer_date_started || ""}
        />
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        {modalTitle === "Add Personal Trainers" && (
          <Button
            variant="primary"
            onClick={() => handleSave("update-personal-trainer")}
          >
            Save changes
          </Button>
        )}
        {modalTitle === "Extend Personal Trainers" && (
          <Button
            variant="primary"
            onClick={() => handleSave("extend-personal-trainer")}
          >
            Save changes
          </Button>
        )}
        {modalTitle === "Update Extended Trainer" && (
          <Button
            variant="primary"
            onClick={() => handleSave("update-extended-trainer")}
          >
            Update
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default AddTrainerModal;
