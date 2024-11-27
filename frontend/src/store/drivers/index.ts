import type { IDirversList, IDrivers } from "@/interface/IDrivers";
import { create } from "zustand";

type DriversStore = {
  driver: IDrivers | null;
  setDrivers: (driver: IDrivers | null) => void;
  clearDrivers: () => void;

  driverList: IDirversList[];
  setDriversList: (driverList: IDirversList[]) => void;
};

const driversStore = create<DriversStore>((set) => ({
  driver: null,
  setDrivers: (driver) => set({ driver: driver }),
  clearDrivers: () => set({ driver: null }),

  driverList: [],
  setDriversList: (list: IDirversList[]) => set({ driverList: list }),
}));

export { driversStore };
