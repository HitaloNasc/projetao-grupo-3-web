import { Indicator } from "@/models/Indicator";
import { IndicatorService } from "@/services/IndicatorService";
import { useCallback, useEffect, useState } from "react";
import { IAddIndicatorDataModalViewModel } from "./modals/useAddIndicatorDataModalViewModel";
import { IAddIndicatorModalViewModel } from "./modals/useAddIndicatorModalViewModel";
import { IConfirmModalViewModel } from "./modals/useConfirmModalViewModel";
import { IEditWeightsModalViewModel } from "./modals/useEditWeightsModalViewModel";

export interface IIndicatorViewModel {
  indicators: Indicator[];
  loading: boolean;
  error: string;
  handleEditWeights: (indicators: Indicator[]) => void;
  handleAddIndicator: (
    indicator: Omit<Indicator, "id" | "created_at" | "updated_at">
  ) => void;
  handleEditIndicator: (indicator: Indicator) => void;
  handleDeleteIndicator: (indicator: Indicator) => void;
  EditWeightsModalProps: IEditWeightsModalViewModel;
  AddIndicatorModalProps: IAddIndicatorModalViewModel;
  AddIndicatorDataModalProps: IAddIndicatorDataModalViewModel;
  ConfirmModalProps: IConfirmModalViewModel;
}

export function useIndicatorsViewModel(
  EditWeightsModalProps: IEditWeightsModalViewModel,
  AddIndicatorModalProps: IAddIndicatorModalViewModel,
  AddIndicatorDataModalProps: IAddIndicatorDataModalViewModel,
  ConfirmModalProps: IConfirmModalViewModel
): IIndicatorViewModel {
  const [indicators, setIndicators] = useState<Indicator[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const indicatorService = new IndicatorService();

  // Buscar indicadores da API
  const getIndicators = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await indicatorService.getIndicators();
      setIndicators(data);
    } catch (err: any) {
      setError(err.message || "Erro ao buscar indicadores.");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleAddIndicator = useCallback(
    async (indicator: Omit<Indicator, "id" | "created_at" | "updated_at">) => {
      setLoading(true);
      setError("");
      try {
        const newIndicator = await indicatorService.createIndicator(indicator);
        setIndicators((prev) => [...prev, newIndicator]);
      } catch (err: any) {
        setError(err.message || "Erro ao adicionar indicador.");
      } finally {
        setLoading(false);
      }
    },
    [setIndicators]
  );

  const handleEditIndicator = useCallback(
    async (updatedIndicator: Indicator) => {
      setLoading(true);
      setError("");
      try {
        const newIndicator = await indicatorService.updateIndicator(
          updatedIndicator
        );

        setIndicators((prev) =>
          prev.map((i) => (i.id === newIndicator.id ? newIndicator : i))
        );
      } catch (err: any) {
        setError(err.message || "Erro ao editar indicador.");
      } finally {
        setLoading(false);
      }
    },
    [setIndicators]
  );

  const handleDeleteIndicator = useCallback(async (indicator: Indicator) => {
    setLoading(true);
    setError("");
    try {
      await indicatorService.deleteIndicator(indicator.id);
      setIndicators((prev) => prev.filter((i) => i.id !== indicator.id));
    } catch (err: any) {
      setError(err.message || "Erro ao excluir indicador.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getIndicators();
  }, []);

  return {
    indicators,
    loading,
    error,
    handleEditWeights: () => {},
    handleAddIndicator,
    handleEditIndicator,
    handleDeleteIndicator,
    EditWeightsModalProps,
    AddIndicatorModalProps,
    AddIndicatorDataModalProps,
    ConfirmModalProps,
  };
}
