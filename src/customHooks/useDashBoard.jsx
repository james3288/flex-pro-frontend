import React, { useState } from "react";
import { PageName } from "../constants/enum";
import MyDashboardSection from "../components/mySection/MyDashboardSection";
import MyUserRegistrationSection from "../components/mySection/MyUserRegistrationSection";
import MyUserImageRegSection from "../components/mySection/clientsOnline/MyUserImageRegSection";
import UserImageRegistrationNewPage from "../pages/userImageRegistrationPage/UserImageRegistrationNewPage";
import UserImageRegistrationPage from "../pages/userImageRegistrationPage/UserImageRegistrationPage";

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
  const { inputError, handleFormFilter, scrollToBottom, scrollToTop } =
    useDashBoardHook({ setFormDone });

  switch (page) {
    case PageName.DASHBOARD:
      content = <MyDashboardSection />;
      break;
    case PageName.USER_REGISTRATION:
      content = (
        <>
          <MyUserRegistrationSection
            formData={formData}
            setFormData={setFormData}
            handleFormFilter={handleFormFilter}
            formDone={formDone}
            inputError={inputError}
            state={state}
            dispatch={dispatch}
          />
          {/* <MyUserImageRegSection
            formData={formData}
            setFormData={setFormData}
            formDone={formDone}
            inputError={inputError}
            state={state}
            dispatch={dispatch}
          /> */}
        </>
      );
      break;
    case PageName.USER_IMAGE_REGISTRATION_NEW:
      content = <MyUserImageRegSection />;
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
