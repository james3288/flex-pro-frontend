import React, { useEffect, useReducer, useRef } from "react";
import { INITIAL_STATE, formReducer } from "../../../reducers/usersReducer";
import updateUsers from "./UpdateUsers";
import { Button, Modal } from "react-bootstrap";

const UsersModal = ({
  id,
  option,
  name,
  selectedUsers,
  show,
  onHide,
  modalTitle,
}) => {
  const [state, dispatch] = useReducer(formReducer, INITIAL_STATE);
  const refName = useRef(null);
  const refWeight = useRef(null);
  const refContactNo = useRef(null);
  const refEmergencyNo = useRef(null);

  const handleChange = (e) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  const handleUpdate = async () => {
    console.log(state);
    if (state.name == "" || !isNaN(state.name)) {
      return;
    } else if (state.weight == "" || isNaN(state.weight)) {
      return;
    } else if (state.contactNo == "" || isNaN(state.contactNo)) {
      return;
    } else if (
      state.contact_number_ioe == "" ||
      isNaN(state.contact_number_ioe)
    ) {
      return;
    }

    const updateData = new FormData();
    updateData.append("id", state.id);
    updateData.append("name", state.name);
    updateData.append("weight", state.weight);
    updateData.append("contactNo", state.contactNo);
    updateData.append("contact_number_ioe", state.contact_number_ioe);

    updateUsers(updateData);

    dispatch({ type: "CLEAR" });
  };

  useEffect(() => {
    if (option === "Update" && selectedUsers) {
      console.log(selectedUsers);
      refName.current.value = selectedUsers?.flex_pro_user?.name;
      refWeight.current.value = selectedUsers?.flex_pro_user?.weights;
      refContactNo.current.value = selectedUsers?.flex_pro_user?.contact_number;
      refEmergencyNo.current.value =
        selectedUsers?.flex_pro_user?.contact_number_ioe;
      // refImage.current.value = file;

      // console.log(file);

      // FILL ALL DATA TO STATE
      dispatch({
        type: "CHANGE_INPUT",
        payload: {
          name: "id",
          value: selectedUsers?.flex_pro_user?.id,
        },
      });

      dispatch({
        type: "CHANGE_INPUT",
        payload: {
          name: refName.current.name,
          value: refName.current.value,
        },
      });

      dispatch({
        type: "CHANGE_INPUT",
        payload: {
          name: refWeight.current.name,
          value: refWeight.current.value,
        },
      });

      dispatch({
        type: "CHANGE_INPUT",
        payload: {
          name: refContactNo.current.name,
          value: refContactNo.current.value,
        },
      });

      dispatch({
        type: "CHANGE_INPUT",
        payload: {
          name: refEmergencyNo.current.name,
          value: refEmergencyNo.current.value,
        },
      });

      // END FILL ALL DATA TO STATE
    }
  }, [selectedUsers, show]);

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>User Information</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="form-group">
          <label className="col-form-label">Name:</label>
          <input
            type="text"
            className="form-control"
            id="recipient-name"
            // value={trainersName}
            name="name"
            // onChange={(e) => setTrainersName(e.target.value)}
            onChange={handleChange}
            ref={refName}
          />
          {state.name == "" ? (
            <span style={{ color: "red" }}>Fill users name</span>
          ) : (
            !isNaN(state.name) && (
              <span style={{ color: "red" }}>must not numeric</span>
            )
          )}
        </div>
        <div className="form-group">
          <label className="col-form-label">Weight:</label>
          <input
            type="text"
            className="form-control"
            id="weightId"
            ref={refWeight}
            onChange={handleChange}
            name="weight"
          />
          {state.weight == "" ? (
            <span style={{ color: "red" }}>Fill weight</span>
          ) : (
            isNaN(state.weight) && (
              <span style={{ color: "red" }}>must numeric</span>
            )
          )}
        </div>
        <div className="form-group">
          <label className="col-form-label">Contact Number:</label>
          <input
            type="text"
            className="form-control"
            id="contactNumberId"
            // onChange={(e) => setContactNo(e.target.value)}
            // value={contactNo}
            ref={refContactNo}
            onChange={handleChange}
            name="contactNo"
            placeholder="09+"
          />
          {state.contactNo == "" ? (
            <span style={{ color: "red" }}>Fill contact No</span>
          ) : (
            isNaN(state.contactNo) && (
              <span style={{ color: "red" }}>must be numeric</span>
            )
          )}
        </div>

        <div className="form-group">
          <label className="col-form-label">Emergency Number:</label>
          <input
            type="text"
            className="form-control"
            id="emergencyNumberId"
            // onChange={(e) => setContactNo(e.target.value)}
            // value={contactNo}
            ref={refEmergencyNo}
            onChange={handleChange}
            name="contact_number_ioe"
            placeholder="09+"
          />
          {state.contact_number_ioe == "" ? (
            <span style={{ color: "red" }}>Fill contact No</span>
          ) : (
            isNaN(state.contact_number_ioe) && (
              <span style={{ color: "red" }}>must be numeric</span>
            )
          )}
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        {option === "Save" ? (
          // <button
          //   type="button"
          //   className="btn btn-primary"
          //   // onClick={handleSave}
          // >
          //   Save
          // </button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        ) : (
          <Button variant="primary" onClick={handleUpdate}>
            Update
          </Button>
          // <button
          //   type="button"
          //   className="btn btn-primary"
          //   onClick={handleUpdate}
          // >
          //   Update
          // </button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default UsersModal;
