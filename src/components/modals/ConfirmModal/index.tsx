import { IConfirmModalViewModel } from "@/viewmodels/modals/useConfirmModalViewModel";
import { Button, Modal } from "react-bootstrap";
import styles from "./ConfirmModal.module.css";

export function ConfirmModal({
  handleSubmit,
  handleCloseModal,
  showModal,
  message,
}: IConfirmModalViewModel) {
  return (
    <Modal show={showModal} onHide={handleCloseModal} centered>
      <Modal.Header closeButton>
        <Modal.Title className={styles.modalTitle}>Confirmar</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button
          variant="outline-light"
          className={styles.cancelButton}
          onClick={handleCloseModal}
        >
          Cancelar
        </Button>
        <Button className={styles.saveButton} onClick={handleSubmit}>
          Confirmar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
