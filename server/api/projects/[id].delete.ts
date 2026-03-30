import type { ApiResponse } from '~/types';

/**
 * DELETE /api/projects/:id
 * Deleta um projeto
 */
export default defineEventHandler(async (event): Promise<ApiResponse<{ success: boolean }>> => {
  try {
    const id = getRouterParam(event, 'id');

    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Project ID is required',
      });
    }

    // TODO: Integrar com Supabase para deletar projeto
    // const user = await requireAuth(event);
    // const { error } = await supabase
    //   .from('projects')
    //   .delete()
    //   .eq('id', id)
    //   .eq('user_id', user.id);

    return {
      success: true,
      data: { success: true },
    };
  } catch (error) {
    console.error('Error deleting project:', error);
    throw error;
  }
});
