import { GetDriversService } from "@service/drivers/GetDriversService";
import { Request, Response } from "express";

class GetDriversController {
  public async GetAllDrivers(
    _request: Request,
    response: Response,
  ): Promise<Response | any> {
    const getDriversService = new GetDriversService();
    const result = await getDriversService.GetAllDrivers();

    return response.json(result.result).status(result.status);
  }
}

export { GetDriversController };
