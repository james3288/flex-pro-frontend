export const INITIAL_STATE = {
  name: "",
  weights: "",
  contact_number: "",
  contact_number_ioe: "",
  agreements: [],
};

export const registrationFormReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_INPUT":
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };

    case "SELECT_OPTION":
      return {
        ...state,
        [action.payload.name]: [...action.payload.value],
      };
    default:
      return state;

    case "CLEAR":
      return {
        ...state,
        name: "",
        weights: "",
        contact_number: "",
        contact_number_ioe: "",
        agreements: [],
      };
  }
};
