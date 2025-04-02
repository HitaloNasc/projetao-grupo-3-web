export type DashboardDriversRanking = {
  id: string;
  name: string;
  score: number;
  position: number;
  pointsToNextPosition: number;
  lastRakingPosition: number;
  indicators: Array<{
    id: string;
    name: string;
    value: number;
  }>;
};
