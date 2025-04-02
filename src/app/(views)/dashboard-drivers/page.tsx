"use client";
import { AuthService } from "@/services/AuthService";
import { RankingService } from "@/services/RankingService";
import { useDashboardDriversViewModel } from "@/viewmodels/useDashboardDriversViewModel";
import { DashboardDriversView } from "@/views/DashboardDrivers/DashboardDriversView";

export default function Dashboard() {
  const rankingService = new RankingService();
  const authService = new AuthService();

  const rankingViewModel = useDashboardDriversViewModel(
    rankingService,
    authService
  );

  return <DashboardDriversView {...rankingViewModel} />;
}
