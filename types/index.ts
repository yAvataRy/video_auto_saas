/**
 * Tipos TypeScript para a aplicação
 * Strict mode habilitado
 */

// ============ AUTH ============
export interface User {
  id: string;
  email: string;
  name?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface AuthSession {
  user: User | null;
  access_token: string | null;
  refresh_token: string | null;
  expires_at?: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  name?: string;
}

// ============ PROJECTS ============
export interface Project {
  id: string;
  user_id: string;
  name: string;
  niche: string;
  description?: string;
  status: "active" | "archived" | "draft";
  scheduled_at?: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateProjectInput {
  name: string;
  niche: string;
  description?: string;
  scheduled_at?: string | null;
}

export interface UpdateProjectInput {
  name?: string;
  niche?: string;
  description?: string;
  status?: "active" | "archived" | "draft";
  scheduled_at?: string | null;
}

// ============ API RESPONSES ============
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

// ============ ERRORS ============
export class AppError extends Error {
  constructor(
    public code: string,
    message: string,
    public statusCode: number = 500,
  ) {
    super(message);
    this.name = "AppError";
  }
}
