import { z } from "zod";

class CreateRidesSchema {
  public CreateRides() {
    return z.object({
      customer_id: z.string({
        required_error: "O id de cliente é obrigatório.",
        invalid_type_error: "O id de cliente não tem o tipo correto.",
      }),

      destination: z.string({
        required_error:
          "Os dados fornecidos no corpo da requisição são inválidos",
        invalid_type_error: "O destino informado não tem o tipo string.",
      }),

      origin: z.string({
        required_error: "A origem do percurso é obrigatória.",
        invalid_type_error: "A origem do percurso não tem o tipo correto.",
      }),
    });
  }
}

export { CreateRidesSchema };
