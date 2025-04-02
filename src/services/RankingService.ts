import { client } from "@/lib/http/client";
import { DashboardDriversRanking } from "@/models/DashboardDriversRanking";
import { Ranking } from "@/models/Ranking";

export interface IRankingService {
  getRankings: () => Promise<Ranking[]>;
  getRanking: (driverId: string) => Promise<DashboardDriversRanking>;
}

export class RankingService {
  async getRankings(): Promise<Ranking[]> {
    const res = await client.get<Ranking[]>("/rankings");
    return res.data;
  }

  async getRanking(driverId: string): Promise<DashboardDriversRanking> {
    const res = await client.get<DashboardDriversRanking>(
      "/rankings/" + driverId
    );
    return res.data;
  }
}
