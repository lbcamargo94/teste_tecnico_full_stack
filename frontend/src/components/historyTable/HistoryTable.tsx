type DataTableProps = {
  id: number;
  date: string;
  origin: string;
  destination: string;
  distance: number;
  duration: string;
  driver: {
    id: number;
    name: string;
  };
  value: number;
};

const headers = [
  "ID",
  "Data e Hora",
  "Motorista",
  "Origem",
  "Destino",
  "Distância",
  "Tempo",
  "Valor",
];

function HistoryTable({ data }: { data: DataTableProps[] }) {
  console.log("HistoryTable", data);

  return (
    <div className="text-sm text-left text-gray-600 bg-slate-100 mx- rounded-md overflow-hidden w-full">
      <table
        key={"rides-history-table"}
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
              <td className="text-center border border-slate-100">{item.id}</td>
              <td className="text-center border border-slate-100">
                {item.date}
              </td>
              <td className="text-center border border-slate-100">
                {item.driver.name}
              </td>
              <td className="text-center border border-slate-100">
                {item.origin}
              </td>
              <td className="text-center border border-slate-100">
                {item.destination}
              </td>
              <td className="text-center border border-slate-100">
                {item.distance}
              </td>
              <td className="text-center border border-slate-100">
                {item.duration}
              </td>
              <td className="text-center border border-slate-100">
                {item.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export { HistoryTable };
