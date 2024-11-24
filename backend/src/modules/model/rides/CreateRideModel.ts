import { database } from "@database/connection";
import { ICreateRide } from "@interfaces/rides";

class CreateRideModel {
  public async CreateRide({
    customer_id,
    destination,
    distance,
    driver_id,
    duration,
    origin,
    value,
  }: ICreateRide) {
    const result = await database.ride.create({
      data: {
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

export { CreateRideModel };
