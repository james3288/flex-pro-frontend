import { useReducer, useState } from "react";
import DashboardPage from "../DashboardPage";

import "./userRegistrationPage.scss";

import {
  INITIAL_STATE,
  registrationFormReducer,
} from "../../reducers/registrationFormReducer";

const UserRegistrationPage = () => {
  const [formDone, setFormDone] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    weights: "",
    contact_number: "",
    contact_number_ioe: "",
    agreements: [],
    folder: "http://localhost:5173/",
  });

  const [state, dispatch] = useReducer(registrationFormReducer, INITIAL_STATE);

  return (
    <>
      <DashboardPage
        dashboardBg="userRegistration"
        page="userRegistration"
        formDone={formDone}
        setFormDone={setFormDone}
        formData={formData}
        setFormData={setFormData}
        state={state}
        dispatch={dispatch}
      />
      {/* end user registration */}

      <DashboardPage
        dashboardBg="userImageRegistration"
        page="userImageRegistration"
        formDone={formDone}
        setFormDone={setFormDone}
        formData={formData}
        setFormData={setFormData}
        state={state}
        dispatch={dispatch}
      />
    </>
  );
};

export default UserRegistrationPage;
