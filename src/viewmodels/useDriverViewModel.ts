import { Driver } from "@/models/Driver";
import { IDriverService } from "@/services/DriverService";
import { useCallback, useEffect, useState } from "react";
import { IAddEditDriverModalViewModel } from "./modals/useAddEditDriverModalViewModel";
import { IConfirmModalViewModel } from "./modals/useConfirmModalViewModel";
import { DriverForm } from "@/models/DriverForm";

export interface IDriverViewModel {
  drivers: Driver[];
  loading: boolean;
  error: string;
  handleCreateDriver: (driver: DriverForm) => void;
  handleUpdateDriver: (driver: DriverForm) => void;
  handleDeleteDriver: (driver: Driver) => void;
  ModalProps: IAddEditDriverModalViewModel;
  ConfirmModalProps: IConfirmModalViewModel;
}

export function useDriverViewModel(
  driverService: IDriverService,
  ModalProps: IAddEditDriverModalViewModel,
  ConfirmModalProps: IConfirmModalViewModel
): IDriverViewModel {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getDrivers = async () => {
    setLoading(true);
    setError("");

    try {
      const drivers = await driverService.getDrivers();
      setDrivers(drivers);
    } catch (err: any) {
      setError(err.message || "Erro ao buscar drivers.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateDriver = useCallback(
    async (driver: DriverForm) => {
      console.log("handleCreateDriver");
      setLoading(true);
      setError("");
      try {
        const newDriver = await driverService.createDriver(driver);
        setDrivers((prev) => [...prev, newDriver]);
      } catch (err: any) {
        setError(err.message || "Erro ao criar driver.");
      } finally {
        setLoading(false);
      }
    },
    [driverService]
  );

  const handleUpdateDriver = useCallback(
    async (driver: DriverForm) => {
      setLoading(true);
      setError("");
      try {
        const updated = await driverService.updateDriver(driver);
        setDrivers((prev) =>
          prev.map((d) => (d.id === driver.id ? updated : d))
        );
      } catch (err: any) {
        setError(err.message || "Erro ao atualizar driver.");
      } finally {
        setLoading(false);
      }
    },
    [driverService]
  );

  const handleDeleteDriver = useCallback(
    async (driver: Driver) => {
      setLoading(true);
      setError("");
      try {
        await driverService.deleteDriver(driver.id);
        setDrivers((prev) => prev.filter((d) => d.id !== driver.id));
      } catch (err: any) {
        setError(err.message || "Erro ao deletar driver.");
      } finally {
        setLoading(false);
      }
    },
    [driverService]
  );

  useEffect(() => {
    getDrivers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    drivers,
    loading,
    error,
    handleCreateDriver,
    handleUpdateDriver,
    handleDeleteDriver,
    ModalProps,
    ConfirmModalProps,
  };
}
