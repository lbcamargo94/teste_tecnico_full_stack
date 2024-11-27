import { ApiError } from "@erro/index";
import { IUpdateRides } from "@interfaces/rides";
import { GetCustomerModel } from "@model/customers/GetCustomersModel";
import { GetDriversModel } from "@model/drivers/GetDriversModel";
import { CreateRideModel } from "@model/rides/CreateRideModel";
import { GoogleRoutesApi } from "@utils/api/GoogleRoutesApi";

class UpdateRidesService {
  public async UpdateRides({
    customer_id,
    destination,
    distance,
    driver,
    duration,
    origin,
    value,
  }: IUpdateRides) {
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

    const { id, name } = driver;

    if (!id || !name) {
      throw new ApiError(
        "Os dados fornecidos de id e nome do motorista são inválidos.",
        400,
      );
    }

    const getDriversModel = new GetDriversModel();
    const validDriver = await getDriversModel.GetDriverByDriverId({
      driver_id: id,
    });

    if (!validDriver) {
      throw new ApiError("O motorista informado não pode ser encontrado.", 404);
    }

    if (name !== validDriver[0].name) {
      throw new ApiError("O nome do motorista informado é inválido.", 400);
    }

    const googleRoutesApi = new GoogleRoutesApi();
    const calculateRoute = await googleRoutesApi.getRoutes({
      origin,
      destination,
    });

    if (!calculateRoute) {
      throw new ApiError("Não foi possível calcular a rota.", 400);
    }

    const distanceKm = calculateRoute.distanceMeters / 1000;

    const validateDistance = distanceKm >= validDriver[0].minimum_distance;

    if (!validateDistance) {
      throw new ApiError(
        "A distância entre o endereço de origem e destino é menor que o mínimo exigido pelo motorista.",
        406,
      );
    }

    const calculatePrice = Number(
      (distanceKm * validDriver[0].rating).toFixed(2),
    );

    if (value !== calculatePrice) {
      throw new ApiError("O valor da viagem informado é inválido.", 400);
    }

    const getCustomerModel = new GetCustomerModel();
    const validCustomer = await getCustomerModel.GetCustomerByCustomerId({
      customer_id: Number(customer_id),
    });

    if (!validCustomer || validCustomer.length === 0) {
      throw new ApiError("O usuário informado não pode ser encontrado.", 404);
    }

    const createRidesModel = new CreateRideModel();
    const createRides = await createRidesModel.CreateRide({
      customer_id: validCustomer[0].id,
      destination,
      distance,
      driver_id: validDriver[0].id,
      duration,
      origin,
      value,
    });

    if (!createRides) {
      throw new ApiError("Não foi possível criar a viagem.", 400);
    }

    return {
      message: "Viagem confirmada com sucesso!",
      success: true,
    };
  }
}

export { UpdateRidesService };
