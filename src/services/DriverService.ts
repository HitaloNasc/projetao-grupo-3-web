import { Driver } from "@/models/Driver";
import { client } from "@/lib/http/client";
import { DriverForm } from "@/models/DriverForm";

export interface IDriverService {
  getDrivers: () => Promise<Driver[]>;
  createDriver: (driver: DriverForm) => Promise<Driver>;
  updateDriver: (driver: DriverForm) => Promise<Driver>;
  deleteDriver: (driverId: string) => Promise<void>;
}

export class DriverService {
  async getDrivers(): Promise<Driver[]> {
    const res = await client.get<Driver[]>("/drivers");
    return res.data?.map((driver: any) => ({ ...driver, id: driver._id }));
  }

  async createDriver(driver: DriverForm): Promise<Driver> {
    const res = await client.post<Driver>("/drivers", driver);
    return res.data;
  }

  async updateDriver(driver: DriverForm): Promise<Driver> {
    const res = await client.patch<Driver>(`/drivers/${driver.id}`, driver);
    return res.data;
  }

  async deleteDriver(driverId: string): Promise<void> {
    await client.delete(`/drivers/${driverId}`);
  }
}
