import React from "react";

const RegisteredUser = ({ pix, registeredName, weights, age }) => {
  return (
    <div className="clients-online">
      <div className="row row2">
        <div className="col-3">
          <img
            src={pix}
            alt=""
            className="circle"
            style={{ border: "2px solid red" }}
          />
        </div>
        <div className="col-7">
          <div className="clients-flex">
            <h5>{registeredName}</h5>
            <p>{age} years old</p>
            <p>{weights} lbs</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisteredUser;
