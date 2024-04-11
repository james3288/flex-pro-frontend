import React, { useContext } from "react";
import { AgreementContext } from "../../../context/UserRegistrationContext";

const UserRegistrationContract = ({ setFormData }) => {
  const { agreementDatas } = useContext(AgreementContext);

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

  return (
    <div className="contract-wrapper">
      <span>
        <strong>MEMBERSHIP</strong> AGGREMENT CONTRACT
      </span>

      {agreementDatas.agreementData?.map((agreement) => (
        <div className="checkbox-wrapper" key={agreement?.id}>
          <input
            type="checkbox"
            value={agreement?.id}
            className="cbox"
            onChange={handleCheckboxChange}
          />
          <p>{agreement?.agreement_desc}</p>
        </div>
      ))}

      <div className="liability-wrapper">
        <h5>
          LIABILITY <strong>WAIVER</strong>
        </h5>

        <p>
          I acknowledge that I am responsible for my own health and pyhsical
          condition. Also, I understand that my participation in this exercise
          program could cause injury based on performing these activities.
        </p>
        <p>
          No fitness trainer or fellow members are liable for any accidental
          injuries in which I may incur in participating exercises.
        </p>
        <p>
          I assume all risk connected to all programs and consent to
          participate. The Company, Management, Employees shall not be
          responsible for any claims, demands, losses, actions or legal
          proceedings due to or otherwise arising from death, injury loss,
          damage, or theft to a Members person or property attributable to,
          arising out of or otherwise in connection with the use by a member or
          any other member of any services, facilities, equipment of fitness
          gym.
        </p>
      </div>
    </div>
  );
};

export default UserRegistrationContract;
