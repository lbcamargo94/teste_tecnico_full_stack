import { ApiError } from "@erro/index";
import { GetCustomerModel } from "@model/customers/GetCustomersModel";
import { GetDriversModel } from "@model/drivers/GetDriversModel";
import { GetRidersModel } from "@model/rides/GetRidersModel";

class GetRidesService {
  public async GetManyRidesFiltredByCustomerId({
    customer_id,
    filter,
  }: {
    customer_id: string;
    filter: string;
  }): Promise<{
    message: string;
    data: any;
    status: number;
  }> {
    console.log(customer_id, filter);

    if (!customer_id) {
      throw new ApiError("O id de usuário informado é inválido.", 400);
    }

    const getCustomerModel = new GetCustomerModel();
    const validCustomer = await getCustomerModel.GetCustomerByCustomerId({
      customer_id: Number(customer_id),
    });

    if (!validCustomer || validCustomer.length === 0) {
      throw new ApiError("O usuário informado não pode ser encontrado.", 404);
    }

    if (filter) {
      const getDriversModel = new GetDriversModel();
      const validDriver = await getDriversModel.GetDriverByDriverId({
        driver_id: Number(filter),
      });

      if (!validDriver || validDriver.length === 0) {
        throw new ApiError(
          "O motorista informado não pode ser encontrado.",
          404,
        );
      }
    }

    const getRidesModel = new GetRidersModel();
    const listRides = await getRidesModel.GetManyRidesFiltredByCustomerId({
      customer_id: Number(customer_id),
      filter: Number(filter),
    });

    if (!listRides || listRides.length === 0) {
      throw new ApiError(
        "Não foi possível encontrar o histórico de viagens.",
        404,
      );
    }

    const reduceRidesResult = listRides.reduce(
      (accumulator, currentValue) => {
        const rides = {
          id: currentValue.id,
          date: currentValue.created_at,
          origin: currentValue.origin,
          destination: currentValue.destination,
          distance: currentValue.distance,
          duration: Number(currentValue.duration),
          driver: {
            id: currentValue.drivers.id,
            name: currentValue.drivers.name,
          },
          value: currentValue.price,
        };

        accumulator.push(rides);

        return accumulator;
      },
      [] as {
        id: number;
        date: Date;
        origin: string;
        destination: string;
        distance: number;
        duration: number;
        driver: {
          id: number;
          name: string;
        };
        value: number;
      }[],
    );

    const result = {
      customer_id,
      rides: reduceRidesResult,
    };

    return {
      message: "Histórico de viagens encontrado com sucesso.",
      data: result,
      status: 200,
    };
  }
}

export { GetRidesService };
