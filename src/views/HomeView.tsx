import { IHomeViewModel } from "@/viewmodels/useHomeViewModel";
import { Button } from "react-bootstrap";

export function HomeView({ user, logout }: IHomeViewModel) {
  return (
    <div className="container mt-5">
      <h1 className="mb-4">Página Inicial</h1>
      <p>
        Bem-vindo, <strong>{user?.name}</strong>! 🎉
      </p>
      <Button variant="primary" onClick={logout}>
        Sair
      </Button>
    </div>
  );
}
