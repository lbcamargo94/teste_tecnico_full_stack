import { FormsHistory } from "@/components/formsHistory/FormsHistory";
import { HistoryTable } from "@/components/historyTable/HistoryTable";
import { api } from "@/services/api";
import { driversStore } from "@/store/drivers";
import { errorStore } from "@/store/errorsStore";
import { historyStore } from "@/store/history";
import { useEffect } from "react";

function TravelHistory() {
  const { setError } = errorStore();
  const { setDriversList } = driversStore();
  const { history } = historyStore();

  useEffect(() => {
    const fetchDriversList = async () => {
      await handleRequestDriversListApi();
    };

    fetchDriversList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRequestDriversListApi = async (): Promise<void> => {
    await api
      .get("/driver/all_drivers")
      .then((response) => {
        if (response.data) {
          setDriversList(response.data);
          return response.data;
        }
      })
      .catch((error) => {
        console.error(error);
        setError({
          status: true,
          message: error.response.data.message,
        });
        return error;
      });
  };

  return (
    <div
      id="initial-page"
      className="flex align-middle justify-start items-center flex-col p-2 h-[550px] w-full box-border"
    >
      <h1 className="text-lg font-medium p-2 m-2">Histórico de Viagens</h1>
      <FormsHistory />
      <HistoryTable key={"unique-key"} data={history} />
    </div>
  );
}

export { TravelHistory };
