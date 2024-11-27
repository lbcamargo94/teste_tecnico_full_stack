import { DriversTable } from "@/components/driversTable/DriversTable";
import { StaticMap } from "@/components/staicMap/StaticMap";
import { ridesStore } from "@/store/rides";

{
  // Referencias
  // https://developers.google.com/codelabs/maps-platform/maps-platform-101-react-js?hl=pt_BR#6
}
interface optionsProps {
  id: number;
  name: string;
  description: string;
  vehicle: string;
  review: {
    rating: number;
    comment: string;
  };
  value: number;
}

function TravelOptions() {
  const { estimate } = ridesStore();

  const formatData = (data: optionsProps[]) => {
    const formatedData = data.map((item) => ({
      id: item.id,
      name: item.name,
      description: item.description,
      vehicle: item.vehicle,
      rating: item.review.rating,
      comment: item.review.comment,
      value: item.value,
    }));

    return formatedData;
  };

  const headers = [
    "ID",
    "Nome",
    "Descrição",
    "Veículo",
    "Avaliação",
    "Comentário",
    "Valor",
    "Escolher",
  ];

  return (
    <div
      id="travel-options"
      className="flex align-middle justify-start items-center flex-col p-2 w-full box-border bg-blue-950 text-slate-50"
    >
      <h1 className="text-lg font-medium p-2 m-2">Opções de Rotas</h1>
      {!estimate?.destination?.latitude && (
        <div className="glass-effect p-2 h-[5rem] w-[25rem] align-middle items-center justify-start text-center rounded-md m-2">
          <span>Faça uma busca para obter mais informações!</span>
        </div>
      )}
      {estimate?.options && <StaticMap />}
      {estimate?.options && (
        <DriversTable
          data={formatData(estimate.options)}
          headers={headers}
          key={formatData(estimate.options)[0].id}
        />
      )}
    </div>
  );
}

export { TravelOptions };
