import React from "react";
import { Modal, Button } from "react-bootstrap";

const ExtendSubscriptionModal2 = ({
  show,
  onHide,
  modalTitle,
  userSubscriptionId,
}) => {
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <label className="col-form-label">Subscription</label>
        <div>
          <select className="mySelect" name="subscriptionId">
            <option value={0}>-- Select Extended Subscription --</option>
          </select>
        </div>
        {/* extended days inputbox */}
        <label className="col-form-label">Extended (days):</label>
        <div>
          <input
            type="text"
            className="form-control"
            id="personal-training-session"
            name="session_days"
          />
        </div>
        <label className="col-form-label">Promo options:</label>
        <div>
          <select className="mySelect" name="promo_option" id={"status"}>
            <option value={""}>-- Select Options --</option>
            <option value={"promo"}>Promo</option>
          </select>
        </div>

        {/* promo rate inputbox */}
        <label className="col-form-label">Promo rate:</label>
        <div>
          <input type="text" className="form-control" name="promo_rate" />
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        {modalTitle === "Extend Subscriptions" ? (
          <Button variant="primary">Save changes</Button>
        ) : (
          <Button variant="primary">Update changes</Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};
export default ExtendSubscriptionModal2;
