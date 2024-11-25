import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { TravelHistory } from "./pages/travelHistory/TravelHistory";
import { TravelOptions } from "./pages/travelOptions/TravelOptions";
import { TravelRequest } from "./pages/travelRequest/TravelRequest";
import { UserCreation } from "./pages/userCreation/UserCreation";
import { Header } from "./components/header/Header";
import "./css/App.css";

const queryClient = new QueryClient();

const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <ReactQueryDevtools initialIsOpen={true} />
    <Header />
    <UserCreation />
    <TravelRequest />
    <TravelOptions />
    <TravelHistory />
  </QueryClientProvider>
);

export default App;
