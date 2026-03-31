import { z } from "zod";

// Schema de validação para criação/edição de projetos
export const projectSchema = z.object({
  name: z
    .string()
    .min(1, "Nome é obrigatório")
    .max(100, "Nome deve ter no máximo 100 caracteres")
    .trim(),

  niche: z
    .string()
    .min(1, "Nicho é obrigatório")
    .max(50, "Nicho deve ter no máximo 50 caracteres")
    .trim(),

  description: z
    .string()
    .max(500, "Descrição deve ter no máximo 500 caracteres")
    .optional(),

  status: z.enum(["active", "draft", "archived"], {
    errorMap: () => ({
      message: "Status deve ser ativo, rascunho ou arquivado",
    }),
  }),
});

// Schema de validação para autenticação
export const loginSchema = z.object({
  email: z.string().min(1, "Email é obrigatório").email("Email inválido"),

  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, "Nome é obrigatório")
      .max(100, "Nome deve ter no máximo 100 caracteres")
      .trim(),

    email: z.string().min(1, "Email é obrigatório").email("Email inválido"),

    password: z
      .string()
      .min(6, "Senha deve ter pelo menos 6 caracteres")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Senha deve conter pelo menos uma letra minúscula, uma maiúscula e um número",
      ),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Senhas não coincidem",
    path: ["confirmPassword"],
  });

// Tipos inferidos dos schemas
export type ProjectForm = z.infer<typeof projectSchema>;
export type LoginForm = z.infer<typeof loginSchema>;
export type RegisterForm = z.infer<typeof registerSchema>;

// Função helper para validar e retornar erros
export function validateForm<T>(
  schema: z.ZodSchema<T>,
  data: unknown,
): {
  success: boolean;
  data?: T;
  errors?: Record<string, string>;
} {
  try {
    const validData = schema.parse(data);
    return { success: true, data: validData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string> = {};
      error.errors.forEach((err) => {
        if (err.path.length > 0) {
          errors[err.path[0] as string] = err.message;
        }
      });
      return { success: false, errors };
    }
    return { success: false, errors: { general: "Erro de validação" } };
  }
}
