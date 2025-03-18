"use client";
import { AuthService } from "@/services/AuthService";
import { useHomeViewModel } from "@/viewmodels/useHomeViewModel";
import { HomeView } from "@/views/HomeView";

export default function Home() {
  const authService = new AuthService();
  const viewModel = useHomeViewModel(authService);

  if (!viewModel.user) return null;

  return <HomeView {...viewModel} />;
}
