export const INITIAL_STATE = {
  trainersName: 0,
  session_days: 0,
};

export const addTrainorReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_INPUT":
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
      };
  }
};
