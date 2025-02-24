import { useEffect, useReducer, useRef, useState } from "react";
import {
  extendSubscriptionReducer,
  INITIAL_STATE,
} from "../reducers/extendSubscriptionReducer";
import getSubscriptions from "../getData/getSubscriptions";
import getSpecificExtendedSubscription from "../getData/getSpecificExtendedSubscription";
import extendNewSubscription from "../components/mySection/activeUser/extendNewSubscription";
import updateExtendSubscription from "../components/mySection/activeUser/updateExtendSubscription";

export default function useExtendSubscriptionModal({ userSubscriptionId }) {
  const [subscription, setSubscription] = useState([]);
  const [extendedSubcription, setExtendedSubscription] = useState({});
  const [promoRateEnable, setPromoRateEnable] = useState(false);

  const [state, dispatch] = useReducer(
    extendSubscriptionReducer,
    INITIAL_STATE
  );

  const refTrainingSession = useRef(null);
  const refPromoRate = useRef(null);
  const refOption = useRef(null);

  useEffect(() => {
    const getsubscript = async () => {
      let data = await getSubscriptions();
      setSubscription(data);
    };

    const getSpecificExtendSub = async () => {
      let data = await getSpecificExtendedSubscription(userSubscriptionId);
      setExtendedSubscription(data);

      console.log(data);

      refTrainingSession.current.value =
        data?.extended_session_day === undefined
          ? 0
          : data?.extended_session_day;

      refPromoRate.current.value =
        data?.promo_rate === undefined ? 0 : data?.promo_rate;

      // userSubscriptionId: 0,
      // subscriptionId: 0,
      // session_days: 0,

      dispatch({
        type: "CHANGE_INPUT",
        payload: {
          name: "subscriptionId",
          value: data?.subscription?.id,
        },
      });

      dispatch({
        type: "CHANGE_INPUT",
        payload: {
          name: "promo_option",
          value: data?.options,
        },
      });

      dispatch({
        type: "CHANGE_INPUT",
        payload: {
          name: "session_days",
          value: data?.extended_session_day,
        },
      });
    };

    getsubscript();
    getSpecificExtendSub();
  }, [userSubscriptionId]);

  useEffect(() => {
    state?.promo_option == "promo"
      ? setPromoRateEnable(false)
      : setPromoRateEnable(true);
  }, [state.promo_option]);

  //   handle change input text
  const handleChange = (e) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  // handle save extended subscription
  const handleSave = () => {
    if (state.subscriptionId == 0 || state.subscriptionId === undefined) {
      return;
    } else if (userSubscriptionId == 0) {
      return;
    } else if (state.session_days == 0 || state.session_days === undefined) {
      return;
    }

    if (state.promo_option === "promo") {
      if (isNaN(state.promo_rate)) {
        return;
      }
    }

    const updateData = new FormData();
    updateData.append("userSubscriptionId", userSubscriptionId);
    updateData.append("subscriptionId", state.subscriptionId);
    updateData.append("session_days", state.session_days);
    updateData.append("promo_option", state.promo_option);
    updateData.append("promo_rate", state.promo_rate);

    // const updateDataObj = Object.fromEntries(updateData.entries());

    // console.log(JSON.stringify(updateDataObj));
    // save
    extendNewSubscription(updateData);
  };

  // handle update extended subscription
  const handleUpdate = () => {
    // NOTE: userSubscriptionId = extendedSubscriptionId
    if (state.subscriptionId == 0 || state.subscriptionId === undefined) {
      return;
    } else if (userSubscriptionId == 0) {
      return;
    } else if (state.session_days == 0 || state.session_days === undefined) {
      return;
    }

    if (promoRateEnable == "promo") {
      if (isNaN(state.promo_rate)) {
        return;
      }
    }

    const updateData = new FormData();
    updateData.append("extendedSubscriptionId", userSubscriptionId);
    updateData.append("subscriptionId", state.subscriptionId);
    updateData.append("session_days", state.session_days);
    updateData.append("promo_option", state.promo_option);
    updateData.append("promo_rate", state.promo_rate);

    // update
    updateExtendSubscription(updateData);
  };

  return {
    subscription,
    extendedSubcription,
    refTrainingSession,
    refPromoRate,
    refOption,
    state,
    promoRateEnable,
    handleChange,
    handleSave,
    handleUpdate,
  };
}
