"use client";
import { Sidebar } from "@/components/ui/Sidebar";
import { AuthService } from "@/services/AuthService";
import { DriverService } from "@/services/DriverService";
import { RankingService } from "@/services/RankingService";
import { useAddEditDriverModalViewModel } from "@/viewmodels/modals/useAddEditDriverModalViewModel";
import { useConfirmModalViewModel } from "@/viewmodels/modals/useConfirmModalViewModel";
import { useDriverViewModel } from "@/viewmodels/useDriverViewModel";
import { useRankingViewModel } from "@/viewmodels/useRankingViewModel";
import { useSidebarViewModel } from "@/viewmodels/useSidebarViewModel";
import { DriverView } from "@/views/Driver/DriverView";
import { IndicatorsView } from "@/views/Indicators/IndicatorsView";
import { RankingView } from "@/views/Ranking/RankingView";

// Importando os ViewModels dos modais
import { useAddIndicatorDataModalViewModel } from "@/viewmodels/modals/useAddIndicatorDataModalViewModel";
import { useEditWeightsModalViewModel } from "@/viewmodels/modals/useEditWeightsModalViewModel";

// Importando o hook de indicadores
import { IndicatorService } from "@/services/IndicatorService";
import { useAddIndicatorModalViewModel } from "@/viewmodels/modals/useAddIndicatorModalViewModel";
import { useIndicatorsViewModel } from "@/viewmodels/useIndicatorsViewModel";

export default function Dashboard() {
  const authService = new AuthService();
  const rankingService = new RankingService();
  const driverService = new DriverService();

  const addEditDriverModalViewModel = useAddEditDriverModalViewModel();
  const confirmModalDriverViewModel = useConfirmModalViewModel(
    "Tem certeza que deseja excluir este motorista?"
  );

  const sidebarViewModel = useSidebarViewModel(authService);
  const rankingViewModel = useRankingViewModel(rankingService);
  const driverViewModel = useDriverViewModel(
    driverService,
    addEditDriverModalViewModel,
    confirmModalDriverViewModel
  );
  const indicatorsService = new IndicatorService();

  // Usando os ViewModels necessários para indicadores
  const editWeightsModalViewModel =
    useEditWeightsModalViewModel(indicatorsService);
  const addIndicatorModalViewModel = useAddIndicatorModalViewModel();
  const addIndicatorDataModal =
    useAddIndicatorDataModalViewModel(indicatorsService);
  const confirmModalViewModel = useConfirmModalViewModel("Tem certeza?");

  // Passando os ViewModels para o hook de indicadores
  const indicatorsViewModel = useIndicatorsViewModel(
    editWeightsModalViewModel,
    addIndicatorModalViewModel,
    addIndicatorDataModal,
    confirmModalViewModel
  );

  let content = null;
  switch (sidebarViewModel.selectedPage) {
    case "ranking":
      content = <RankingView key="ranking-tab" {...rankingViewModel} />;
      break;
    case "drivers":
      content = <DriverView key="drivers-tab" {...driverViewModel} />;
      break;
    case "indicators":
      content = <IndicatorsView key="indicators-tab" {...indicatorsViewModel} />;
      break;
    default:
      content = null;
      break;
  }

  return <Sidebar viewModel={sidebarViewModel}>{content}</Sidebar>;
}
