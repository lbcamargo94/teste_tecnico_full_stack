import { customersStore } from "@/store/customers";
import { Button } from "../ui/button";
import { driversStore } from "@/store/drivers";
import { ridesStore } from "@/store/rides";
import { IRides } from "@/interface/IRides";
import { errorStore } from "@/store/errorsStore";
import { successStore } from "@/store/successStore";
import { api } from "@/services/api";
import { useEffect } from "react";

type DataTableProps = {
  id: number;
  name: string;
  description: string;
  vehicle: string;
  rating: number;
  comment: string;
  value: number;
};

function DriversTable({
  data,
  headers,
}: {
  data: DataTableProps[];
  headers: string[];
}) {
  const { driver, setDrivers } = driversStore();
  const { customer_id } = customersStore();
  const { estimate } = ridesStore();
  const { setError } = errorStore();
  const { setSuccess } = successStore();

  useEffect(() => {
    const confirmRide = async () => {
      if (driver?.id && driver?.name) {
        await handleConfirmRide({
          customer_id,
          destination: estimate?.destination_name as string,
          distance: estimate?.distance as number,
          driver: {
            id: driver?.id as number,
            name: driver?.name as string,
          },
          duration: estimate?.duration as string,
          origin: estimate?.origin_name as string,
          value: driver?.value as number,
        });
      }
    };

    confirmRide();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [driver]);

  const handleConfirmRide = async ({
    customer_id,
    destination,
    distance,
    driver,
    duration,
    origin,
    value,
  }: IRides) => {
    if (!customer_id || customer_id.length === 0) {
      return setError({
        status: true,
        message: "O ID de usuário está inválido.",
      });
    }
    if (!destination || destination.length === 0) {
      return setError({
        status: true,
        message: "O nome de Destino está inválido.",
      });
    }
    if (!distance || typeof distance !== "number" || distance === 0) {
      return setError({ status: true, message: "A Destância está inválida." });
    }
    if (!driver || !driver.id || !driver.name) {
      return setError({ status: true, message: "O Motorista está inválido." });
    }
    if (!duration || duration.length === 0) {
      return setError({
        status: true,
        message: "O Tempo de viagem está inválido.",
      });
    }
    if (!origin || origin.length === 0) {
      return setError({
        status: true,
        message: "O nome de Partida está inválido.",
      });
    }
    if (!value || typeof distance !== "number" || value === 0) {
      return setError({
        status: true,
        message: "O nome de Partida está inválido.",
      });
    }

    await api
      .patch("/ride/confirm", {
        customer_id,
        destination,
        distance,
        driver,
        duration,
        origin,
        value,
      })
      .then((response) => {
        if (response.data) {
          setSuccess({
            status: true,
            message: "Viagem confirmada com sucesso 🎉!",
          });
          return response.data;
        }
      })
      .catch((error) => {
        setError({
          status: true,
          message: "Falha ao confirmar a viagem.😒",
        });
        return error;
      });
  };

  return (
    <div className="text-sm text-left text-gray-600 bg-slate-100 mx-3 rounded-md overflow-hidden">
      <table
        key={data[0].name}
        className="table-auto border-collapse border border-slate-500 h-full w-full rounded-md overflow-hidden"
      >
        <thead className="text-sm text-black m-2 uppercase h-7 p-2 w-full bg-gray-500">
          <tr className="space-x-2">
            {headers.map((title: string) => (
              <td className="p-2 border border-slate-100">{title}</td>
            ))}
          </tr>
        </thead>
        <tbody className="text-xs text-gray-600 m-2 h-7 p-2 w-full bg-gray-300">
          {data.map((item) => (
            <tr className="p-2 border border-slate-100 text-sm">
              <td className="text-center p-1 border border-slate-100">
                {item.id}
              </td>
              <td className="p-1 text-start border border-slate-100">
                {item.name}
              </td>
              <td className="p-1 text-start border border-slate-100">
                {item.description}
              </td>
              <td className="p-1 text-start border border-slate-100">
                {item.vehicle}
              </td>
              <td className="text-center border border-slate-100">{`${item.rating}/5 ⭐`}</td>
              <td className="p-1 text-start border border-slate-100">
                {item.comment}
              </td>
              <td className="text-center border border-slate-100">
                {`${item.value} R$`}
              </td>
              <td className="text-center border border-slate-100">
                <Button
                  type="submit"
                  className={"bg-green-700 cursor-pointer w-[80%] text-wrap"}
                  onClick={() =>
                    setDrivers({
                      id: item.id,
                      name: item.name,
                      description: item.description,
                      vehicle: item.vehicle,
                      rating: item.rating,
                      comment: item.comment,
                      value: item.value,
                    })
                  }
                >
                  {driver?.id === item.id ? "Escolhido" : "Escolher"}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export { DriversTable };
