import { database } from "@database/connection";
import { ICreateCustomers } from "@interfaces/customers";

const SELECT_CONFIG = {
  id: true,
  email: true,
  name: true,
};

class CreateCustomerModel {
  public async CreateCustomers({
    email,
    name,
  }: {
    email: string;
    name: string;
  }): Promise<ICreateCustomers> {
    const result = await database.customer.create({
      data: { email, name },
      select: { ...SELECT_CONFIG },
    });

    return result;
  }
}

export { CreateCustomerModel };
