import { IndicatorService } from "@/services/IndicatorService";
import { useState } from "react";
export interface IAddIndicatorDataModalViewModel {
  handleOpenModal: () => void;
  handleCloseModal: () => void;
  handleChange: (
    field: string
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
  form: { file: string | ArrayBuffer | File | null };
  errors: { [key: string]: string };
  showModal: boolean;
  loading: boolean;
}

export function useAddIndicatorDataModalViewModel(
  indicatorService: IndicatorService
): IAddIndicatorDataModalViewModel {
  const initForm: { file: string | ArrayBuffer | File | null } = { file: null };
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(initForm);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setForm(initForm);
    setErrors({});
  };

  const handleChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      if (field === "file") {
        const file = e.target.files?.[0];
        if (file) {
          setForm((prev) => ({
            ...prev,
            [field]: file,
          }));
        }
        return;
      }

      setForm((prev) => ({
        ...prev,
        [field]: field === "value" ? Number(e.target.value) : e.target.value,
      }));
    };

  const handleSubmit = () => {
    setLoading(true);
    if (!form.file) {
      setErrors({ file: "O arquivo é obrigatório." });
      return;
    }

    indicatorService.addIndicatorsData(form, () => setLoading(false));
    handleCloseModal();
  };

  return {
    handleOpenModal,
    handleCloseModal,
    handleChange,
    handleSubmit,
    form,
    errors,
    showModal,
    loading,
  };
}
