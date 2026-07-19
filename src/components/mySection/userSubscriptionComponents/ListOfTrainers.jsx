import { memo, useCallback, useEffect, useMemo, useState } from "react";
import instance from "../../../others/axiosInstance";

const useTrainersServices = ({ trainerField, setSearchOnShow }) => {
  const [flexProTrainers, setFlexProTrainers] = useState([]);
  const [searchTrainer, setSearchTrainer] = useState([]);

  const getTrainers = useCallback(async () => {
    await instance.get(`/api/get_trainers/`).then((res) => {
      const trainers = res.data;

      setFlexProTrainers(trainers);
    });
  }, []);

  //   load all trainers here
  useEffect(() => {
    getTrainers();
  }, []);

  useEffect(() => {
    const trainerResult = flexProTrainers?.filter((trainer) =>
      trainer.name.toLowerCase().includes(trainerField.toLowerCase()),
    );

    setSearchTrainer(trainerResult);

    if (trainerField.length > 0) {
      setSearchOnShow(true);
    } else {
      setSearchOnShow(false);
    }
  }, [trainerField]);

  return { flexProTrainers, searchTrainer };
};

export const ListOfTrainers = memo(({ trainerField, handleSelectTrainer }) => {
  const [searchOnShow, setSearchOnShow] = useState(false);

  const { searchTrainer } = useTrainersServices({
    trainerField,
    setSearchOnShow,
  });

  return (
    <div className="list-of-trainers">
      {searchOnShow && (
        <ul className="list-group">
          {searchTrainer?.map((trainer) => (
            <li
              className="list-group-item d-flex justify-content-between align-items-center"
              key={trainer.id}
            >
              {trainer.name.toUpperCase()}
              <span
                className="badge badge-primary badge-pill dreg"
                onClick={() => {
                  handleSelectTrainer(trainer.id, trainer.name, trainer.image);
                  setSearchOnShow(false);
                }}
              >
                Select
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});
