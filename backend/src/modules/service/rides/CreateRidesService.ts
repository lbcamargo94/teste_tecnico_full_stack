import { ApiError } from "@erro/index";
import { IEstimateRides } from "@interfaces/rides";
import { GetDriversModel } from "@model/drivers/GetDriversModel";
import { GoogleRoutesApi } from "@utils/api/GoogleRoutesApi";

class CreateRidesService {
  public async CreateRides({
    customer_id,
    destination,
    origin,
  }: {
    customer_id: string;
    origin: string;
    destination: string;
  }): Promise<{
    message: string;
    data: any;
    status: number;
  }> {
    if (!origin || !destination) {
      throw new ApiError(
        "Os dados fornecidos para endereço de origem ou destino são inválidos.",
        400,
      );
    }

    if (origin === destination) {
      throw new ApiError(
        "Os endereços de origem e destino não podem ser os mesmos.",
        400,
      );
    }

    if (!customer_id) {
      throw new ApiError("O id de usuário fornecido é inválido.", 400);
    }

    const googleRoutesApi = new GoogleRoutesApi();
    const calculateRoute = await googleRoutesApi.getRoutes({
      origin,
      destination,
    });

    if (!calculateRoute) {
      throw new ApiError("Não foi possível calcular a rota.", 400);
    }

    const getDriversModel = new GetDriversModel();
    const allDrivers = await getDriversModel.GetAllDrivers();

    if (allDrivers.length === 0) {
      throw new ApiError("Não há motoristas disponíveis no momento.", 400);
    }

    const validateRidesDrivers = allDrivers.reduce(
      (accumulator, currentValue) => {
        const distanceKm = calculateRoute.distanceMeters / 1000;

        if (distanceKm >= currentValue.minimum_distance) {
          const calculatePrice = Number(
            (distanceKm * currentValue.rating).toFixed(2),
          );

          accumulator.push({
            id: currentValue.id,
            description: currentValue.description,
            name: currentValue.name,
            review: {
              rating: currentValue.assessment[0].evaluation_rate,
              comment: currentValue.assessment[0].comment,
            },
            value: calculatePrice,
            vehicle: currentValue.vehicle,
          });
        }

        return accumulator;
      },
      [] as {
        id: number;
        description: string;
        name: string;
        review: { rating: number; comment: string };
        value: number;
        vehicle: string;
      }[],
    );

    const formatResponse: IEstimateRides = {
      origin: {
        latitude: calculateRoute.startLocation.latLng.latitude,
        longitude: calculateRoute.startLocation.latLng.longitude,
      },
      destination: {
        latitude: calculateRoute.endLocation.latLng.latitude,
        longitude: calculateRoute.endLocation.latLng.longitude,
      },
      distance: calculateRoute.distanceMeters,
      duration: calculateRoute.duration,
      options: validateRidesDrivers,
      routeResponse: calculateRoute,
    };

    return {
      data: formatResponse,
      message: "Estimativa de rota realizada com sucesso!",
      status: 200,
    };
  }
}

export { CreateRidesService };
