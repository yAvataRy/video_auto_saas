import type { Project, CreateProjectInput, UpdateProjectInput, ApiResponse } from '~/types';

/**
 * Composable para gerenciar projetos
 * Responsável por CRUD de projetos
 */
export const useProjects = () => {
  const projectStore = useProjectStore();
  const loading = ref(false);
  const error = ref<string | null>(null);

  // ============ GET ALL PROJECTS ============
  const fetchProjects = async () => {
    loading.value = true;
    error.value = null;

    try {
      const { data } = await $fetch<ApiResponse<Project[]>>('/api/projects', {
        method: 'GET',
      });

      if (data) {
        projectStore.setProjects(data);
      }

      return { success: true, data };
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erro ao buscar projetos';
      console.error('Fetch projects error:', err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // ============ GET PROJECT BY ID ============
  const fetchProjectById = async (id: string) => {
    loading.value = true;
    error.value = null;

    try {
      const { data } = await $fetch<ApiResponse<Project>>(`/api/projects/${id}`, {
        method: 'GET',
      });

      return { success: true, data };
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erro ao buscar projeto';
      console.error('Fetch project error:', err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // ============ CREATE PROJECT ============
  const createProject = async (input: CreateProjectInput) => {
    loading.value = true;
    error.value = null;

    try {
      const { data } = await $fetch<ApiResponse<Project>>('/api/projects', {
        method: 'POST',
        body: input,
      });

      if (data) {
        projectStore.addProject(data);
      }

      return { success: true, data };
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erro ao criar projeto';
      console.error('Create project error:', err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // ============ UPDATE PROJECT ============
  const updateProject = async (id: string, input: UpdateProjectInput) => {
    loading.value = true;
    error.value = null;

    try {
      const { data } = await $fetch<ApiResponse<Project>>(`/api/projects/${id}`, {
        method: 'PUT',
        body: input,
      });

      if (data) {
        projectStore.updateProject(id, data);
      }

      return { success: true, data };
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erro ao atualizar projeto';
      console.error('Update project error:', err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // ============ DELETE PROJECT ============
  const deleteProject = async (id: string) => {
    loading.value = true;
    error.value = null;

    try {
      await $fetch(`/api/projects/${id}`, {
        method: 'DELETE',
      });

      projectStore.removeProject(id);
      return { success: true };
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erro ao deletar projeto';
      console.error('Delete project error:', err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  return {
    projects: computed(() => projectStore.projects),
    loading: readonly(loading),
    error: readonly(error),
    fetchProjects,
    fetchProjectById,
    createProject,
    updateProject,
    deleteProject,
  };
};
