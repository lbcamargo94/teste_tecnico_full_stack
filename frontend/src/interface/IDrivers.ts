interface IDrivers {
  id: number;
  name: string;
  description: string;
  vehicle: string;
  rating: number;
  comment: string;
  value: number;
}

interface IDirversList {
  id: number;
  name: string;
}

export type { IDrivers, IDirversList };
