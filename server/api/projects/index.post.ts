import type { Project, CreateProjectInput, ApiResponse } from '~/types';

/**
 * POST /api/projects
 * Cria um novo projeto
 */
export default defineEventHandler(async (event): Promise<ApiResponse<Project>> => {
  try {
    const body = await readBody<CreateProjectInput>(event);

    // Validação
    if (!body.name || !body.niche) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Name and niche are required',
      });
    }

    // TODO: Integrar com Supabase para criar projeto
    // const user = await requireAuth(event);
    // const { data, error } = await supabase
    //   .from('projects')
    //   .insert({
    //     user_id: user.id,
    //     name: body.name,
    //     niche: body.niche,
    //     description: body.description,
    //     status: 'draft',
    //   })
    //   .select()
    //   .single();

    // Mock data para demonstração
    const newProject: Project = {
      id: Math.random().toString(36).substr(2, 9),
      user_id: 'user-1',
      name: body.name,
      niche: body.niche,
      description: body.description,
      status: 'draft',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    return {
      success: true,
      data: newProject,
    };
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
});
