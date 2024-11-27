import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TravelHistory } from "./pages/travelHistory/TravelHistory";
import { TravelOptions } from "./pages/travelOptions/TravelOptions";
import { UserCreation } from "./pages/userCreation/UserCreation";
import { Header } from "./components/header/Header";
import { ShowError } from "@/components/showError/ShowError";
import { ShowSuccess } from "@/components/showSuccess/ShowSuccess";
import { errorStore } from "./store/errorsStore";
import { successStore } from "./store/successStore";
import "./css/App.css";
import Baseboard from "./pages/baseboard/Baseboard";

const queryClient = new QueryClient();

const App: React.FC = () => {
  const { error } = errorStore();
  const { success } = successStore();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="app">
        <Header />
        {error.status && <ShowError />}
        {success.status && <ShowSuccess />}
        <UserCreation />
        <TravelOptions />
        <TravelHistory />
        <Baseboard />
      </div>
    </QueryClientProvider>
  );
};

export default App;
