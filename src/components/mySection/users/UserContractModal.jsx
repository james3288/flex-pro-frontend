import React from "react";
import PdfGenerator from "../../PDF/PdfGenerator";
import { Modal } from "react-bootstrap";

const UserContractModal = ({ id, user, show, onHide }) => {
  // console.log(id, user);
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>
          <h5 className="modal-title" id="exampleModalLabel">
            USER CONTRACT AGREEMENT
          </h5>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <PdfGenerator user={user} />
      </Modal.Body>

      <Modal.Footer></Modal.Footer>
    </Modal>
  );
};

export default UserContractModal;
