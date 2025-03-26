import { ISidebarViewModel } from "@/viewmodels/useSidebarViewModel";
import Image from "next/image";
import { ReactNode } from "react";
import Logo from "../../../../public/images/logo-white.svg";
import Drivers from "../../../../public/icons/drivers.svg";
import Indicators from "../../../../public/icons/indicators.svg";
import Logout from "../../../../public/icons/logout.svg";
import Ranking from "../../../../public/icons/ranking.svg";
import styles from "./Sidebar.module.css";

interface SidebarProps {
  viewModel: ISidebarViewModel;
  children: ReactNode;
}

export function Sidebar({ viewModel, children }: SidebarProps) {
  const classOption = (option: string) =>
    viewModel.selectedPage === option
      ? `${styles.option} ${styles.optionActive}`
      : styles.option;

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <nav className={styles.groupOptions} aria-label="Menu principal">
          <Image src={Logo} alt="Logo" className={styles.logo} />

          <div
            onClick={() => viewModel.setSelectedPage("ranking")}
            className={classOption("ranking")}
          >
            <Image src={Ranking} alt="Ranking" />
            Ranking
          </div>

          <div
            onClick={() => viewModel.setSelectedPage("drivers")}
            className={classOption("drivers")}
          >
            <Image src={Drivers} alt="Drivers" />
            Motoristas
          </div>

          <div
            onClick={() => viewModel.setSelectedPage("indicators")}
            className={classOption("indicators")}
          >
            <Image src={Indicators} alt="Indicators" />
            Indicadores
          </div>
        </nav>

        <nav className={styles.groupOptions} aria-label="Menu secundário">
          <div onClick={viewModel.logout} className={classOption("logout")}>
            <Image src={Logout} alt="Logout" />
            Sair
          </div>
        </nav>
      </aside>

      <main className={styles.content}>{children}</main>
    </div>
  );
}
