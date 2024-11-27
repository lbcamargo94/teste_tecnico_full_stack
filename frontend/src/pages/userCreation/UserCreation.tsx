import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@radix-ui/react-label";
import { ridesStore } from "@/store/rides";
import { useState } from "react";
import { api } from "@/services/api";
import { errorStore } from "@/store/errorsStore";
import { successStore } from "@/store/successStore";
import { driversStore } from "@/store/drivers";
import { customersStore } from "@/store/customers";

function UserCreation() {
  const { setEstimate } = ridesStore();
  const { setError } = errorStore();
  const { setSuccess } = successStore();
  const { clearDrivers } = driversStore();
  const { setCustomerId, clearCustomerId } = customersStore();

  const [newCustomer, setNewCustomer] = useState<{
    name: string;
    email: string;
  }>({
    name: "",
    email: "",
  });

  const [estimate_ride, setEstimateRide] = useState<{
    customer_id: string;
    origin: string;
    destination: string;
  }>({
    customer_id: "",
    origin: "",
    destination: "",
  });

  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 50;
      const elementTop = element.getBoundingClientRect().top;
      window.scrollBy({
        top: elementTop - offset,
        behavior: "smooth",
      });
    }
  };

  const handleCreateUser = async (
    name: string,
    email: string
  ): Promise<void> => {
    if (!name || name.length === 0) {
      return setError({ status: true, message: "O nome está inválido." });
    }

    if (!email || email.length === 0) {
      return setError({ status: true, message: "O email está inválido." });
    }

    await api
      .post("/customer/create_customer", {
        name,
        email,
      })
      .then((response) => {
        if (response.data) {
          setSuccess({
            status: true,
            message: "Novo usuário foi criado com sucesso",
          });
        }
        return response.data;
      })
      .catch((error) => {
        setError({
          status: true,
          message: `${error.response.data.message}`,
        });
        return error;
      });
  };

  const handleCreateEstimateRide = async ({
    customer_id,
    origin,
    destination,
  }: {
    customer_id: string;
    origin: string;
    destination: string;
  }): Promise<void> => {
    setEstimate(null);
    await api
      .post("/ride/estimate", {
        customer_id,
        origin,
        destination,
      })
      .then((response) => {
        if (response.data) {
          setEstimate({
            ...response.data.data,
            origin_name: estimate_ride.origin,
            destination_name: estimate_ride.destination,
          });
          setSuccess({
            status: true,
            message: "Rota de viagem criada com sucesso",
          });
          setCustomerId(estimate_ride.customer_id);
          setEstimateRide({
            customer_id: "",
            origin: "",
            destination: "",
          });
          handleScroll("travel-options");
        }
      })
      .catch((error) => {
        console.error(error);
        setEstimate(null);
        clearCustomerId();
        setEstimateRide({
          customer_id: "",
          origin: "",
          destination: "",
        });
        clearDrivers();
        setError({
          status: true,
          message: `${error.response.data.message}`,
        });
      });
  };

  return (
    <div
      id="initial-page"
      className="flex align-middle justify-start items-center flex-col p-2 h-[550px] w-full box-border"
    >
      <h1 className="text-lg font-medium p-2 m-2">Escolha uma das abas</h1>
      <div className="flex flex-col align-middle items-center	justify-center w-full mx-auto m-1">
        <Tabs
          defaultValue="rides"
          className="w-[400px] bg-green-600 rounded-md shadow-md border"
        >
          <TabsList className="flex rounded-t rounded-b-none justify-around">
            <TabsTrigger value="rides">Viagem</TabsTrigger>
            <TabsTrigger value="users">Usuários</TabsTrigger>
          </TabsList>
          <TabsContent value="rides" className="p-1 max-h-[370px]">
            <Card className="rounded-md shadow-md ">
              <CardHeader>
                <CardTitle>Viagem</CardTitle>
                <CardDescription>Consulte sua viagem aqui.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-1">
                <div className="space-y-1">
                  <Label htmlFor="customer-id">ID de usuário</Label>
                  <Input
                    id="customer-id"
                    placeholder="digite o ID do usuário"
                    value={estimate_ride.customer_id}
                    onChange={(prevEstimate) => {
                      setEstimateRide({
                        ...estimate_ride,
                        customer_id: prevEstimate.target.value,
                      });
                    }}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="origin">Endereço de Partida</Label>
                  <Input
                    id="origin"
                    placeholder="digite endereço de partida"
                    value={estimate_ride.origin}
                    onChange={(prevEstimate) => {
                      setEstimateRide({
                        ...estimate_ride,
                        origin: prevEstimate.target.value,
                      });
                    }}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="destination">Endereço de Destino</Label>
                  <Input
                    id="destination"
                    placeholder="digite endereço de destino"
                    value={estimate_ride.destination}
                    onChange={(prevEstimate) => {
                      setEstimateRide({
                        ...estimate_ride,
                        destination: prevEstimate.target.value,
                      });
                    }}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button
                  className="bg-green-700 cursor-pointer"
                  onClick={() => {
                    handleCreateEstimateRide({
                      customer_id: estimate_ride.customer_id,
                      destination: estimate_ride.destination,
                      origin: estimate_ride.origin,
                    });
                    setCustomerId(estimate_ride.customer_id);
                    setEstimateRide({
                      customer_id: "",
                      origin: "",
                      destination: "",
                    });
                  }}
                >
                  Estimar Viagem
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          {/* CREATE NEW USERS */}
          <TabsContent
            value="users"
            className="p-1 flex flex-col justify-around box-border"
          >
            <Card className="rounded-md flex flex-col justify-around ">
              <CardHeader>
                <CardTitle>Usuários</CardTitle>
                <CardDescription>Crie um novo usuário aqui.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  <Label htmlFor="customer-name">Nome do usuário</Label>
                  <Input
                    id="customer-name"
                    placeholder="digite o nome do usuário"
                    value={newCustomer.name}
                    onChange={(prevCustomer) => {
                      setNewCustomer({
                        ...newCustomer,
                        name: prevCustomer.target.value,
                      });
                    }}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="customer-email">Email do usuário</Label>
                  <Input
                    id="customer-email"
                    placeholder="digite o email do usuário"
                    value={newCustomer.email}
                    onChange={(prevCustomer) => {
                      setNewCustomer({
                        ...newCustomer,
                        email: prevCustomer.target.value,
                      });
                    }}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button
                  type="submit"
                  className="bg-green-700 cursor-pointer"
                  onClick={() => {
                    handleCreateUser(newCustomer.name, newCustomer.email);
                    setNewCustomer({
                      name: "",
                      email: "",
                    });
                  }}
                >
                  Criar Usuário
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
export { UserCreation };
