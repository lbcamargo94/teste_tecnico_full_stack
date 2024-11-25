import { Request, Response } from "express";
import { CreateCustomerService } from "@service/customers/CreateCustomersService";

class CreateCustomerController {
  public async CreateCustomers(
    request: Request,
    response: Response,
  ): Promise<Request | any> {
    const { email, name }: { name: string; email: string } = request.body;

    const createCustomerService = new CreateCustomerService();
    const result = await createCustomerService.CreateCustomers({
      email,
      name,
    });

    return response
      .json({ message: result.message, data: result.data })
      .status(result.status);
  }
}

export { CreateCustomerController };
