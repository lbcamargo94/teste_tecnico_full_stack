import { CreateRidesService } from "@service/rides/CreateRidesService";
import { Request, Response } from "express";

class CreateRidesController {
  public async CreateRides(
    request: Request,
    response: Response,
  ): Promise<Request | any> {
    const {
      customer_id,
      destination,
      origin,
    }: {
      customer_id: string;
      origin: string;
      destination: string;
    } = request.body;

    const createRidesService = new CreateRidesService();
    const result = await createRidesService.CreateRides({
      customer_id,
      destination,
      origin,
    });

    return response
      .json({
        message: result.message,
        data: result.data,
      })
      .status(result.status);
  }
}

export { CreateRidesController };
