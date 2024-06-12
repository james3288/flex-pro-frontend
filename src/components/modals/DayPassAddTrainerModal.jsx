import React, { useEffect } from "react";
import { useDayPassStore } from "../../store/useDayPassStore";
import updateDayPassPersonalTrainer from "../mySection/dayPassUser/updateDayPassPersonalTrainer";

const DayPassAddTrainerModal = () => {
  //setter
  const { setTrainors, setDayPassTrainer } = useDayPassStore((state) => ({
    setTrainors: state.setTrainors,
    setDayPassTrainer: state.setDayPassTrainer,
  }));

  //getter
  const { modalTitle, dayPassUserId, trainors, addDayPassTrainer, dayPassId } =
    useDayPassStore((state) => ({
      modalTitle: state.modalTitle,
      dayPassUserId: state.dayPassUserId,
      trainors: state.trainors,
      addDayPassTrainer: state.addDayPassTrainer,
      dayPassId: state.dayPassId,
    }));

  useEffect(() => {
    setTrainors();
  }, []);

  const onChangeTrainer = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "trainersName":
        setDayPassTrainer({
          trainer_id: value,
          trainingDateStarted: document.querySelector(
            'input[name="trainer_date_started"]'
          ).value,
        });
        break;
      case "trainer_date_started":
        setDayPassTrainer({
          trainer_id: document.querySelector('select[name="trainersName"]')
            .value,
          trainingDateStarted: value,
        });
        break;
      default:
        break;
    }
  };

  const onSaveTrainer = () => {
    if (
      addDayPassTrainer.trainer_id != 0 &&
      addDayPassTrainer.trainingDateStarted != null
    ) {
      const data = new FormData();

      data.append("id", dayPassId);
      data.append("trainer_id", addDayPassTrainer.trainer_id);
      data.append("trainingDateStarted", addDayPassTrainer.trainingDateStarted);

      //update personal trainer for day pass
      updateDayPassPersonalTrainer(data);
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
              <label className="col-form-label">Personal Trainer:</label>
              <div>
                <select
                  className="mySelect"
                  name="trainersName"
                  onChange={onChangeTrainer}
                >
                  <option value={0}>--- Select Trainer ---</option>
                  {trainors?.map((trainer) => (
                    <option value={trainer.id} key={trainer?.id}>
                      {trainer?.name}
                    </option>
                  ))}
                </select>
              </div>

              <label className="col-form-label">Training Date Started:</label>
              <input
                type="datetime-local"
                className="form-control"
                name="trainer_date_started"
                onChange={onChangeTrainer}
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
              <button
                type="button"
                className="btn btn-primary"
                onClick={onSaveTrainer}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DayPassAddTrainerModal;
