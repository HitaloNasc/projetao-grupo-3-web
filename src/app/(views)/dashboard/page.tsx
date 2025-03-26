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
import { RankingView } from "@/views/Ranking/RankingView";

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

  let content = null;
  switch (sidebarViewModel.selectedPage) {
    case "ranking":
      content = <RankingView {...rankingViewModel} />;
      break;
    case "drivers":
      content = <DriverView {...driverViewModel} />;
      break;
    case "indicators":
      content = null;
      break;
    default:
      content = null;
      break;
  }

  return <Sidebar viewModel={sidebarViewModel}>{content}</Sidebar>;
}
