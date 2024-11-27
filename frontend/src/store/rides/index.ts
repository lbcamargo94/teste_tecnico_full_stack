import type { IEstimateRides, IRides } from "@/interface/IRides";
import { create } from "zustand";

type RidesStore = {
  ride: IRides | null;
  setRides: (ride: IRides | null) => void;
  clearRides: () => void;

  estimate: IEstimateRides | null;
  setEstimate: (estimate: IEstimateRides | null) => void;
  clearEstimate: () => void;
};

const ridesStore = create<RidesStore>((set) => ({
  ride: null,
  setRides: (ride) => set({ ride: ride }),
  clearRides: () => set({ ride: null }),
  estimate: null,
  setEstimate: (estimate) => set({ estimate: estimate }),
  clearEstimate: () => set({ estimate: null }),
}));

export { ridesStore };
