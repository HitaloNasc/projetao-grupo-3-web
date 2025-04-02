import { IAddIndicatorDataModalViewModel } from "@/viewmodels/modals/useAddIndicatorDataModalViewModel";
import { Button, Form, Modal } from "react-bootstrap";
import styles from "./AddIndicatorDataModal.module.css";

export function AddIndicatorDataModal({
  handleSubmit,
  handleChange,
  handleCloseModal,
  // form,
  errors,
  showModal,
}: IAddIndicatorDataModalViewModel) {
  return (
    <Modal show={showModal} onHide={handleCloseModal} centered>
      <Modal.Header closeButton>
        <Modal.Title className={styles.modalTitle}>Adicionar dados</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(e) => e.preventDefault()}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Importar CSV</Form.Label>
            <Form.Control
              type="file"
              placeholder="Importar"
              onChange={handleChange("file")}
            />
            <Form.Control.Feedback type="invalid">
              {errors.name}
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="outline-light"
          className={styles.cancelButton}
          onClick={handleCloseModal}
        >
          Cancelar
        </Button>
        <Button className={styles.saveButton} onClick={handleSubmit}>
          Salvar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
