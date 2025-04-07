import Loading from "@/components/ui/Loading";
import { Page } from "@/components/ui/Page";
import { Position } from "@/components/ui/Position";
import { RankingIndicator } from "@/models/Ranking";
import { IDashboardDriversViewModel } from "@/viewmodels/useDashboardDriversViewModel";
import Image from "next/image";
import { Modal, OverlayTrigger, Popover } from "react-bootstrap";
import Avatar from "../../../public/avatars/21.svg";
import Eye from "../../../public/icons/eye.svg";
import Logout from "../../../public/icons/log-out-dark.svg";
import styles from "./DashboardDriversView.module.css";

export function DashboardDriversView({
  ranking,
  loading,
  showModal,
  selectedDriver,
  handleOpenModal,
  handleCloseModal,
  logout,
}: IDashboardDriversViewModel) {
  const renderDriver = (name: string) => {
    return (
      <div className={styles.driver}>
        <Image src={Avatar} alt="Avatar" />
        <span>{name}</span>
      </div>
    );
  };

  const renderModal = () => {
    return (
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title className={styles.modalTitle}>
            Meus indicadores
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {renderDriver(selectedDriver?.name || "")}
          <div className={styles.modalContent}>
            {selectedDriver?.indicators?.map(
              (indicator: RankingIndicator, idx: number) => (
                <div className={styles.modalContainer} key={idx}>
                  <span className={styles.line}>
                    <p>{indicator.name}</p>
                    <p>
                      <strong>{indicator.value}</strong>
                    </p>
                  </span>
                  <OverlayTrigger
                    trigger="click"
                    rootClose
                    placement="top-end"
                    overlay={
                      <Popover id={"indicator-" + idx}>
                        <Popover.Body>{indicator.description}</Popover.Body>
                      </Popover>
                    }
                  >
                    <div className={styles.popover}>
                      <p>?</p>
                    </div>
                  </OverlayTrigger>
                </div>
              )
            )}
          </div>
        </Modal.Body>
      </Modal>
    );
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center h-100">
        <Loading color="dark" />
      </div>
    );
  }

  return (
    <Page>
      <div onClick={logout} className={styles.option}>
        <Image src={Logout} alt="Logout" />
      </div>
      <main className={styles.main}>
        {renderDriver(ranking?.name || "")}

        <h2 className={styles.title}>Ranking atual</h2>

        <Position>{ranking?.position}°</Position>

        <p>
          Você está com <strong>{ranking?.score} pontos</strong>
        </p>

        <p>
          {ranking?.position !== 1
            ? "Faltam " +
              ranking?.pointsToNextPosition +
              ` pontos para você alcançar a ${
                ranking?.position ? ranking?.position - 1 : 0
              }ª posição.`
            : "Você está liderando o grupo, parabéns!"}
        </p>

        <button
          className={styles.actionButton}
          onClick={() => handleOpenModal(ranking)}
        >
          <Image src={Eye} alt="Ver indicadores" />
          Ver indicadores
        </button>

        {/* <p>
          Na última atualização, você ocupava a {ranking.lastRakingPosition}ª
          posição do ranking.
        </p> */}
      </main>
      {renderModal()}
    </Page>
  );
}
