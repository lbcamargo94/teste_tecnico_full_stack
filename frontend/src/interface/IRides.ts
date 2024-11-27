interface IRides {
  customer_id: string;
  destination: string;
  distance: number;
  driver: {
    id: number;
    name: string;
  };
  duration: string;
  origin: string;
  value: number;
}

interface IEstimateRides {
  origin_name: string;
  destination_name: string;
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
    polyline: {
      encodedPolyline: string;
    };
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

export type { IRides, IEstimateRides };
