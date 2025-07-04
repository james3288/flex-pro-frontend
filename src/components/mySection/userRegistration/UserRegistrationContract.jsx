import React, { useContext } from "react";
import { AgreementContext } from "../../../context/UserRegistrationContext";
import useFormRegistrationStore from "../../../store/useFormRegistrationStore";

const UserRegistrationContract = () => {
  const { agreementDatas } = useContext(AgreementContext);
  const { formData, setAgreements } = useFormRegistrationStore();

  const handleCheckboxChange = (event) => {
    const agreementId = parseInt(event.target.value);
    const isChecked = event.target.checked;

    let newAgreements;
    if (isChecked) {
      newAgreements = [...formData.agreements, agreementId];
    } else {
      newAgreements = formData.agreements.filter((id) => id !== agreementId);
    }
    setAgreements(newAgreements);
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
            checked={formData.agreements.includes(agreement?.id)}
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
        {formData.agreements.length === 0 && (
          <p style={{ color: "orange", fontStyle: "italic" }}>
            Select an agreement first!
          </p>
        )}
      </div>
    </div>
  );
};

export default UserRegistrationContract;
