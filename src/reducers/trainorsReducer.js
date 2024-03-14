export const INITIAL_STATE = {
  id: 0,
  trainersName: "",
  position: "",
  contactNo: "",
  image: null,
};

export const formReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_INPUT":
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case "CHANGE_IMAGE":
      return { ...state, [action.payload.name]: action.payload.value };
    default:
      return state;

    case "CLEAR":
      return {
        ...state,
        trainersName: "",
        position: "",
        contactNo: "",
        image: null,
      };
  }
};
