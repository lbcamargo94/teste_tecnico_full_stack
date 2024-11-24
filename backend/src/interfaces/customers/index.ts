interface ICustomers {
  id: number;
  email: string;
  name: string;
}

interface ICreateCustomers {
  email: string;
  name: string;
}

export type { ICustomers, ICreateCustomers };
