const DataSeedDrivers: {
  id: number;
  description: string;
  minimum_distance: number;
  name: string;
  rating: number;
  vehicle: string;
}[] = [
  {
    id: 1,
    description:
      "Olá! Sou o Homer, seu motorista camarada! Relaxe e aproveite o passeio, com direito a rosquinhas e boas risadas (e talvez alguns desvios).",
    minimum_distance: 1,
    name: "Homer Simpson",
    rating: 2.5,
    vehicle: "Plymouth Valiant 1973 rosa e enferrujado",
  },
  {
    id: 2,
    description:
      "Ei, aqui é o Dom. Pode entrar, vou te levar com segurança e rapidez ao seu destino. Só não mexa no rádio, a playlist é sagrada.",
    minimum_distance: 5,
    name: "Dominic Toretto",
    rating: 5.0,
    vehicle: "Dodge Charger R/T 1970 modificado",
  },
  {
    id: 3,
    description:
      "Boa noite, sou James Bond. À seu dispor para um passeio suave e discreto. Aperte o cinto e aproveite a viagem.",
    minimum_distance: 10,
    name: "James Bond",
    rating: 10,
    vehicle: "Aston Martin DB5 clássico",
  },
];

export { DataSeedDrivers };
