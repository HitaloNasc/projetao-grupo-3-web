import { DashboardDriversRanking } from "@/models/DashboardDriversRanking";
import { Ranking } from "@/models/Ranking";
import { IAuthService } from "@/services/AuthService";
import { IRankingService } from "@/services/RankingService";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export interface IDashboardDriversViewModel {
  ranking: DashboardDriversRanking;
  loading: boolean;
  showModal: boolean;
  selectedDriver: Ranking | null;
  error: string;
  handleOpenModal: (driver: any) => void;
  handleCloseModal: () => void;
  logout: () => void;
}

export function useDashboardDriversViewModel(
  rankingService: IRankingService,
  authService: IAuthService
): IDashboardDriversViewModel {
  const [ranking, setRankings] = useState<DashboardDriversRanking>({
    id: "id",
    name: "João Gomes",
    score: 100,
    position: 1,
    pointsToNextPosition: 20,
    lastRakingPosition: 5,
    indicators: [
      {
        id: "id1",
        name: "Melhor volta",
        value: 30,
      },
      {
        id: "id2",
        name: "Volta mais rápida",
        value: 40,
      },
      {
        id: "id3",
        name: "Volta mais lenta",
        value: 30,
      },
    ],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<any>(null);
  const router = useRouter();

  const currentUser = authService.getLoggedUser();

  const getRanking = async () => {
    setLoading(true);
    setError("");

    try {
      const ranking = await rankingService.getRanking(currentUser?.id || "");
      setRankings(ranking);
    } catch (err: any) {
      setError(err.message || "Erro ao buscar rankings.");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (driver: any) => {
    setSelectedDriver(driver);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    getRanking();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logout = () => {
    authService.logout();
    router.push("/");
  };

  return {
    ranking,
    loading,
    error,
    handleOpenModal,
    handleCloseModal,
    showModal,
    selectedDriver,
    logout,
  };
}
