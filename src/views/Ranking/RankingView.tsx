import { DynamicList } from "@/components/ui/DynamicList";
import { Page } from "@/components/ui/Page";
import { Position } from "@/components/ui/Position";
import { Ranking, RankingIndicator } from "@/models/Ranking";
import { IRankingViewModel } from "@/viewmodels/useRankingViewModel";
import Image from "next/image";
import { Modal, OverlayTrigger, Popover } from "react-bootstrap";
import Avatar from "../../../public/avatars/21.svg";
import Eye from "../../../public/icons/eye.svg";
import styles from "./RankingView.module.css";
import Loading from "@/components/ui/Loading";

export function RankingView({
  rankings,
  loading /* , error */,
  showModal,
  selectedDriver,
  handleOpenModal,
  handleCloseModal,
}: IRankingViewModel) {
  const columns = [
    { key: "position", header: "" },
    { key: "name", header: "" },
    { key: "score", header: "" },
    { key: "actions", header: "" },
  ];

  const renderDriver = (name: string) => {
    return (
      <div className={styles.driver}>
        <Image src={Avatar} alt="Avatar" />
        <span>{name}</span>
      </div>
    );
  };

  const renderActionButton = (driver: Ranking) => {
    return (
      <button
        className={styles.actionButton}
        onClick={() => handleOpenModal(driver)}
      >
        <Image src={Eye} alt="Ver indicadores" />
        Ver indicadores
      </button>
    );
  };

  const renderModal = () => {
    return (
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title className={styles.modalTitle}>
            Ver indicadores
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

  const data = rankings?.map((driver) => ({
    position: <Position>{driver.position}°</Position>,
    name: renderDriver(driver.name),
    score: driver.score + " pontos",
    indicators: driver.indicators,
    actions: renderActionButton(driver),
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
      <h1 className={styles.title}>Ranking</h1>
      <DynamicList columns={columns} data={data} />
      {renderModal()}
    </Page>
  );
}
