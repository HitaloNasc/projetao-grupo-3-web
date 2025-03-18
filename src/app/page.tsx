"use client";
import { AuthService } from "@/services/AuthService";
import { useLoginViewModel } from "@/viewmodels/useLoginViewModel";
import { LoginView } from "@/views/LoginView";

export default function LoginPage() {
  const authService = new AuthService();
  const viewModel = useLoginViewModel(authService);
  return <LoginView {...viewModel} />;
}
