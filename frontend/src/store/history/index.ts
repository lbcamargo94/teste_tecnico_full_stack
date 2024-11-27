import { IHistory } from "@/interface/IHistory";
import { create } from "zustand";

type HistoryStore = {
  history: [];
  setHistory: (history: IHistory[]) => void;
  clearHistory: () => void;
};

const historyStore = create<HistoryStore>((set) => ({
  history: [],
  setHistory: (history: IHistory[]) => set({ history: history as [] }),
  clearHistory: () => set({ history: [] }),
}));

export { historyStore };
