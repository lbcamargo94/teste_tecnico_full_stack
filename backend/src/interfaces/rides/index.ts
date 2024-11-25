import { Interface } from "readline";

interface IRides {
  id: string;
  destination: string;
  distance: number;
  driver_id: number;
  duration: string;
  origin: string;
  price: number;
  customer_id: number;
}

interface IEstimateRides {
  origin: {
    latitude: number;
    longitude: number;
  };
  destination: {
    latitude: number;
    longitude: number;
  };
  distance: number;
  duration: string;
  options: {
    id: number;
    name: string;
    description: string;
    vehicle: string;
    review: {
      rating: number;
      comment: string;
    };
    value: number;
  }[];
  routeResponse: {
    distanceMeters: number;
    duration: string;
    startLocation: {
      latLng: {
        latitude: number;
        longitude: number;
      };
    };
    endLocation: {
      latLng: {
        latitude: number;
        longitude: number;
      };
    };
    localizedValues: {
      distance: {
        text: string;
      };
      duration: {
        text: string;
      };
      staticDuration: {
        text: string;
      };
    };
  };
}

interface IUpdateRides {
  customer_id: string;
  origin: string;
  destination: string;
  distance: number;
  duration: string;
  driver: {
    id: number;
    name: string;
  };
  value: number;
}

interface ICreateRide {
  customer_id: number;
  destination: string;
  distance: number;
  driver_id: number;
  duration: string;
  origin: string;
  value: number;
}

export type { IRides, IEstimateRides, IUpdateRides, ICreateRide };
