import {IEditWeightsModalViewModel} from '@/viewmodels/modals/useEditWeightsModalViewModel';
import {Button, Modal} from 'react-bootstrap';
import styles from './EditWeightsModal.module.css';
import Image from 'next/image';
import Minus from '../../../../public/icons/minuscircle.svg';
import Plus from '../../../../public/icons/pluscircle.svg';

export function EditWeightsModal({
  handleSubmit,
  handleChangeWeight,
  handleCloseModal,
  indicators,
  showModal,
}: IEditWeightsModalViewModel) {
  const totalWeight = indicators.reduce(
    (sum, indicator) => sum + indicator.value,
    0
  );

  const isTotalValid = totalWeight === 100;

  const handleDecrease = (id: number) => () => {
    handleChangeWeight(id, -10);
  };

  const handleIncrease = (id: number) => () => {
    handleChangeWeight(id, 10);
  };

  return (
    <Modal show={showModal} onHide={handleCloseModal} centered>
      <Modal.Header closeButton>
        <Modal.Title className={styles.modalTitle}>Editar Pesos</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {indicators.map((indicator) => (
          <div key={indicator.id} className={styles.indicatorRow}>
            <span>{indicator.name}</span>
            <div className={styles.weightControls}>
              <button
                onClick={handleDecrease(indicator.id)}
                disabled={indicator.value <= 0}
                className={styles.iconButton}
              >
                <Image src={Minus} alt='Diminuir' />
              </button>
              <span>{indicator.value}%</span>
              <button
                onClick={handleIncrease(indicator.id)}
                disabled={totalWeight + 10 > 100}
                className={styles.iconButton}
              >
                <Image src={Plus} alt='Aumentar' />
              </button>
            </div>
          </div>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant='outline-light'
          className={styles.cancelButton}
          onClick={handleCloseModal}
        >
          Cancelar
        </Button>
        <Button
          className={styles.saveButton}
          onClick={() => handleSubmit(indicators)}
          disabled={!isTotalValid}
        >
          Salvar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
