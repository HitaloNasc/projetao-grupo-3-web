import { IAddIndicatorModalViewModel } from "@/viewmodels/modals/useAddIndicatorModalViewModel";
import { Button, Form, Modal } from "react-bootstrap";
import styles from "./AddIndicatorModal.module.css";

export function AddIndicatorModal({
  handleSubmit,
  handleChange,
  handleCloseModal,
  form,
  errors,
  showModal,
}: IAddIndicatorModalViewModel) {
  return (
    <Modal show={showModal} onHide={handleCloseModal} centered>
      <Modal.Header closeButton>
        <Modal.Title className={styles.modalTitle}>
          Adicionar Indicador
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(e) => e.preventDefault()}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nome do indicador"
              value={form?.name}
              onChange={handleChange("name")}
              isInvalid={!!errors.name}
            />
            <Form.Control.Feedback type="invalid">
              {errors.name}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Descrição</Form.Label>
            <Form.Control
              type="text"
              placeholder="Descrição do indicador"
              value={form?.description}
              onChange={handleChange("description")}
              isInvalid={!!errors.description}
            />
            <Form.Control.Feedback type="invalid">
              {errors.description}
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
