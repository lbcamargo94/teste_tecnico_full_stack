import { database } from "@database/connection";

class GetRidersModel {
  public async GetRideById({
    ride_id,
    driver_id,
  }: {
    ride_id: number;
    driver_id: number;
  }) {
    const result = await database.ride.findFirst({
      where: {
        id: ride_id,
        driver_id,
      },
    });

    return result;
  }

  public async GetManyRidesFiltredByCustomerId({
    customer_id,
    filter,
  }: {
    customer_id: number;
    filter: number;
  }) {
    const result = await database.ride.findMany({
      where: {
        customer_id,
        // driver_id: filter,
        ...(filter ? { driver_id: filter } : {}),
      },
      orderBy: {
        created_at: "desc",
      },
      select: {
        id: true,
        origin: true,
        destination: true,
        distance: true,
        duration: true,
        price: true,
        created_at: true,
        drivers: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return result;
  }
}

export { GetRidersModel };
