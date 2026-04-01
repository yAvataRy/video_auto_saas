import { describe, it, expect } from "vitest";
import {
  projectSchema,
  loginSchema,
  registerSchema,
} from "~/utils/validations";

describe("Validations", () => {
  describe("projectSchema", () => {
    it("should validate valid project data", () => {
      const validProject = {
        name: "Meu Projeto",
        niche: "Tecnologia",
        description: "Descrição do projeto",
        status: "active" as const,
      };

      const result = projectSchema.safeParse(validProject);
      expect(result.success).toBe(true);
    });

    it("should reject invalid project data", () => {
      const invalidProject = {
        name: "", // nome vazio
        niche: "Tecnologia",
        description: "Descrição",
        status: "invalid" as any, // status inválido
      };

      const result = projectSchema.safeParse(invalidProject);
      expect(result.success).toBe(false);
    });
  });

  describe("loginSchema", () => {
    it("should validate valid login data", () => {
      const validLogin = {
        email: "user@example.com",
        password: "password123",
      };

      const result = loginSchema.safeParse(validLogin);
      expect(result.success).toBe(true);
    });

    it("should reject invalid email", () => {
      const invalidLogin = {
        email: "invalid-email",
        password: "password123",
      };

      const result = loginSchema.safeParse(invalidLogin);
      expect(result.success).toBe(false);
    });
  });

  describe("registerSchema", () => {
    it("should validate valid register data", () => {
      const validRegister = {
        name: "João Silva",
        email: "joao@example.com",
        password: "password123",
        confirmPassword: "password123",
      };

      const result = registerSchema.safeParse(validRegister);
      expect(result.success).toBe(true);
    });

    it("should reject mismatched passwords", () => {
      const invalidRegister = {
        name: "João Silva",
        email: "joao@example.com",
        password: "password123",
        confirmPassword: "different123",
      };

      const result = registerSchema.safeParse(invalidRegister);
      expect(result.success).toBe(false);
    });
  });
});
