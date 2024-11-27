interface IDrivers {
  id: number;
  description: string;
  minimum_distance: number;
  name: string;
  rating: number;
  vehicle: string;
}

interface IListDrivers {
  id: number;
  name: string;
}

export type { IDrivers, IListDrivers };
