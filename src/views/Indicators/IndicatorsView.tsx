import {EditWeightsModal} from '@/components/modals/EditWeightsModal';import {AddIndicatorModal} from '@/components/modals/AddIndicatorModal';
import {ConfirmModal} from '@/components/modals/ConfirmModal';
import {DynamicList} from '@/components/ui/DynamicList';
import Loading from '@/components/ui/Loading';
import {Page} from '@/components/ui/Page';
import {Indicator} from '@/models/Indicator';
import {IIndicatorViewModel} from '@/viewmodels/useIndicatorsViewModel';
import Image from 'next/image';
import Pencil from '../../../public/icons/pencil.svg';
import Plus from '../../../public/icons/plus.svg';
import Trash from '../../../public/icons/trash.svg';
import styles from './IndicatorsView.module.css';

export function IndicatorsView({
  indicators,
  loading,
  handleAddIndicator,
  handleEditIndicator,
  handleDeleteIndicator,
  EditWeightsModalProps,
  AddIndicatorModalProps,
  ConfirmModalProps,
}: IIndicatorViewModel) {
  const renderButtons = () => (
    <div className={styles.headerButtons}>
      <button
        className={styles.editWeightsButton}
        onClick={() =>
          EditWeightsModalProps.handleOpenModal(
            indicators,
            (updatedIndicators) => {
              updatedIndicators.forEach((indicator) =>
                handleEditIndicator(indicator)
              );
            }
          )
        }
      >
        <Image src={Pencil} alt='Editar Pesos' />
        Editar Pesos
      </button>
      <button
        className={styles.addButton}
        onClick={() =>
          AddIndicatorModalProps.handleOpenModal(handleAddIndicator)
        }
      >
        <Image src={Plus} alt='Adicionar indicador' />
        Adicionar Indicador
      </button>
    </div>
  );

  const renderActions = (indicator: Indicator) => (
    <div className={styles.actions}>
      <div
        className={styles.editButton}
        onClick={() =>
          AddIndicatorModalProps.handleOpenModal(handleEditIndicator, indicator)
        }
      >
        <Image src={Pencil} alt='Editar' />
      </div>
      <div
        className={styles.deleteButton}
        onClick={() =>
          ConfirmModalProps.handleOpenModal(() =>
            handleDeleteIndicator(indicator)
          )
        }
      >
        <Image src={Trash} alt='Excluir' />
      </div>
    </div>
  );

  const columns = [
    {key: 'name', header: 'Nome'},
    {key: 'description', header: 'Descrição'},
    {key: 'weight', header: 'Peso'},
    {key: 'actions', header: 'Ações'},
  ];

  const data = indicators?.map((indicator) => ({
    name: indicator.name,
    description: indicator.description,
    weight: `${indicator.weight * 100}%`,
    actions: renderActions(indicator),
  }));

  if (loading) {
    return (
      <div className='d-flex justify-content-center align-items-center h-100'>
        <Loading color='dark' />
      </div>
    );
  }

  return (
    <Page>
      <div className={styles.header}>
        <h1 className={styles.title}>Indicadores</h1>
        {renderButtons()}
      </div>
      <DynamicList columns={columns} data={data} />
      <EditWeightsModal {...EditWeightsModalProps} />
      <AddIndicatorModal {...AddIndicatorModalProps} />
      <ConfirmModal {...ConfirmModalProps} />
    </Page>
  );
}
