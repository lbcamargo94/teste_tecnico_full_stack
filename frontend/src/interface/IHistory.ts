interface IHistory {
  id: number;
  date: string;
  origin: string;
  destination: string;
  distance: number;
  duration: string | null;
  driver: {
    id: number;
    name: string;
  };
  value: number;
}

export type { IHistory };
