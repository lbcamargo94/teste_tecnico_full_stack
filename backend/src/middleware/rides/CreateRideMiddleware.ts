import { ApiError } from "@erro/index";
import { CreateRidesSchema } from "@schemas/rides/CreateRidesSchema";
import { NextFunction, Request, Response } from "express";
import { z } from "zod";

class CreateRideMiddleware {
  public async CreateRides(
    request: Request,
    _response: Response,
    next: NextFunction,
  ): Promise<void> {
    const ridesSchema = new CreateRidesSchema();
    const typeRidesSchema = ridesSchema.CreateRides();

    type CreateRidesType = z.infer<typeof typeRidesSchema>;

    const {
      customer_id,
      origin,
      destination,
    }: { customer_id: string; origin: string; destination: string } =
      request.body;

    const formatRequest = {
      customer_id,
      origin,
      destination,
    };

    const result = typeRidesSchema.safeParse(formatRequest as CreateRidesType);

    if (!result.success) {
      throw new ApiError(result.error.issues[0].message, 400);
    }

    next();
  }
}

export { CreateRideMiddleware };
