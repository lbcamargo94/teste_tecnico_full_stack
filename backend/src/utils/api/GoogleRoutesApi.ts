import { apiInstance } from "@config/api/apiInstance";
import { ApiError } from "@erro/index";
import type { AxiosInstance, AxiosResponse } from "axios";

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY || "";

type GoogleRoutesResponse = {
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

class GoogleRoutesApi {
  private api: AxiosInstance;

  constructor() {
    this.api = apiInstance;
  }

  async getRoutes({
    origin,
    destination,
  }: {
    origin: string;
    destination: string;
  }): Promise<GoogleRoutesResponse> {
    const data = {
      origin: { address: origin },
      destination: { address: destination },
      travelMode: "DRIVE",
      routingPreference: "TRAFFIC_AWARE_OPTIMAL",
      trafficModel: "BEST_GUESS",
    };

    const response = await this.api
      .post("", data, {
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": GOOGLE_API_KEY,
          "X-Goog-FieldMask":
            "routes.legs.distanceMeters,routes.legs.duration,routes.legs.startLocation,routes.legs.endLocation,routes.legs.localizedValues,routes.legs.polyline",
        },
      })
      .then((response) => {
        // console.log(response.data);
        // console.log(response.status);
        // console.log(response.statusText);
        // console.log(response.headers);
        // console.log(response.config);
        return response.data;
      })
      .catch((error) => {
        10;
        console.error(error.response.data);
        throw new ApiError(
          `${error.response.data.message}`,
          error.response.data.code,
        );
      });

    return response.routes[0].legs[0];
  }
}

export { GoogleRoutesApi };
