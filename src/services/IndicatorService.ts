import { Indicator } from "@/models/Indicator";
import { client } from "@/lib/http/client";
export interface IIndicatorService {
  getIndicators: () => Promise<Indicator[]>;
  createIndicator: (
    indicator: Omit<Indicator, "id" | "created_at" | "updated_at">
  ) => Promise<Indicator>;
  updateIndicator: (indicator: Indicator) => Promise<Indicator>;
  deleteIndicator: (indicatorId: number) => Promise<void>;
}

export class IndicatorService implements IIndicatorService {
  async getIndicators(): Promise<Indicator[]> {
    const res = await client.get<Indicator[]>("/indicators");
    return res.data;
  }

  async createIndicator(
    indicator: Omit<Indicator, "id" | "created_at" | "updated_at">
  ): Promise<Indicator> {
    const res = await client.post<Indicator>("/indicators", indicator);
    return res.data;
  }

  async updateIndicator(indicator: Indicator): Promise<Indicator> {
    const res = await client.put<Indicator>(
      `/indicators/${indicator.id}`,
      indicator
    );
    return res.data;
  }

  async updateMultipleIndicators(indicators: Indicator[]): Promise<void> {
    console.log("Updating indicators:", indicators);

    const promises = indicators.map((indicator) => {
      return client.put<Indicator>(`/indicators/${indicator.id}`, indicator);
    });

    await Promise.all(promises);
  }

  async deleteIndicator(indicatorId: number): Promise<void> {
    await client.delete(`/indicators/${indicatorId}`);
  }
}
