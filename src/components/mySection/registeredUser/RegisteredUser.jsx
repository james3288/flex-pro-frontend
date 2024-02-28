import React from "react";

const RegisteredUser = ({
  registeredName,
  pix,
  weights,
  blobPix,
  user_id,
  subscription,
}) => {
  return (
    <div className="clients-online">
      <div className="row row2">
        <div className="col-3">
          <img
            src={blobPix}
            alt=""
            className="circle"
            style={{ border: "2px solid red" }}
          />
        </div>
        <div className="col-7">
          <div className="clients-flex">
            <h5>{registeredName}</h5>
            <p>ID: {user_id}</p>
            <p style={{ color: "yellow", fontSize: "18px" }}>{subscription}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisteredUser;
