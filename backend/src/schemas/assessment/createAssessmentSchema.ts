import { z } from "zod";

class CreateAssessmentsSchema {
  public createAssessment() {
    return z.object({
      comment: z
        .string({
          required_error: "O comentário da avaliação é obrigatório.",
          invalid_type_error:
            "O comentário da avaliação não tem o tipo correto.",
        })
        .min(3, {
          message: "O comentário da avaliação deve ter no mínimo 3 caracteres.",
        })
        .max(255, {
          message:
            "O comentário da avaliação deve ter no máximo 255 caracteres.",
        }),

      driver_id: z.number({
        required_error: "O id do motorista é obrigatório.",
        invalid_type_error: "O id do motorista não tem o tipo correto.",
      }),

      user_id: z.number({
        required_error: "O id do cliente é obrigatório.",
        invalid_type_error: "O id do cliente não tem o tipo correto.",
      }),

      evaluation_rate: z
        .number({
          required_error: "A nota da avaliação é obrigatória.",
          invalid_type_error: "A nota da avaliação não tem o tipo correto.",
        })
        .min(1, {
          message: "A nota da avaliação deve ser no mínimo 1.",
        })
        .max(5, {
          message: "A nota da avaliação deve ser no máximo 5.",
        }),
    });
  }
}

export { CreateAssessmentsSchema };
