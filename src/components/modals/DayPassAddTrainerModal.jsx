import React, { useEffect, useState } from "react";
import { useDayPassStore } from "../../store/useDayPassStore";
import updateDayPassPersonalTrainer from "../mySection/dayPassUser/updateDayPassPersonalTrainer";
import { Modal, Button } from "react-bootstrap";

const DayPassAddTrainerModal = ({ show, onHide }) => {
  // store setters
  const { setTrainors, setDayPassTrainer } = useDayPassStore((state) => ({
    setTrainors: state.setTrainors,
    setDayPassTrainer: state.setDayPassTrainer,
  }));

  // store getters
  const { modalTitle, dayPassUserId, trainors, addDayPassTrainer, dayPassId } =
    useDayPassStore((state) => ({
      modalTitle: state.modalTitle,
      dayPassUserId: state.dayPassUserId,
      trainors: state.trainors,
      addDayPassTrainer: state.addDayPassTrainer,
      dayPassId: state.dayPassId,
    }));

  // local state for form values (avoids querying DOM directly)
  const [formData, setFormData] = useState({
    trainer_id: 0,
    trainingDateStarted: "",
  });

  useEffect(() => {
    setTrainors();
  }, [setTrainors]);

  const onChangeTrainer = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // also update zustand store in sync
    setDayPassTrainer({
      trainer_id: name === "trainer_id" ? value : formData.trainer_id,
      trainingDateStarted:
        name === "trainingDateStarted" ? value : formData.trainingDateStarted,
    });
  };

  const onSaveTrainer = async () => {
    if (formData.trainer_id != 0 && formData.trainingDateStarted) {
      const data = new FormData();
      data.append("id", dayPassId);
      data.append("trainer_id", formData.trainer_id);
      data.append("trainingDateStarted", formData.trainingDateStarted);

      try {
        await updateDayPassPersonalTrainer(data);
      } catch (error) {
        console.error("Error saving trainer:", error);
      }
    }
  };

  return (
    // <div
    //   className="modal fade"
    //   id={dayPassUserId}
    //   role="dialog"
    //   aria-labelledby="exampleModalLongTitle"
    //   aria-hidden="true"
    // >
    //   <div className="modal-dialog" role="document">
    //     <div className="modal-content">
    //       <div className="modal-header">
    //         <h5 className="modal-title" id="exampleModalLongTitle">
    //           {modalTitle}
    //         </h5>
    //         <button
    //           type="button"
    //           className="close"
    //           data-dismiss="modal"
    //           aria-label="Close"
    //         >
    //           <span aria-hidden="true">&times;</span>
    //         </button>
    //       </div>

    //       <div className="modal-body">
    //         <label className="col-form-label">Personal Trainer:</label>
    //         <div>
    //           <select
    //             className="mySelect"
    //             name="trainer_id"
    //             value={formData.trainer_id}
    //             onChange={onChangeTrainer}
    //           >
    //             <option value={0}>--- Select Trainer ---</option>
    //             {trainors?.map((trainer) => (
    //               <option value={trainer.id} key={trainer?.id}>
    //                 {trainer?.name}
    //               </option>
    //             ))}
    //           </select>
    //         </div>

    //         <label className="col-form-label">Training Date Started:</label>
    //         <input
    //           type="datetime-local"
    //           className="form-control"
    //           name="trainingDateStarted"
    //           value={formData.trainingDateStarted}
    //           onChange={onChangeTrainer}
    //         />
    //       </div>

    //       <div className="modal-footer">
    //         <button
    //           type="button"
    //           className="btn btn-secondary"
    //           data-dismiss="modal"
    //         >
    //           Close
    //         </button>
    //         <button
    //           type="button"
    //           className="btn btn-primary"
    //           onClick={onSaveTrainer}
    //         >
    //           Save changes
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div>
          <label className="col-form-label">Personal Trainer:</label>
          <br />
          <select
            className="mySelect"
            name="trainer_id"
            value={formData.trainer_id}
            onChange={onChangeTrainer}
          >
            <option value={0}>--- Select Trainer ---</option>
            {trainors?.map((trainer) => (
              <option value={trainer.id} key={trainer?.id}>
                {trainer?.name}
              </option>
            ))}
          </select>
          <br />
          <label className="col-form-label">Training Date Started:</label>
          <br />
          <input
            type="datetime-local"
            className="form-control"
            name="trainingDateStarted"
            value={formData.trainingDateStarted}
            onChange={onChangeTrainer}
          />
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={onSaveTrainer}>
          Save changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DayPassAddTrainerModal;
