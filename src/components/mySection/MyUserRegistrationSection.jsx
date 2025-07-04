import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AgreementProvider } from "../../context/UserRegistrationContext";
import UserRegistrationContract from "./userRegistration/UserRegistrationContract";
import useFormRegistrationStore from "../../store/useFormRegistrationStore";

const MyUserRegistrationSection = ({
  handleFormFilter,
  inputError,
  formDone,
}) => {
  const navigate = useNavigate();
  const { formData, setField, setAgreements, resetForm } =
    useFormRegistrationStore();

  useEffect(() => {
    console.log(inputError);
  }, [inputError]);

  const handleChange = (e) => {
    setField(e.target.name, e.target.value);
  };

  const handleProceed = () => {
    // Validation
    if (formData.name === "" || !isNaN(formData.name)) return;
    if (
      formData.weights === "" ||
      formData.contact_number === "" ||
      formData.contact_number_ioe === ""
    )
      return;
    if (
      isNaN(formData.weights) ||
      isNaN(formData.contact_number) ||
      isNaN(formData.contact_number_ioe)
    )
      return;
    if (formData.agreements.length === 0) return;

    // Optional: handleFormFilter(1); // If you still need this

    // Access formData here if you want to send it to an API or context

    // Route to user-image-registration
    navigate("/user-image-registration");
  };

  const context = () => (
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
                  disabled={formDone}
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
                <span className="registrationError">
                  {formData.name === ""
                    ? "you must fill name..."
                    : !isNaN(formData.name) &&
                      "it must be a letter not a number"}
                </span>
                <input
                  type="text"
                  placeholder="Weight"
                  disabled={formDone}
                  name="weights"
                  value={formData.weights}
                  onChange={handleChange}
                />
                <span className="registrationError">
                  {formData.weights === ""
                    ? "you must fill weights"
                    : isNaN(formData.weights) &&
                      "it must be a number not a letter"}
                </span>
                <input
                  type="text"
                  placeholder="Contact Number"
                  disabled={formDone}
                  name="contact_number"
                  value={formData.contact_number}
                  onChange={handleChange}
                />
                <span className="registrationError">
                  {formData.contact_number === ""
                    ? "you must fill contact number"
                    : isNaN(formData.contact_number) &&
                      "it must be a number not a letter"}
                </span>
                <input
                  type="text"
                  placeholder="Contact Number Incase of Emergency"
                  disabled={formDone}
                  name="contact_number_ioe"
                  value={formData.contact_number_ioe}
                  onChange={handleChange}
                />
                <span className="registrationError">
                  {formData.contact_number_ioe === ""
                    ? "you must fill incase of emergency number "
                    : isNaN(formData.contact_number_ioe) &&
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
            <UserRegistrationContract />
          </div>
          <button className="btn btn-danger" onClick={handleProceed}>
            Proceed
          </button>
        </div>
        {/* Waiver form */}
      </div>
    </div>
  );

  return <AgreementProvider>{context()}</AgreementProvider>;
};

export default MyUserRegistrationSection;
