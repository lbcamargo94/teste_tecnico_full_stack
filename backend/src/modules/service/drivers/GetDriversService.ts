import { ApiError } from "@erro/index";
import { IListDrivers } from "@interfaces/drivers";
import { GetDriversModel } from "@model/drivers/GetDriversModel";

class GetDriversService {
  public async GetAllDrivers(): Promise<{
    result: IListDrivers[];
    status: number;
    message: string;
  }> {
    const getDriversModel = new GetDriversModel();
    const listAllDrivers = await getDriversModel.GetAllDrivers();

    if (!listAllDrivers) {
      throw new ApiError("Falha ao buscar motoristas no banco de dados.", 400);
    }

    const result = listAllDrivers.reduce((accumulator, currentValue) => {
      const formatDriver = {
        id: currentValue.id,
        name: currentValue.name,
      };

      accumulator.push(formatDriver);

      return accumulator;
    }, [] as IListDrivers[]);

    return {
      result,
      status: 200,
      message: "Motoristas encontrados com sucesso.",
    };
  }
}

export { GetDriversService };
