export const ListOfTrainers = ({
  trainers,
  trainerField,
  handleSelectTrainer,
}) => {
  return (
    <div className="list-of-trainers">
      {trainerField != "" ? (
        <ul className="list-group">
          {trainers.map((trainer) => (
            <li
              className="list-group-item d-flex justify-content-between align-items-center"
              key={trainer.id}
            >
              {trainer.name.toUpperCase()}
              <span
                className="badge badge-primary badge-pill dreg"
                onClick={() =>
                  handleSelectTrainer(trainer.id, trainer.name, trainer.image)
                }
              >
                Select
              </span>
            </li>
          ))}
        </ul>
      ) : (
        ""
      )}
    </div>
  );
};
