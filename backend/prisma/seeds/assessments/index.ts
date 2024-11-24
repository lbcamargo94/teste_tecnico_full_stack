const DataSeedAssessments: {
  id: number;
  comment: string;
  driver_id: number;
  customer_id: number;
  evaluation_rate: number;
}[] = [
  {
    id: 1,
    comment:
      "Motorista simpático, mas errou o caminho 3 vezes. O carro cheira a donuts.",
    driver_id: 1,
    customer_id: 2,
    evaluation_rate: 2,
  },
  {
    id: 2,
    comment:
      "Que viagem incrível! O carro é um show à parte e o motorista, apesar de ter uma cara de poucos amigos, foi super gente boa. Recomendo!",
    driver_id: 2,
    customer_id: 4,
    evaluation_rate: 4,
  },
  {
    id: 3,
    comment:
      "Serviço impecável! O motorista é a própria definição de classe e o carro é implesmente magnífico. Uma experiência digna de um agente secreto.",
    driver_id: 3,
    customer_id: 3,
    evaluation_rate: 5,
  },
];

export { DataSeedAssessments };
