import { defineStore } from 'pinia';
import type { User, LoginCredentials, RegisterCredentials, AuthSession } from '~/types';

/**
 * Composable para gerenciar autenticação
 * Responsável por login, registro, logout e persistência de sessão
 */
export const useAuth = () => {
  const supabase = useNuxtApp().$supabase as any;
  const router = useRouter();
  const authStore = useAuthStore();

  // ============ LOGIN ============
  const login = async (credentials: LoginCredentials) => {
    try {
      const { data, error } = await (supabase as any).auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data.user) {
        authStore.setUser(data.user as unknown as User);
        authStore.setSession({
          user: data.user as unknown as User,
          access_token: data.session?.access_token || null,
          refresh_token: data.session?.refresh_token || null,
          expires_at: data.session?.expires_at,
        });
      }

      await router.push('/dashboard');
      return { success: true, data };
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  // ============ REGISTER ============
  const register = async (credentials: RegisterCredentials) => {
    try {
      const { data, error } = await (supabase as any).auth.signUp({
        email: credentials.email,
        password: credentials.password,
        options: {
          data: {
            name: credentials.name || '',
          },
        },
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data.user) {
        authStore.setUser(data.user as unknown as User);
      }

      await router.push('/login');
      return { success: true, data };
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  };

  // ============ LOGOUT ============
  const logout = async () => {
    try {
      const { error } = await (supabase as any).auth.signOut();

      if (error) {
        throw new Error(error.message);
      }

      authStore.clearSession();
      await router.push('/login');
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  // ============ RESTORE SESSION ============
  const restoreSession = async () => {
    try {
      const { data, error } = await (supabase as any).auth.getSession();

      if (error) {
        throw new Error(error.message);
      }

      if (data.session?.user) {
        authStore.setUser(data.session.user as unknown as User);
        authStore.setSession({
          user: data.session.user as unknown as User,
          access_token: data.session.access_token,
          refresh_token: data.session.refresh_token,
          expires_at: data.session.expires_at,
        });
      }

      return { success: true, session: data.session };
    } catch (error) {
      console.error('Restore session error:', error);
      return { success: false };
    }
  };

  // ============ GET CURRENT USER ============
  const getCurrentUser = async () => {
    try {
      const { data, error } = await (supabase as any).auth.getUser();

      if (error) {
        throw new Error(error.message);
      }

      return data.user;
    } catch (error) {
      console.error('Get current user error:', error);
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
