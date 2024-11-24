import { GetRidesService } from "@service/rides/GetRidesService";
import { Request, Response } from "express";

class GetRidesConstroller {
  public async GetManyRidesFiltredByCustomerId(
    request: Request,
    response: Response,
  ): Promise<Response | any> {
    const { customer_id } = request.params;
    const filter = (request.query.driver_id as string) || "";

    const getRidesService = new GetRidesService();
    const result = await getRidesService.GetManyRidesFiltredByCustomerId({
      customer_id,
      filter,
    });

    return response.json(result).status(result.status);
  }
}

export { GetRidesConstroller };
