import { useState } from "react";
import { Indicator } from "@/models/Indicator";
import { IndicatorService } from "@/services/IndicatorService";

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

export function useEditWeightsModalViewModel(
  indicatorService: IndicatorService
): IEditWeightsModalViewModel {
  const [showModal, setShowModal] = useState(false);
  const [indicators, setIndicators] = useState<Indicator[]>([]);
  const [callback, setCallback] = useState<(weights: Indicator[]) => void>(
    () => () => {}
  );

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
          ? { ...indicator, weight: Math.max(0, indicator.weight + delta) }
          : indicator
      );
    });
  };

  const handleSubmit = async (updatedIndicators: Indicator[]) => {
    const normalizedIndicators = updatedIndicators.map((indicator) => ({
      ...indicator,
      weight: parseFloat(indicator.weight.toFixed(2)),
    }));

    const totalWeight = normalizedIndicators.reduce(
      (sum, ind) => sum + ind.weight,
      0
    );

    console.log("Total Weight:", totalWeight);

    if (totalWeight !== 1) {
      // alert("A soma dos pesos deve ser exatamente 100%.");
      return;
    }

    try {
      await indicatorService.updateMultipleIndicators(updatedIndicators);

      const refreshedIndicators = await indicatorService.getIndicators();
      setIndicators(refreshedIndicators);

      callback(refreshedIndicators);

      handleCloseModal();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // alert(`Erro ao atualizar os pesos dos indicadores: ${error}`);
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
