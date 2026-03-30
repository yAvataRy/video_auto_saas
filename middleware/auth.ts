/**
 * Middleware de autenticação
 * Protege rotas privadas, redirecionando usuários não autenticados para login
 */
export default defineNuxtRouteMiddleware(async (to: any, from: any) => {
  const authStore = useAuthStore();
  const supabase = useNuxtApp().$supabase as any;

  // Se já temos usuário no store, permitir acesso
  if (authStore.isAuthenticated) {
    return;
  }

  // Tentar restaurar sessão do Supabase
  try {
    const { data, error } = await supabase.auth.getSession();

    if (error || !data.session?.user) {
      // Sem sessão válida, redirecionar para login
      return navigateTo('/login');
    }

    // Sessão válida, atualizar store
    authStore.setUser(data.session.user as any);
  } catch (error) {
    console.error('Auth middleware error:', error);
    return navigateTo('/login');
  }
});
