import React, { useRef, useState } from "react";
import { NavLink } from "react-router-dom";

const Users1 = ({
  name,
  weight,
  image,
  user_id,
  user,
  setSelectedUser,
  contactNo,
  setShowUsersInfoModal,
  setShowRemoveUserModal,
}) => {
  const handleEdit = () => {
    setSelectedUser(() => user);
    setShowUsersInfoModal(true);
  };

  const handleRemove = () => {
    setSelectedUser(() => user);
    setShowRemoveUserModal(true);
  };

  const handleDownloadPDF = () => {
    setSelectedUser(() => user);
  };

  return (
    <div className="col-lg-2 col-sm-3">
      <div className="ts-item set-bg bg">
        <img src={image} alt="" className="img" />
        <div className="ts_text">
          <h4>
            <small style={{ color: "green" }}>{user_id}</small> {name}
          </h4>
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
          <NavLink
            className="btn btn-primary ts-button"
            to={`/user-history/?q=${user_id}`}
            style={{ color: "white" }}
          >
            History
          </NavLink>

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
          <a
            className="btn btn-success ts-button"
            style={{ color: "white" }}
            data-toggle="modal"
            data-target="#userContractModal"
            onClick={handleDownloadPDF}
          >
            Download Contract
          </a>
        </div>
      </div>
    </div>
  );
};

export default Users1;
