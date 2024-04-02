import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const MyUserRegistrationSection = ({
  formData,
  setFormData,
  handleFormFilter,
  inputError,
  formDone,
}) => {
  const [agreements, setAgreements] = useState([]);

  let getAgreements = async () => {
    axios.get(`http://127.0.0.1:8000/api/user_agreement`).then((res) => {
      const agre = res.data;
      setAgreements(agre);
    });
  };
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

  const handleCheckboxChange = (event) => {
    const agreementId = parseInt(event.target.value);
    const isChecked = event.target.checked;

    if (isChecked) {
      setFormData((prevState) => ({
        ...prevState,
        agreements: [...prevState.agreements, agreementId],
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        agreements: prevState.agreements.filter((id) => id !== agreementId),
      }));
    }
  };

  useEffect(() => {
    getAgreements();
  }, []);

  useEffect(() => {
    console.log(inputError);
  }, [inputError]);

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
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  disabled={formDone}
                />
                <input
                  type="text"
                  placeholder="Weight"
                  value={formData.weights}
                  onChange={(e) =>
                    setFormData({ ...formData, weights: e.target.value })
                  }
                  disabled={formDone}
                />
                <input
                  type="text"
                  placeholder="Contact Number"
                  value={formData.contact_number}
                  onChange={(e) =>
                    setFormData({ ...formData, contact_number: e.target.value })
                  }
                  disabled={formDone}
                />
                <input
                  type="text"
                  placeholder="Contact Number Incase of Emergency"
                  value={formData.contact_number_ioe}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      contact_number_ioe: e.target.value,
                    })
                  }
                  disabled={formDone}
                />
              </form>
            </div>
          </div>
        </div>
        {/* Registration form */}

        {/* Waiver form */}
        <div className="col-lg-6 col-xs-12">
          <div className="dashboard-col">
            <div className="contract-wrapper">
              <span>
                <strong>MEMBERSHIP</strong> AGGREMENT CONTRACT
              </span>

              {agreements.map((agreement) => (
                <div className="checkbox-wrapper" key={agreement.id}>
                  <input
                    type="checkbox"
                    value={agreement.id}
                    className="cbox"
                    onChange={handleCheckboxChange}
                  />
                  <p>{agreement.agreement_desc}</p>
                </div>
              ))}

              <div className="liability-wrapper">
                <h5>
                  LIABILITY <strong>WAIVER</strong>
                </h5>

                <p>
                  I acknowledge that I am responsible for my own health and
                  pyhsical condition. Also, I understand that my participation
                  in this exercise program could cause injury based on
                  performing these activities.
                </p>
                <p>
                  No fitness trainer or fellow members are liable for any
                  accidental injuries in which I may incur in participating
                  exercises.
                </p>
                <p>
                  I assume all risk connected to all programs and consent to
                  participate. The Company, Management, Employees shall not be
                  responsible for any claims, demands, losses, actions or legal
                  proceedings due to or otherwise arising from death, injury
                  loss, damage, or theft to a Members person or property
                  attributable to, arising out of or otherwise in connection
                  with the use by a member or any other member of any services,
                  facilities, equipment of fitness gym.
                </p>
              </div>
            </div>
          </div>
          <button
            className="btn btn-danger"
            onClick={() => handleFormFilter(1)}
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

export default MyUserRegistrationSection;
