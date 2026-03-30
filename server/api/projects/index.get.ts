import type { Project, ApiResponse } from '~/types';

/**
 * GET /api/projects
 * Retorna lista de projetos do usuário autenticado
 */
export default defineEventHandler(async (event): Promise<ApiResponse<Project[]>> => {
  try {
    // TODO: Integrar com Supabase para buscar projetos do usuário
    // const user = await requireAuth(event);
    // const { data, error } = await supabase
    //   .from('projects')
    //   .select('*')
    //   .eq('user_id', user.id);

    // Mock data para demonstração
    const projects: Project[] = [
      {
        id: '1',
        user_id: 'user-1',
        name: 'Finance Channel',
        niche: 'Finance',
        description: 'Personal finance and investing tips',
        status: 'active',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: '2',
        user_id: 'user-1',
        name: 'Tech Trends',
        niche: 'Technology',
        description: 'Latest technology trends and news',
        status: 'active',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ];

    return {
      success: true,
      data: projects,
    };
  } catch (error) {
    console.error('Error fetching projects:', error);
    return {
      success: false,
      error: 'Failed to fetch projects',
    };
  }
});
