import { AddEditDriverModal } from "@/components/modals/AddEditDriverModal";
import { ConfirmModal } from "@/components/modals/ConfirmModal";
import { DynamicList } from "@/components/ui/DynamicList";
import Loading from "@/components/ui/Loading";
import { Page } from "@/components/ui/Page";
import { Driver } from "@/models/Driver";
import { IDriverViewModel } from "@/viewmodels/useDriverViewModel";
import Image from "next/image";
import Pencil from "../../../public/icons/pencil.svg";
import Plus from "../../../public/icons/plus.svg";
import Trash from "../../../public/icons/trash.svg";
import styles from "./DriverView.module.css";

export function DriverView({
  drivers,
  loading,
  // error,
  handleCreateDriver,
  handleUpdateDriver,
  handleDeleteDriver,
  ModalProps,
  ConfirmModalProps,
}: IDriverViewModel) {
  const renderAddButton = () => {
    return (
      <button
        className={styles.addButton}
        onClick={() => ModalProps.handleOpenModal(handleCreateDriver)}
      >
        <Image src={Plus} alt="Adicionar motorista" />
        Adicionar Motorista
      </button>
    );
  };

  const renderActions = (driver: Driver) => {
    return (
      <div className={styles.actions}>
        <div
          className={styles.editButton}
          onClick={() => ModalProps.handleOpenModal(handleUpdateDriver, driver)}
        >
          <Image src={Pencil} alt="Editar" />
        </div>
        <div
          className={styles.deleteButton}
          onClick={() =>
            ConfirmModalProps.handleOpenModal(() => handleDeleteDriver(driver))
          }
        >
          <Image src={Trash} alt="Excluir" />
        </div>
      </div>
    );
  };

  const columns = [
    { key: "name", header: "Nome" },
    { key: "cpf", header: "CPF" },
    { key: "email", header: "Email" },
    { key: "phone", header: "Telefone" },
    { key: "branch", header: "Filial" },
    { key: "actions", header: "Ações" },
  ];

  const data = drivers?.map((driver) => ({
    name: driver.name,
    cpf: driver.cpf,
    email: driver.email,
    phone: driver.phone,
    branch: driver.branch,
    actions: renderActions(driver),
  }));

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center h-100">
        <Loading color="dark" />
      </div>
    );
  }

  return (
    <Page>
      <div className={styles.header}>
        <h1 className={styles.title}>Motoristas</h1>
        {renderAddButton()}
      </div>

      <DynamicList columns={columns} data={data} />
      <AddEditDriverModal {...ModalProps} />
      <ConfirmModal {...ConfirmModalProps} />
    </Page>
  );
}
