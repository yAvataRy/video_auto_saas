import type { Project, UpdateProjectInput, ApiResponse } from "~/types";

/**
 * PUT /api/projects/:id
 * Atualiza um projeto existente
 */
export default defineEventHandler(
  async (event): Promise<ApiResponse<Project>> => {
    try {
      const id = getRouterParam(event, "id");
      const body = await readBody<UpdateProjectInput>(event);

      if (!id) {
        throw createError({
          statusCode: 400,
          statusMessage: "Project ID is required",
        });
      }

      if (!body.name && !body.niche && !body.description && !body.status) {
        throw createError({
          statusCode: 400,
          statusMessage: "At least one valid field is required for update",
        });
      }

      // TODO: Integrar com Supabase para atualizar projeto
      // const user = await requireAuth(event);
      // const { data, error } = await supabase
      //   .from('projects')
      //   .update(body)
      //   .eq('id', id)
      //   .eq('user_id', user.id)
      //   .single();
      // if (error) { throw createError({ statusCode: 500, statusMessage: error.message }); }

      // Mock update de demo (não persistente)
      const updatedProject: Project = {
        id,
        user_id: "user-1",
        name: body.name || "Updated Project Name",
        niche: body.niche || "Updated Niche",
        description: body.description || "Updated description",
        status: body.status || "active",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      return {
        success: true,
        data: updatedProject,
      };
    } catch (error) {
      console.error("Error updating project:", error);
      throw error;
    }
  },
);
