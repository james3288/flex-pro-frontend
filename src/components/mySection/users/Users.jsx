import React, { useRef, useState } from "react";

const Users1 = ({
  name,
  weight,
  image,
  user_id,
  user,
  setSelectedUser,
  contactNo,
}) => {
  const handleEdit = () => {
    setSelectedUser(() => user);
  };

  const handleRemove = () => {
    setSelectedUser(() => user);
  };

  return (
    <div className="col-lg-2 col-sm-3">
      <div className="ts-item set-bg bg">
        <img src={image} alt="" className="img" />
        <div className="ts_text">
          <h4>{name}</h4>
          <span>Contact: {contactNo}</span>
          <br />
          <a
            className="btn btn-primary ts-button"
            data-toggle="modal"
            data-target="#usersModal1"
            data-whatever="@mdo"
            style={{ color: "white" }}
            onClick={handleEdit}
          >
            Edit
          </a>
          <a className="btn btn-primary ts-button" style={{ color: "white" }}>
            History
          </a>
          <a
            className="btn btn-danger ts-button"
            data-toggle="modal"
            data-target="#deleteUserModal"
            data-whatever="@mdo"
            style={{ color: "white" }}
            onClick={handleRemove}
          >
            Remove
          </a>
          {/* <div className="tt_social"></div> */}
        </div>
      </div>
    </div>
  );
};

export default Users1;
