import { IUpdateRides } from "@interfaces/rides";
import { UpdateRidesService } from "@service/rides/UpdateRidesService";
import { Request, Response } from "express";

class UpdateRidesController {
  public async UpdateRides(
    request: Request,
    response: Response,
  ): Promise<Request | any> {
    const {
      customer_id,
      destination,
      distance,
      driver,
      duration,
      origin,
      value,
    }: IUpdateRides = request.body;

    const updateRidesService = new UpdateRidesService();
    const result = await updateRidesService.UpdateRides({
      customer_id,
      destination,
      distance,
      driver,
      duration,
      origin,
      value,
    });

    return response.json(result);
  }
}

export { UpdateRidesController };
