import { DriverForm } from "@/models/DriverForm";
import { useState } from "react";

export interface IAddEditDriverModalViewModel {
  handleOpenModal: (
    callback: (driver: DriverForm) => void,
    driver?: any
  ) => void;
  handleCloseModal: () => void;
  handleChange: (
    field: string
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (driver: DriverForm) => void;
  form: DriverForm;
  errors: { [key: string]: string };
  showModal: boolean;
}

export function useAddEditDriverModalViewModel() {
  const initForm = {
    name: "",
    picture: "",
    cpf: "",
    email: "",
    phone: "",
    branch: "",
  };

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<DriverForm>(initForm);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [callback, setCallback] = useState<
    (driver: DriverForm) => Promise<void>
  >(() => Promise.resolve());

  function maskCPF(value: string): string {
    return value
      .replace(/\D/g, "") // Remove não-dígitos
      .slice(0, 11) // Limita a 11 dígitos
      .replace(/(\d{3})(\d)/, "$1.$2") // 000.000...
      .replace(/(\d{3})(\d)/, "$1.$2") // 000.000.000...
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2"); // 000.000.000-00
  }

  function maskPhone(value: string): string {
    const cleaned = value.replace(/\D/g, "").slice(0, 11); // Só dígitos, até 11 números

    if (cleaned.length <= 2) {
      return `(${cleaned}`;
    }

    if (cleaned.length <= 6) {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
    }

    if (cleaned.length <= 10) {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(
        2,
        cleaned.length - 4
      )}-${cleaned.slice(-4)}`;
    }

    // celular com 9 dígitos
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(
      7,
      11
    )}`;
  }

  const handleOpenModal = (
    callback: (d: DriverForm) => Promise<void>,
    driver?: any
  ) => {
    setCallback(() => callback);
    setForm(driver);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setForm(initForm);
    setErrors({});
  };

  const handleChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => {
        const value =
          field === "cpf"
            ? maskCPF(e.target.value)
            : field === "phone"
            ? maskPhone(e.target.value)
            : e.target.value;

        return {
          ...prev,
          [field]: value,
        };
      });
    };

  function validateForm() {
    const newErrors: { [key: string]: string } = {};
    if (!form.name.trim()) {
      newErrors.name = "O Nome é obrigatório.";
    }
    if (!form.cpf.trim() || form.cpf.length < 14) {
      newErrors.cpf = "CPF inválido.";
    }
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "E-mail inválido.";
    }
    if (!form.phone.trim() || form.phone.length < 14) {
      newErrors.phone = "Telefone invalido.";
    }
    if (!form.branch.trim()) {
      newErrors.branch = "Filial é obrigatória.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const handleSubmit = (driver: DriverForm) => {
    console.log("handleSubmit");

    if (!validateForm()) return;
    console.log("callback", { callback });
    callback(driver);
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
