import { defineStore } from 'pinia';
import type { User, AuthSession } from '~/types';

/**
 * Pinia Store para gerenciar estado de autenticação globalmente
 */
export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    session: null as AuthSession | null,
    isLoading: false,
    isAuthenticated: false,
  }),

  getters: {
    // Getter para verificar se usuário está autenticado
    isLoggedIn: (state) => state.isAuthenticated && state.user !== null,

    // Getter para obter ID do usuário
    userId: (state) => state.user?.id || null,

    // Getter para obter email do usuário
    userEmail: (state) => state.user?.email || null,
  },

  actions: {
    // Definir usuário
    setUser(user: User | null) {
      this.user = user;
      this.isAuthenticated = user !== null;
    },

    // Definir sessão completa
    setSession(session: AuthSession | null) {
      this.session = session;
      if (session?.user) {
        this.setUser(session.user);
      }
    },

    // Limpar sessão
    clearSession() {
      this.user = null;
      this.session = null;
      this.isAuthenticated = false;
    },

    // Definir estado de carregamento
    setLoading(loading: boolean) {
      this.isLoading = loading;
    },

    // Atualizar usuário
    updateUser(updates: Partial<User>) {
      if (this.user) {
        this.user = { ...this.user, ...updates };
      }
    },
  },
});
