import { database } from "@database/connection";

class GetDriversModel {
  public async GetDriverByDriverId({
    driver_id,
  }: {
    driver_id: number;
  }): Promise<
    {
      id: number;
      name: string;
      destination: string;
      vehicle: string;
      rating: number;
      minimum_distance: number;
    }[]
  > {
    const result: {
      id: number;
      name: string;
      destination: string;
      vehicle: string;
      rating: number;
      minimum_distance: number;
    }[] = await database.$queryRaw`
    -- SELECT
    select distinct
    dv.id,
    dv.name,
    dv.description,
    dv.vehicle,
    dv.rating,
    dv.minimum_distance
    -- FROM
    from drivers dv
    -- WHERE
    where dv.id = ${driver_id}
    `;

    return result;
  }

  public async GetAllDrivers() {
    const result = await database.driver.findMany({
      select: {
        id: true,
        description: true,
        minimum_distance: true,
        name: true,
        rating: true,
        vehicle: true,
        assessment: {
          select: {
            id: true,
            comment: true,
            evaluation_rate: true,
          },
        },
      },
    });

    return result;
  }
}

export { GetDriversModel };
