import { defineStore } from "pinia";
import { useAppToast } from "~/composables/useAppToast";
import { loginSchema, registerSchema, validateForm } from "~/utils/validations";
import type {
  User,
  LoginCredentials,
  RegisterCredentials,
  AuthSession,
} from "~/types";

/**
 * Composable para gerenciar autenticação
 * Responsável por login, registro, logout e persistência de sessão
 */
export const useAuth = () => {
  const nuxtApp = useNuxtApp();
  const supabase = nuxtApp.$supabase;
  if (!supabase) {
    throw new Error(
      "Supabase client não inicializado. Verifique plugins/supabase.client.ts",
    );
  }
  const router = useRouter();
  const authStore = useAuthStore();
  const { addToast } = useAppToast();

  // ============ LOGIN ============
  const login = async (credentials: LoginCredentials) => {
    try {
      // Validar dados de entrada
      const validation = validateForm(loginSchema, credentials);
      if (!validation.success) {
        throw new Error(
          Object.values(validation.errors!)[0] || "Dados inválidos",
        );
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email: validation.data!.email,
        password: validation.data!.password,
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data.user) {
        const user: User = {
          id: data.user.id,
          email: data.user.email || "",
          name: (data.user.user_metadata?.name as string) || "",
          avatar_url:
            (data.user.user_metadata?.avatar_url as string) || undefined,
          created_at: data.user.created_at,
          updated_at: data.user.updated_at || data.user.created_at,
        };
        authStore.setUser(user);
        authStore.setSession({
          user,
          access_token: data.session?.access_token || null,
          refresh_token: data.session?.refresh_token || null,
          expires_at: data.session?.expires_at,
        });
      }

      await router.push("/dashboard");
      addToast("Login realizado com sucesso!", "success");
      return { success: true, data };
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erro no login";
      console.error("Login error:", error);
      addToast(message, "error");
      throw error;
    }
  };

  // ============ REGISTER ============
  const register = async (credentials: RegisterCredentials) => {
    try {
      // Validar dados de entrada
      const validation = validateForm(registerSchema, credentials);
      if (!validation.success) {
        throw new Error(
          Object.values(validation.errors!)[0] || "Dados inválidos",
        );
      }

      const { data, error } = await supabase.auth.signUp({
        email: validation.data!.email,
        password: validation.data!.password,
        options: {
          data: {
            name: validation.data!.name,
          },
        },
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data.user) {
        const user: User = {
          id: data.user.id,
          email: data.user.email || "",
          name:
            (data.user.user_metadata?.name as string) || validation.data!.name,
          avatar_url:
            (data.user.user_metadata?.avatar_url as string) || undefined,
          created_at: data.user.created_at,
          updated_at: data.user.updated_at || data.user.created_at,
        };
        authStore.setUser(user);
      }

      await router.push("/login");
      addToast("Cadastro realizado com sucesso!", "success");
      return { success: true, data };
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erro no cadastro";
      console.error("Register error:", error);
      addToast(message, "error");
      throw error;
    }
  };

  // ============ LOGOUT ============
  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        throw new Error(error.message);
      }

      authStore.clearSession();
      await router.push("/login");
      addToast("Logout realizado com sucesso!", "success");
      return { success: true };
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erro no logout";
      console.error("Logout error:", error);
      addToast(message, "error");
      throw error;
    }
  };

  // ============ RESTORE SESSION ============
  const restoreSession = async () => {
    try {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        throw new Error(error.message);
      }

      if (data.session?.user) {
        const user: User = {
          id: data.session.user.id,
          email: data.session.user.email || "",
          name: (data.session.user.user_metadata?.name as string) || "",
          avatar_url:
            (data.session.user.user_metadata?.avatar_url as string) ||
            undefined,
          created_at: data.session.user.created_at,
          updated_at:
            data.session.user.updated_at || data.session.user.created_at,
        };
        authStore.setUser(user);
        authStore.setSession({
          user,
          access_token: data.session.access_token,
          refresh_token: data.session.refresh_token,
          expires_at: data.session.expires_at,
        });
      }

      return { success: true, session: data.session };
    } catch (error) {
      console.error("Restore session error:", error);
      return { success: false };
    }
  };

  // ============ GET CURRENT USER ============
  const getCurrentUser = async () => {
    try {
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        throw new Error(error.message);
      }

      return data.user;
    } catch (error) {
      console.error("Get current user error:", error);
      return null;
    }
  };

  return {
    login,
    register,
    logout,
    restoreSession,
    getCurrentUser,
    user: computed(() => authStore.user),
    isAuthenticated: computed(() => authStore.isAuthenticated),
    isLoading: computed(() => authStore.isLoading),
  };
};
