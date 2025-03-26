import { Ranking } from "@/models/Ranking";
import { client } from "@/lib/http/client";

export interface IRankingService {
  getRankings: () => Promise<Ranking[]>;
}

export class RankingService {
  async getRankings(): Promise<Ranking[]> {
    const res = await client.get<Ranking[]>("/rankings");
    return res.data;
  }
}
