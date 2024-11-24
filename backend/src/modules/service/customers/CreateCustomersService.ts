import { ApiError } from "@erro/index";
import { CreateCustomerModel } from "@model/customers/CreateCustomersModel";
import { GetCustomerModel } from "@model/customers/GetCustomersModel";

class CreateCustomerService {
  public async CreateCustomers({
    name,
    email,
  }: {
    name: string;
    email: string;
  }) {
    if (!name || !email) {
      throw new ApiError("Dados informados estão inválidos", 400);
    }

    const getCustomerByEmail = new GetCustomerModel();
    const validCustomer = await getCustomerByEmail.GetCustomerByEmail({
      email,
    });

    if (validCustomer.length > 0) {
      throw new ApiError(
        "O e-mail informado já esta cadastrado em outro usuário.",
        409,
      );
    }

    const createCustomerModel = new CreateCustomerModel();
    const createCustomer = await createCustomerModel.CreateCustomers({
      name,
      email,
    });

    return {
      data: createCustomer,
      message: "Novo cliente cadastrado com sucesso no sistema!",
      status: 200,
    };
  }
}

export { CreateCustomerService };
