interface ICustomers {
  id: number;
  name: string;
  email: string;
}

interface ICreateCustomer {
  name: string;
  email: string;
}

export type { ICustomers, ICreateCustomer };
