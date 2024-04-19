import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import { NavLink } from "react-router-dom";
import getAgreements from "../../getData/getAgreements";
import { AgreementProvider } from "../../context/UserRegistrationContext";
import UserRegistrationContract from "./userRegistration/UserRegistrationContract";

const MyUserRegistrationSection = ({
  formData,
  setFormData,
  handleFormFilter,
  inputError,
  formDone,
  state,
  dispatch,
}) => {
  const [agreements, setAgreements] = useState([]);
  const [userAgreements, setUserAgreements] = useState([]);

  // let getAgreements = async () => {
  //   axios.get(`http://192.168.2.238:8000/api/user_agreement`).then((res) => {
  //     const agre = res.data;
  //     setAgreements(agre);
  //   });
  // };

  // const scrollToBottom = () => {
  //   scroll.scrollToBottom({
  //     duration: 500,
  //     smooth: "easeInOutQuint",
  //   });
  // };

  // let handleSubmit = () => {
  //   if (formData.name === "") {
  //     setInputError("Name is empty.");
  //     return; // Exit the function if name is empty
  //   } else if (formData.weights === "") {
  //     setInputError("Weights is empty.");
  //     return; // Exit the function if weights is empty
  //   } else if (isNaN(parseFloat(formData.weights))) {
  //     setInputError("Weights must be numeric.");
  //     return;
  //   } else if (formData.contact_number === "") {
  //     setInputError("Contact number is empty.");
  //     return; // Exit the function if contact number is empty
  //   } else if (formData.contact_number_ioe === "") {
  //     setInputError("Contact number IOE is empty.");
  //     return; // Exit the function if contact number IOE is empty
  //   }

  //   scrollToBottom();
  //   // axios
  //   //   .post("http://127.0.0.1:8000/api/save_users/", formData)
  //   //   .then(function (response) {
  //   //     console.log(response);
  //   //   })
  //   //   .catch(function (error) {
  //   //     console.log(error);
  //   //   });
  // };

  // const handleCheckboxChange = (event) => {
  //   const agreementId = parseInt(event.target.value);
  //   const isChecked = event.target.checked;

  //   if (isChecked) {
  //     setFormData((prevState) => ({
  //       ...prevState,
  //       agreements: [...prevState.agreements, agreementId],
  //     }));
  //   } else {
  //     setFormData((prevState) => ({
  //       ...prevState,
  //       agreements: prevState.agreements.filter((id) => id !== agreementId),
  //     }));
  //   }
  // };

  useEffect(() => {
    console.log(inputError);
  }, [inputError]);

  // useEffect(() => {
  //   console.log(state);
  // }, [state]);

  const handleChange = (e) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  const handleProceed = () => {
    // filter first before proceed
    if (state.name === "") {
      return;
    } else if (!isNaN(state.name)) {
      return;
    }

    if (
      state?.weights === "" ||
      state?.contact_number === "" ||
      state?.contact_number_ioe === ""
    ) {
      return;
    } else if (
      isNaN(state?.weights) ||
      isNaN(state?.contact_number) ||
      isNaN(state?.contact_number_ioe)
    ) {
      return;
    }

    if (state?.agreements.length == 0) {
      return;
    }

    // filter first before proceed
    handleFormFilter(1);
  };

  const context = () => {
    return (
      <div className="container content-margin">
        <div className="row">
          {/* Registration form */}
          <div className="col-lg-4 col-xs-12">
            <div className="dashboard-col">
              <span>
                <strong>REGISTRATION</strong> FORM
              </span>

              <div className="leave-comment r-form-fields">
                <p style={{ color: "orange" }}>{inputError}</p>
                <form action="#">
                  <input
                    type="text"
                    placeholder="Name"
                    // value={formData.name}
                    // onChange={(e) =>
                    //   setFormData({ ...formData, name: e.target.value })
                    // }
                    disabled={formDone}
                    name="name"
                    value={state?.name}
                    onChange={handleChange}
                  />

                  <span className="registrationError">
                    {state.name === ""
                      ? "you must fill name..."
                      : !isNaN(state.name) &&
                        "it must be a letter not a number"}
                  </span>

                  <input
                    type="text"
                    placeholder="Weight"
                    // value={formData.weights}
                    // onChange={(e) =>
                    //   setFormData({ ...formData, weights: e.target.value })
                    // }
                    disabled={formDone}
                    name="weights"
                    value={state?.weights}
                    onChange={handleChange}
                  />

                  <span className="registrationError">
                    {state?.weights === ""
                      ? "you must fill weights"
                      : isNaN(state?.weights) &&
                        "it must be a number not a letter"}
                  </span>

                  <input
                    type="text"
                    placeholder="Contact Number"
                    // value={formData.contact_number}
                    // onChange={(e) =>
                    //   setFormData({
                    //     ...formData,
                    //     contact_number: e.target.value,
                    //   })
                    // }
                    disabled={formDone}
                    name="contact_number"
                    value={state?.contact_number}
                    onChange={handleChange}
                  />

                  <span className="registrationError">
                    {state?.contact_number === ""
                      ? "you must fill contact number"
                      : isNaN(state?.contact_number) &&
                        "it must be a number not a letter"}
                  </span>

                  <input
                    type="text"
                    placeholder="Contact Number Incase of Emergency"
                    // value={formData.contact_number_ioe}
                    // onChange={(e) =>
                    //   setFormData({
                    //     ...formData,
                    //     contact_number_ioe: e.target.value,
                    //   })
                    // }
                    disabled={formDone}
                    name="contact_number_ioe"
                    value={state?.contact_number_ioe}
                    onChange={handleChange}
                  />

                  <span className="registrationError">
                    {state?.contact_number_ioe === ""
                      ? "you must fill incase of emergency number "
                      : isNaN(state?.contact_number_ioe) &&
                        "it must be a number not a letter"}
                  </span>
                </form>
              </div>
            </div>
          </div>
          {/* Registration form */}

          {/* Waiver form */}
          <div className="col-lg-6 col-xs-12">
            <div className="dashboard-col">
              {/* contract wrapper here */}
              <UserRegistrationContract
                setFormData={setFormData}
                state={state}
                dispatch={dispatch}
              />
            </div>
            <button
              className="btn btn-danger"
              // onClick={() => handleFormFilter(1)}
              onClick={handleProceed}
            >
              Proceed
            </button>

            {/* <ScrollLink
          to="userRegistrationId"
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
          className="btn btn-danger"
          style={{ color: "white" }}
          onClick={handleSubmit}
        >
          Proceed to Image Registration
        </ScrollLink> */}
          </div>
          {/* Waiver form */}
        </div>
      </div>
    );
  };

  return <AgreementProvider>{context()}</AgreementProvider>;
};

export default MyUserRegistrationSection;
