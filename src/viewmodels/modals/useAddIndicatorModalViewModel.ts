import {useState} from 'react';
export interface IAddIndicatorModalViewModel {
  handleOpenModal: (
    callback: (indicator: any) => void,
    indicator?: any
  ) => void;
  handleCloseModal: () => void;
  handleChange: (
    field: string
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
  form: {name: string; description: string; value: number};
  errors: {[key: string]: string};
  showModal: boolean;
}

export function useAddIndicatorModalViewModel(): IAddIndicatorModalViewModel {
  const initForm = {name: '', description: '', value: 0}; 
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(initForm);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [callback, setCallback] = useState<(indicator: any) => void>(
    () => () => {}
  );

  const handleOpenModal = (cb: (i: any) => void, indicator?: any) => {
    setCallback(() => cb);
    setForm(indicator || initForm);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setForm(initForm);
    setErrors({});
  };

  const handleChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({
        ...prev,
        [field]: field === 'value' ? Number(e.target.value) : e.target.value,
      }));
    };

  const handleSubmit = () => {
    if (!form.name.trim()) {
      setErrors({name: 'Nome é obrigatório.'});
      return;
    }

    callback(form); 
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
  };
}
