import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import getter from "../../getter/getter";

const animatedComponents = makeAnimated();

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const ReportsFilterModal = ({ show, onHide }) => {
  const [selectedUser, setSelectedUser] = useState([]);
  const { cUserSubscriptionReport } = getter();
  const [myOptions, setMyOptions] = useState(null);

  useEffect(() => {
    setMyOptions([
      {
        value: cUserSubscriptionReport[0].user,
        label: cUserSubscriptionReport[0].user,
      },
    ]);
  }, [cUserSubscriptionReport]);

  const handleOnchange = (option) => {
    setSelectedUser(option);
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Filter</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <label className="col-form-label">Category</label>
        <Select
          closeMenuOnSelect={false}
          components={animatedComponents}
          isMulti
          options={myOptions}
          onChange={handleOnchange}
        />
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary">Search</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ReportsFilterModal;
