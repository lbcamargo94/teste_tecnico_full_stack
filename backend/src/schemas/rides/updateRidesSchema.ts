import { z } from "zod";

class UpdateRidesSchema {
  public UpdateRides() {
    return z.object({
      customer_id: z.string({
        required_error: "O id de cliente é obrigatório.",
        invalid_type_error: "O id de cliente não tem o tipo correto.",
      }),

      destination: z.string({
        required_error: "O nome de destino é obrigatório.",
        invalid_type_error: "O nome de destino não tem o tipo correto.",
      }),

      distance: z.number({
        required_error: "A distância do percurso é obrigatório.",
        invalid_type_error: "A distância do percurso não tem o tipo correto.",
      }),

      driver: z.object({
        id: z.number({
          required_error: "O id de motorista é obrigatório.",
          invalid_type_error: "O id de motorista não tem o tipo correto.",
        }),
        name: z.string({
          required_error: "O nome do motorista é obrigatório.",
          invalid_type_error: "O nome do motorista não tem o tipo correto.",
        }),
      }),

      origin: z.string({
        required_error: "A origem do percurso é obrigatória.",
        invalid_type_error: "A origem do percurso não tem o tipo correto.",
      }),

      duration: z.string({
        required_error: "O tempo de duração do percurso é obrigatório.",
        invalid_type_error:
          "O temnpo de duração do percurso não tem o tipo correto.",
      }),

      value: z.number({
        required_error: "O valor do serviço é obrigatório.",
        invalid_type_error: "O valor serviço não tem o tipo correto.",
      }),
    });
  }
}

export { UpdateRidesSchema };
