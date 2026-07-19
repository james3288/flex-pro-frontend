import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const StaffBypassModal = ({ show, onHide, onConfirm, staticPassword = "STAFFPASS" }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleConfirm = () => {
    if (password === staticPassword) {
      setError(null);
      onConfirm && onConfirm();
      setPassword("");
    } else {
      setError("Incorrect password");
    }
  };

  return (
    <Modal show={show} onHide={() => { setPassword(""); setError(null); onHide && onHide(); }} centered style={{ zIndex: 9999 }}>
      <Modal.Header closeButton>
        <Modal.Title>Staff Bypass</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Enter staff password to bypass</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Staff password"
              autoFocus
            />
          </Form.Group>
          {error && (
            <div style={{ color: "red", marginTop: 8 }}>{error}</div>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => { setPassword(""); setError(null); onHide && onHide(); }}>
          Close
        </Button>
        <Button variant="primary" onClick={handleConfirm}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default StaffBypassModal;
