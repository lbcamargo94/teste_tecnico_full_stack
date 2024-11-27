import { create } from "zustand";

interface IError {
  status: boolean;
  message: string;
}

type ErrorStore = {
  error: IError;
  setError: (error: IError) => void;
  clearError: (error: IError) => void;
};

const errorStore = create<ErrorStore>((set) => ({
  error: {
    status: false,
    message: "",
  },
  setError: (error) => set({ error }),
  clearError: (error) => set({ error }),
}));

export { errorStore };
