import { useState } from "react";

export interface IConfirmModalViewModel {
  handleOpenModal: (callback: () => void) => void;
  handleCloseModal: () => void;
  handleSubmit: () => void;
  showModal: boolean;
  message: string;
}

export function useConfirmModalViewModel(message: string) {
  const [showModal, setShowModal] = useState(false);
  const [callback, setCallback] = useState<() => void>(() =>
    Promise.resolve()
  );

  const handleOpenModal = (c: () => void) => {
    setShowModal(true);
    setCallback(() => c);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmit = async () => {
    await callback();
    handleCloseModal();
  };

  return {
    handleOpenModal,
    handleCloseModal,
    handleSubmit,
    showModal,
    message,
  };
}
