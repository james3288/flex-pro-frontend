import React, { useEffect, useMemo, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useDayPassStore } from "../../store/useDayPassStore";
import updateDayPassPersonalTrainer from "../mySection/dayPassUser/updateDayPassPersonalTrainer";

const DayPassAddTrainerModal = ({ show, onHide }) => {
  /** ───────── Zustand (actions) ───────── */
  const setTrainors = useDayPassStore((state) => state.setTrainors);
  const setDayPassTrainer = useDayPassStore((state) => state.setDayPassTrainer);

  /** ───────── Zustand (state) ───────── */
  const { modalTitle, trainors, dayPassId, dayPassTrainer } = useDayPassStore(
    (state) => ({
      modalTitle: state.modalTitle,
      trainors: state.trainors,
      dayPassId: state.dayPassId,
      dayPassTrainer: state.dayPassTrainer,
    }),
  );

  console.log("Zustand trainer:", dayPassTrainer);

  /** ───────── Local form state ───────── */
  const [formData, setFormData] = useState({
    trainer_id: 0,
    trainingDateStarted: "",
  });

  /** ───────── Load trainers ───────── */
  useEffect(() => {
    setTrainors();
  }, [setTrainors]);

  /** ───────── Sync from store → local form ───────── */
  useEffect(() => {
    if (!dayPassTrainer) return;

    setFormData({
      trainer_id: Number(dayPassTrainer.trainer_id) || 0,
      trainingDateStarted: dayPassTrainer.trainingDateStarted || "",
    });
  }, [dayPassTrainer]);

  useEffect(() => {
    if (!show) {
      setFormData({ trainer_id: 0, trainingDateStarted: "" });
    }
  }, [show]);

  /** ───────── Handlers ───────── */
  const handleChange = (e) => {
    const { name, value } = e.target;

    const updated = {
      ...formData,
      [name]: value,
    };

    setFormData(updated);
    setDayPassTrainer(updated);
  };

  const handleSave = async () => {
    if (!formData.trainer_id || !formData.trainingDateStarted) return;

    const data = new FormData();
    data.append("id", dayPassId);
    data.append("trainer_id", formData.trainer_id);
    data.append("trainingDateStarted", formData.trainingDateStarted);

    try {
      await updateDayPassPersonalTrainer(data);
      onHide();
    } catch (error) {
      console.error("Error saving trainer:", error);
    }
  };

  /** ───────── Render ───────── */
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <label className="col-form-label">Personal Trainer</label>
        <br />
        <select
          className="mySelect"
          name="trainer_id"
          value={formData.trainer_id}
          onChange={handleChange}
        >
          <option value={0}>--- Select Trainer ---</option>
          {trainors.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>
        <br />
        <label className="col-form-label mt-3">Training Date Started</label>
        <input
          type="datetime-local"
          className="form-control"
          name="trainingDateStarted"
          value={formData.trainingDateStarted}
          onChange={handleChange}
        />
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={handleSave}
          disabled={!formData.trainer_id}
        >
          Save changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DayPassAddTrainerModal;
