import { IAddEditDriverModalViewModel } from "@/viewmodels/modals/useAddEditDriverModalViewModel";
import { Button, Form, Modal } from "react-bootstrap";
import styles from "./AddEditDriverModal.module.css";

export function AddEditDriverModal({
  handleSubmit,
  handleChange,
  handleCloseModal,
  form,
  errors,
  showModal,
}: IAddEditDriverModalViewModel) {
  const isEdit = !!form?.id;

  return (
    <Modal show={showModal} onHide={handleCloseModal} centered>
      <Modal.Header closeButton>
        <Modal.Title className={styles.modalTitle}>
          {isEdit ? "Editar Motorista" : "Adicionar Motorista"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(e) => e.preventDefault()}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Nome completo</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nome"
              value={form?.name}
              onChange={handleChange("name")}
              isInvalid={!!errors.name}
            />
            <Form.Control.Feedback type="invalid">
              {errors.name}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="cpf">
            <Form.Label>CPF</Form.Label>
            <Form.Control
              type="text"
              placeholder="000.000.000-00"
              value={form?.cpf}
              onChange={handleChange("cpf")}
              isInvalid={!!errors.cpf}
            />
            <Form.Control.Feedback type="invalid">
              {errors.cpf}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="nome@exemple.com"
              value={form?.email}
              onChange={handleChange("email")}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="phone">
            <Form.Label>Telefone</Form.Label>
            <Form.Control
              type="text"
              placeholder="(00) 00000-0000"
              value={form?.phone}
              onChange={handleChange("phone")}
              isInvalid={!!errors.phone}
            />
            <Form.Control.Feedback type="invalid">
              {errors.phone}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="branch">
            <Form.Label>Filial</Form.Label>
            <Form.Control
              type="text"
              placeholder="Cidade/UF"
              value={form?.branch}
              onChange={handleChange("branch")}
              isInvalid={!!errors.branch}
            />
            <Form.Control.Feedback type="invalid">
              {errors.branch}
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
        <Button
          className={styles.saveButton}
          onClick={() => handleSubmit(form)}
        >
          Salvar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
