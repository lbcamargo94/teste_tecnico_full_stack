interface IRides {
  id: number;
  destination: string;
  distance: number;
  duration: number;
  origin: string;
  price: number;
  driver: {
    id: number;
    name: string;
  };
  customer: {
    id: number;
    name: string;
  };
}

export type { IRides };
