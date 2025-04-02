import {useState} from 'react';
import {Indicator} from '@/models/Indicator';
import {IndicatorService} from '@/services/IndicatorService';

export interface IEditWeightsModalViewModel {
  handleOpenModal: (
    indicators: Indicator[],
    callback: (weights: Indicator[]) => void
  ) => void;
  handleCloseModal: () => void;
  handleChangeWeight: (id: number, delta: number) => void;
  handleSubmit: (indicators: Indicator[]) => void;
  indicators: Indicator[];
  showModal: boolean;
}

export function useEditWeightsModalViewModel() {
  const [showModal, setShowModal] = useState(false);
  const [indicators, setIndicators] = useState<Indicator[]>([]);
  const [callback, setCallback] = useState<(weights: Indicator[]) => void>(
    () => () => {}
  );

  const indicatorService = new IndicatorService();

  const handleOpenModal = (
    indicators: Indicator[],
    callback: (weights: Indicator[]) => void
  ) => {
    setIndicators(indicators);
    setCallback(() => callback);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleChangeWeight = (id: number, delta: number) => {
    setIndicators((prevIndicators) => {
      return prevIndicators.map((indicator) =>
        indicator.id === id
          ? {...indicator, value: Math.max(0, indicator.value + delta)}
          : indicator
      );
    });
  };

  const handleSubmit = async (updatedIndicators: Indicator[]) => {
    const totalWeight = updatedIndicators.reduce(
      (sum, ind) => sum + ind.value,
      0
    );

    if (totalWeight !== 100) {
      alert('A soma dos pesos deve ser exatamente 100%.');
      return;
    }

    try {
      await indicatorService.updateMultipleIndicators(updatedIndicators);

      const refreshedIndicators = await indicatorService.getIndicators();
      setIndicators(refreshedIndicators);

      callback(refreshedIndicators);

      handleCloseModal();
    } catch (error) {
      alert(`Erro ao atualizar os pesos dos indicadores: ${error}`);
    }
  };

  return {
    handleOpenModal,
    handleCloseModal,
    handleChangeWeight,
    handleSubmit,
    indicators,
    showModal,
  };
}
