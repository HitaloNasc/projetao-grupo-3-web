import { useState } from "react";

export interface IConfirmModalViewModel {
  handleOpenModal: (callback: () => Promise<void>) => void;
  handleCloseModal: () => void;
  handleSubmit: () => void;
  showModal: boolean;
  message: string;
}

export function useConfirmModalViewModel(message: string) {
  const [showModal, setShowModal] = useState(false);
  const [callback, setCallback] = useState<() => Promise<void>>(() =>
    Promise.resolve()
  );

  const handleOpenModal = (c: () => Promise<void>) => {
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
