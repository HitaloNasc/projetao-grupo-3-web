export type RankingIndicator = {
  id: string;
  name: string;
  value: number;
  description: string;
  weight: number;
};

export type Ranking = {
  id: string;
  name: string;
  score: number;
  position: number;
  indicators: Array<RankingIndicator>;
  createdAt: string;
  updatedAt: string;
};
