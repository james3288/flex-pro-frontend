export const INITIAL_STATE = {
  trainersName: 0,
  session_days: 0,
  trainer_date_started: null,
};

export const addTrainorReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_INPUT":
      console.log("sdfdsf", state.trainer_date_started);
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };

    default:
      return state;

    case "CLEAR":
      return {
        ...state,
        trainersName: 0,
        session_days: 0,
        trainer_date_started: null,
      };
  }
};
