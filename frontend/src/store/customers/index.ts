import { create } from "zustand";
import { ICustomers } from "@/interface/ICustomers";

const customersStore = create((state) => ({
  customer: {
    id: 0,
    name: "",
    email: "",
  },
  updateCustomer: (customer: ICustomers) => {
    state({ customer: customer });
  },
}));

export { customersStore };
