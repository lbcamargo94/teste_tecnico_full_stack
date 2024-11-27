import { create } from "zustand";

type CustomersStore = {
  customer_id: string;
  setCustomerId: (id: string) => void;
  clearCustomerId: () => void;
};

const customersStore = create<CustomersStore>((set) => ({
  customer_id: "",
  setCustomerId: (id) => set({ customer_id: id }),
  clearCustomerId: () => set({ customer_id: "" }),
}));

export { customersStore };
