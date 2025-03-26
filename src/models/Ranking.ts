export type RankingIndicator = {
  id: string;
  name: string;
  value: number;
};

export type Ranking = {
  id: number;
  name: string;
  score: number;
  position: number;
  indicators: Array<RankingIndicator>;
  createdAt: string;
  updatedAt: string;
};
