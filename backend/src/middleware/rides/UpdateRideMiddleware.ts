import { ApiError } from "@erro/index";
import { IUpdateRides } from "@interfaces/rides";
import { UpdateRidesSchema } from "@schemas/rides/UpdateRidesSchema";
import { NextFunction, Request, Response } from "express";
import { z } from "zod";

class UpdateRidesMiddleware {
  public async UpdateRides(
    request: Request,
    _response: Response,
    next: NextFunction,
  ): Promise<void> {
    const ridesSchema = new UpdateRidesSchema();
    const typeRidesSchema = ridesSchema.UpdateRides();

    type UpdateRidesType = z.infer<typeof typeRidesSchema>;

    const {
      customer_id,
      destination,
      distance,
      driver,
      duration,
      origin,
      value,
    }: IUpdateRides = request.body;

    const formatRequest = {
      customer_id,
      destination,
      distance,
      driver,
      duration,
      origin,
      value,
    };

    const result = typeRidesSchema.safeParse(formatRequest as UpdateRidesType);

    if (!result.success) {
      throw new ApiError(result.error.issues[0].message, 400);
    }

    next();
  }
}

export { UpdateRidesMiddleware };
