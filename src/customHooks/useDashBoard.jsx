import React, { useState } from "react";
import { PageName } from "../constants/enum";
import MyDashboardSection from "../components/mySection/MyDashboardSection";
import MyUserRegistrationSection from "../components/mySection/MyUserRegistrationSection";
import MyUserImageRegSection from "../components/mySection/clientsOnline/MyUserImageRegSection";
import MyUserLoginSection from "../components/mySection/MyUserLoginSection";
import MySubscriptionPlan from "../components/mySection/Subscriptions/MySubscriptionPlan";
import MySubscribedNow from "../components/mySection/MySubscribedNow";
import MyCLientsOnWorkout from "../components/mySection/MyCLientsOnWorkout";
import MyUsers from "../components/mySection/users/MyUsers";
import MyActiveUser from "../components/mySection/activeUser/MyActiveUser";

const UseDashBoard = ({
  page,
  formDone,
  setFormDone,
  formData,
  setFormData,
  state,
  dispatch,
}) => {
  let content;
  const { inputError, handleFormFilter } = useDashBoardHook({ setFormDone });

  switch (page) {
    case PageName.DASHBOARD:
      content = <MyDashboardSection />;
      break;
    case PageName.USER_REGISTRATION:
      content = (
        <MyUserRegistrationSection
          formData={formData}
          setFormData={setFormData}
          handleFormFilter={handleFormFilter}
          formDone={formDone}
          inputError={inputError}
          state={state}
          dispatch={dispatch}
        />
      );
      break;
    case PageName.USER_IMAGE_REGISTRATION_NEW:
      content = <MyUserImageRegSection />;
      break;

    case PageName.USER_LOGIN:
      content = <MyUserLoginSection />;
      break;

    case PageName.SUBSCRIPTION_PLAN:
      content = <MySubscriptionPlan />;
      break;

    case PageName.SUBSCRIBE_NOW:
      content = <MySubscribedNow />;
      break;

    case PageName.CLIENTS_ON_WORKOUT:
      content = <MyCLientsOnWorkout />;
      break;

    case PageName.USERS_PAGE:
      content = <MyUsers />;
      break;

    case PageName.ACTIVE_USER:
      content = <MyActiveUser />; // Placeholder for active user dashboard
      break;

    default:
      content = <div>Default Dashboard</div>;
  }

  return content;
};

export const useDashBoardHook = ({ setFormDone }) => {
  const [inputError, setInputError] = useState("");

  const scrollToBottom = () => {
    scroll.scrollToBottom({
      duration: 500,
      smooth: "easeInOutQuint",
    });
  };

  const scrollToTop = () => {
    scroll.scrollToTop({
      duration: 500,
      smooth: "easeInOutQuint",
    });
  };

  const handleFormFilter = (param) => {
    if (param === 1) {
      scrollToBottom();
      setFormDone(true);
    }
  };

  return {
    inputError,
    scrollToBottom,
    scrollToTop,
    handleFormFilter,
  };
};

export default UseDashBoard;
