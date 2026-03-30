import type { Project, ApiResponse } from '~/types';

/**
 * GET /api/projects/:id
 * Retorna detalhes de um projeto específico
 */
export default defineEventHandler(async (event): Promise<ApiResponse<Project>> => {
  try {
    const id = getRouterParam(event, 'id');

    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Project ID is required',
      });
    }

    // TODO: Integrar com Supabase para buscar projeto
    // const user = await requireAuth(event);
    // const { data, error } = await supabase
    //   .from('projects')
    //   .select('*')
    //   .eq('id', id)
    //   .eq('user_id', user.id)
    //   .single();

    // Mock data para demonstração
    const project: Project = {
      id,
      user_id: 'user-1',
      name: 'Finance Channel',
      niche: 'Finance',
      description: 'Personal finance and investing tips',
      status: 'active',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    return {
      success: true,
      data: project,
    };
  } catch (error) {
    console.error('Error fetching project:', error);
    throw error;
  }
});
