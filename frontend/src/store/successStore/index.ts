import { create } from "zustand";

interface ISuccess {
  status: boolean;
  message: string;
}

type SuccessStore = {
  success: ISuccess;
  setSuccess: (success: ISuccess) => void;
  clearSuccess: (success: ISuccess) => void;
};

const successStore = create<SuccessStore>((set) => ({
  success: {
    status: false,
    message: "",
  },
  setSuccess: (success) => set({ success }),
  clearSuccess: (success) => set({ success }),
}));

export { successStore };
