import React, { memo, Suspense, useCallback } from "react";
import { NavLink } from "react-router-dom";
import Loader3 from "../../ui/loader3/Loader3";

const buttonStyle = { color: "white" };

const Users1 = ({
  name,
  image,
  user_id,
  user,
  setSelectedUser,
  contactNo,
  setShowUsersInfoModal,
  setShowRemoveUserModal,
  setShowContractModal,
}) => {
  const openModal = useCallback(
    (setModal) => {
      setSelectedUser(user);
      setModal(true);
    },
    [setSelectedUser, user],
  );

  return (
    <div className="col-lg-2 col-sm-3">
      <div className="ts-item set-bg bg">
        <img src={image} alt={`${name}'s profile`} className="img" />
        <div className="ts_text">
          <h4>
            <small style={{ color: "green" }}>{user_id}</small> {name}
          </h4>
          <span>Contact: {contactNo}</span>
          <br />
          <a
            type="button"
            className="btn btn-primary ts-button"
            style={buttonStyle}
            data-toggle="modal"
            data-target="#usersModal1"
            data-whatever="@mdo"
            onClick={() => openModal(setShowUsersInfoModal)}
          >
            Edit
          </a>

          <NavLink
            className="btn btn-primary ts-button"
            to={`/user-history/?q=${user_id}`}
            style={buttonStyle}
          >
            History
          </NavLink>

          <button
            type="button"
            className="btn btn-danger ts-button"
            style={buttonStyle}
            data-toggle="modal"
            data-target="#deleteUserModal"
            onClick={() => openModal(setShowRemoveUserModal)}
          >
            Remove
          </button>

          <button
            type="button"
            className="btn btn-success ts-button"
            style={buttonStyle}
            data-toggle="modal"
            data-target="#userContractModal"
            onClick={() => openModal(setShowContractModal)}
          >
            Download Contract
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(Users1);
