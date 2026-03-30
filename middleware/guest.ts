/**
 * Middleware guest
 * Bloqueia usuários autenticados de acessar páginas de login/registro
 */
export default defineNuxtRouteMiddleware(async (to: any, from: any) => {
  const authStore = useAuthStore();
  const supabase = useNuxtApp().$supabase as any;

  // Se usuário está autenticado, redirecionar para dashboard
  if (authStore.isAuthenticated) {
    return navigateTo('/dashboard');
  }

  // Tentar restaurar sessão do Supabase
  try {
    const { data } = await supabase.auth.getSession();

    if (data.session?.user) {
      // Sessão válida, redirecionar para dashboard
      authStore.setUser(data.session.user as any);
      return navigateTo('/dashboard');
    }
  } catch (error) {
    console.error('Guest middleware error:', error);
  }
});
