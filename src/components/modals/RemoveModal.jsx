import React, { useCallback } from "react";
import { Modal, Button } from "react-bootstrap";
import { useDayPassStore } from "../../store/useDayPassStore";
import deleteDayPassPT from "../../deleteData/deleteDayPassPT";
import shallow from "zustand/shallow";

const TrashIcon = React.memo(() => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    className="bi bi-trash3-fill"
    viewBox="0 0 16 16"
  >
    <path
      d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 
             11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 
             3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 
             0 0 1 6.5 0h3A1.5 1.5 0 0 1 
             11 1.5m-5 0v1h4v-1a.5.5 0 0 
             0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 
             5.029l.5 8.5a.5.5 0 1 0 
             .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 
             0 0 0-.528.47l-.5 8.5a.5.5 
             0 0 0 .998.058l.5-8.5a.5.5 
             0 0 0-.47-.528M8 
             4.5a.5.5 0 0 0-.5.5v8.5a.5.5 
             0 0 0 1 0V5a.5.5 0 0 
             0-.5-.5"
    />
  </svg>
));

const RemoveModal = () => {
  const {
    removeModalTitle,
    removeModalId,
    dayPassId,
    showRemoveModal,
    setShowRemoveModal,
  } = useDayPassStore(
    (state) => ({
      removeModalTitle: state.removeModalTitle,
      removeModalId: state.removeModalId,
      dayPassId: state.dayPassId,
      showRemoveModal: state.showRemoveModal,
      setShowRemoveModal: state.setShowRemoveModal,
    }),
    shallow, // prevents unnecessary re-renders
  );

  const handleRemoveDaypassPT = useCallback(async () => {
    try {
      const data = new FormData();
      data.append("id", dayPassId);

      await deleteDayPassPT(data);

      // Close modal after deletion
      setShowRemoveModal(false);
    } catch (err) {
      console.error("Error deleting Daypass PT:", err);
    }
  }, [dayPassId, removeModalId]);

  const modalMessages = {
    "remove-daypass-trainer":
      "Are you sure you want delete daypass personal trainer?",
  };

  return (
    <Modal
      show={showRemoveModal}
      onHide={() => setShowRemoveModal(false)}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title className="text-danger">
          <TrashIcon /> {removeModalTitle}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>{modalMessages[removeModalId]}</Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowRemoveModal(false)}>
          Close
        </Button>
        <Button variant="danger" onClick={handleRemoveDaypassPT}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RemoveModal;
