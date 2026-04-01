import type { Project, CreateProjectInput, UpdateProjectInput } from "~/types";
import { projectSchema, validateForm } from "~/utils/validations";

export const useProjects = () => {
  const projectStore = useProjectStore();
  const loading = ref(false);
  const error = ref<string | null>(null);

  const nuxtApp = useNuxtApp();
  const supabase = nuxtApp.$supabase as any;

  if (!supabase) {
    throw new Error(
      "Supabase client não inicializado. Verifique plugins/supabase.client.ts",
    );
  }

  const getUserId = async () => {
    const { data: sessionData, error: sessionError } =
      await supabase.auth.getSession();

    if (sessionError) {
      throw new Error(
        sessionError.message || "Falha ao obter sessão do Supabase",
      );
    }

    const userId = sessionData?.session?.user?.id;

    if (!userId) {
      throw new Error("Usuário não autenticado");
    }

    return userId;
  };

  const handleError = (err: unknown, defaultMessage: string) => {
    const message = err instanceof Error ? err.message : defaultMessage;
    error.value = message;
    console.error(defaultMessage + ":", err);
    throw new Error(message);
  };

  const fetchProjects = async () => {
    loading.value = true;
    error.value = null;

    try {
      const userId = await getUserId();

      const { data, error: supabaseError } = await supabase
        .from<Project>("projects")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (supabaseError) {
        return handleError(supabaseError, "Erro ao buscar projetos");
      }

      const projects = data || [];
      projectStore.setProjects(projects);

      return {
        success: true,
        data: projects,
      };
    } catch (err) {
      return handleError(err, "Erro ao buscar projetos");
    } finally {
      loading.value = false;
    }
  };

  const fetchProjectById = async (id: string) => {
    loading.value = true;
    error.value = null;

    try {
      const userId = await getUserId();

      const { data, error: supabaseError } = await supabase
        .from<Project>("projects")
        .select("*")
        .eq("id", id)
        .eq("user_id", userId)
        .single();

      if (supabaseError) {
        return handleError(supabaseError, "Erro ao buscar projeto");
      }

      if (!data) {
        throw new Error("Projeto não encontrado");
      }

      return {
        success: true,
        data,
      };
    } catch (err) {
      return handleError(err, "Erro ao buscar projeto");
    } finally {
      loading.value = false;
    }
  };

  const createProject = async (input: CreateProjectInput) => {
    loading.value = true;
    error.value = null;

    try {
      // Validar dados de entrada
      const validation = validateForm(
        projectSchema.omit({ status: true }),
        input,
      );
      if (!validation.success) {
        throw new Error(
          Object.values(validation.errors!)[0] || "Dados inválidos",
        );
      }

      const userId = await getUserId();

      const { data, error: supabaseError } = await supabase
        .from<Project>("projects")
        .insert({
          user_id: userId,
          name: validation.data!.name,
          niche: validation.data!.niche,
          description: validation.data!.description || "",
          status: "draft",
        })
        .select()
        .single();

      if (supabaseError) {
        return handleError(supabaseError, "Erro ao criar projeto");
      }

      if (data) {
        projectStore.addProject(data);
      }

      return {
        success: true,
        data,
      };
    } catch (err) {
      return handleError(err, "Erro ao criar projeto");
    } finally {
      loading.value = false;
    }
  };

  const updateProject = async (id: string, input: UpdateProjectInput) => {
    loading.value = true;
    error.value = null;

    try {
      // Validar dados de entrada
      const validation = validateForm(projectSchema, input);
      if (!validation.success) {
        throw new Error(
          Object.values(validation.errors!)[0] || "Dados inválidos",
        );
      }

      const userId = await getUserId();

      const { data, error: supabaseError } = await supabase
        .from<Project>("projects")
        .update({
          ...validation.data,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .eq("user_id", userId)
        .select()
        .single();

      if (supabaseError) {
        return handleError(supabaseError, "Erro ao atualizar projeto");
      }

      if (data) {
        projectStore.updateProject(id, data);
      }

      return {
        success: true,
        data,
      };
    } catch (err) {
      return handleError(err, "Erro ao atualizar projeto");
    } finally {
      loading.value = false;
    }
  };

  const deleteProject = async (id: string) => {
    loading.value = true;
    error.value = null;

    try {
      const userId = await getUserId();

      const { error: supabaseError } = await supabase
        .from("projects")
        .delete()
        .eq("id", id)
        .eq("user_id", userId);

      if (supabaseError) {
        return handleError(supabaseError, "Erro ao deletar projeto");
      }

      projectStore.removeProject(id);

      return {
        success: true,
      };
    } catch (err) {
      return handleError(err, "Erro ao deletar projeto");
    } finally {
      loading.value = false;
    }
  };

  // ============ SCHEDULING ============
  const fetchScheduledProjects = async () => {
    loading.value = true;
    error.value = null;

    try {
      const userId = await getUserId();
      const now = new Date().toISOString();

      const { data, error: supabaseError } = await supabase
        .from<Project>("projects")
        .select("*")
        .eq("user_id", userId)
        .not("scheduled_at", "is", null)
        .gte("scheduled_at", now)
        .order("scheduled_at", { ascending: true });

      if (supabaseError) {
        return handleError(supabaseError, "Erro ao buscar projetos agendados");
      }

      return {
        success: true,
        data: data || [],
      };
    } catch (err) {
      return handleError(err, "Erro ao buscar projetos agendados");
    } finally {
      loading.value = false;
    }
  };

  const getUpcomingSchedules = (limit: number = 5): Project[] => {
    return projectStore.projects
      .filter((p) => p.scheduled_at && new Date(p.scheduled_at) > new Date())
      .sort((a, b) => {
        const dateA = new Date(a.scheduled_at || 0).getTime();
        const dateB = new Date(b.scheduled_at || 0).getTime();
        return dateA - dateB;
      })
      .slice(0, limit);
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
    fetchScheduledProjects,
    getUpcomingSchedules,
  };
};
