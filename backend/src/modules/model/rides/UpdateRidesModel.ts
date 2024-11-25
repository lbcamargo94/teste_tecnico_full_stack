import { database } from "@database/connection";

class UpdateRidesModel {
  public async UpdateRides({
    id,
    customer_id,
    destination,
    distance,
    driver_id,
    duration,
    origin,
    value,
  }: {
    id: number;
    customer_id: number;
    destination: string;
    distance: number;
    driver_id: number;
    duration: string;
    origin: string;
    value: number;
  }): Promise<{
    id: number;
    customer_id: number;
    destination: string;
    distance: number;
    driver_id: number;
    duration: string;
    origin: string;
    price: number;
  }> {
    const result: {
      id: number;
      customer_id: number;
      destination: string;
      distance: number;
      driver_id: number;
      duration: string;
      origin: string;
      price: number;
    } = await database.ride.upsert({
      where: { id }, // Changed to use 'id' instead of 'driver_id'
      update: {
        // Dados a atualizar se o registro já existir
        destination,
        distance,
        duration,
        origin,
        price: value,
      },
      create: {
        // Dados a inserir se o registro não existir
        customer_id,
        destination,
        distance,
        driver_id,
        duration,
        origin,
        price: value,
      },
    });

    return result;
  }
}

export { UpdateRidesModel };
