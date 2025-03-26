import { Ranking } from "@/models/Ranking";
import { IRankingService } from "@/services/RankingService";
import { useEffect, useState } from "react";

export interface IRankingViewModel {
  rankings: Ranking[];
  loading: boolean;
  error: string;
  handleOpenModal: (driver: any) => void;
  handleCloseModal: () => void;
  showModal: boolean;
  selectedDriver: Ranking | null;
}

export function useRankingViewModel(rankingService: IRankingService) {
  const [rankings, setRankings] = useState<Ranking[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<any>(null);

  const getRankings = async () => {
    setLoading(true);
    setError("");

    try {
      const rankings = await rankingService.getRankings();
      setRankings(rankings);
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
    getRankings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    rankings,
    loading,
    error,
    handleOpenModal,
    handleCloseModal,
    showModal,
    selectedDriver,
  };
}
