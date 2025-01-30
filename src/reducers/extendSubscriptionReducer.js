export const INITIAL_STATE = {
  userSubscriptionId: 0,
  subscriptionId: 0,
  session_days: 0,
  promo_option: null,
  promo_rate: 0,
};

export const extendSubscriptionReducer = (state, action) => {
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
        userSubscriptionId: 0,
        subscriptionId: 0,
        session_days: 0,
        promo_option: null,
        promo_rate: 0,
      };
  }
};
