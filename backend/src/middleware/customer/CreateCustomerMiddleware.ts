import { ApiError } from "@erro/index";
import { CreateCustomersSchema } from "@schemas/customers/CreateCustomersSchema";
import { NextFunction, Request, Response } from "express";
import { z } from "zod";

class CreateCustomerMiddleware {
  public async CreateCustomers(
    request: Request,
    _response: Response,
    next: NextFunction,
  ): Promise<void> {
    const customersSchema = new CreateCustomersSchema();
    const typeCustomersSchema = customersSchema.CreateCustomers();

    type CreateCustomerType = z.infer<typeof typeCustomersSchema>;

    const { email, name }: { name: string; email: string } = request.body;

    const formatRequest = {
      email,
      name,
    };

    const result = typeCustomersSchema.safeParse(
      formatRequest as CreateCustomerType,
    );

    if (!result.success) {
      throw new ApiError(result.error.issues[0].message, 400);
    }

    next();
  }
}

export { CreateCustomerMiddleware };
