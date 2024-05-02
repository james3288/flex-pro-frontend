export const INITIAL_STATE = {
  name: "",
  data: [],
};

export const clientsOnWorkOutReducer = (state, action) => {
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
        name: "",
        data: [],
      };
  }
};
