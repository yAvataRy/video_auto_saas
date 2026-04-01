import type {
  Template,
  CreateTemplateInput,
  UpdateTemplateInput,
} from "~/types";

/**
 * Composable para gerenciar templates
 * Responsável por CRUD de templates, compartilhamento e aplicação
 */
export const useTemplates = () => {
  const nuxtApp = useNuxtApp();
  const supabase = nuxtApp.$supabase;
  if (!supabase) {
    throw new Error(
      "Supabase client não inicializado. Verifique plugins/supabase.client.ts",
    );
  }

  const templateStore = useTemplateStore();
  const { addToast } = useAppToast();

  // ============ FETCH ALL TEMPLATES ============
  const fetchTemplates = async () => {
    try {
      const { data: session } = await supabase.auth.getSession();
      if (!session?.session?.user?.id) {
        throw new Error("Usuário não autenticado");
      }

      const { data, error } = await supabase
        .from("templates")
        .select("*")
        .or(`user_id.eq.${session.session.user.id},is_public.eq.true`)
        .order("created_at", { ascending: false });

      if (error) throw error;

      const templates = (data || []) as Template[];
      templateStore.setTemplates(templates);
      return templates;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erro ao carregar templates";
      addToast(message, "error");
      throw error;
    }
  };

  // ============ FETCH USER TEMPLATES ============
  const fetchUserTemplates = async () => {
    try {
      const { data: session } = await supabase.auth.getSession();
      if (!session?.session?.user?.id) {
        throw new Error("Usuário não autenticado");
      }

      const { data, error } = await supabase
        .from("templates")
        .select("*")
        .eq("user_id", session.session.user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;

      const templates = (data || []) as Template[];
      templateStore.setUserTemplates(templates);
      return templates;
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Erro ao carregar seus templates";
      addToast(message, "error");
      throw error;
    }
  };

  // ============ FETCH TEMPLATE BY ID ============
  const fetchTemplateById = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from("templates")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;

      return data as Template;
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Erro ao carregar detalhes do template";
      addToast(message, "error");
      throw error;
    }
  };

  // ============ CREATE TEMPLATE ============
  const createTemplate = async (input: CreateTemplateInput) => {
    try {
      const { data: session } = await supabase.auth.getSession();
      if (!session?.session?.user?.id) {
        throw new Error("Usuário não autenticado");
      }

      // Validação
      if (!input.name || !input.content || !input.category) {
        throw new Error("Preencha os campos obrigatórios");
      }

      const { data, error } = await supabase
        .from("templates")
        .insert([
          {
            user_id: session.session.user.id,
            name: input.name,
            description: input.description,
            content: input.content,
            category: input.category,
            thumbnail_url: input.thumbnail_url,
            is_public: input.is_public || false,
          },
        ])
        .select()
        .single();

      if (error) throw error;

      const template = data as Template;
      templateStore.addTemplate(template);
      addToast("Template criado com sucesso!", "success");
      return template;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erro ao criar template";
      addToast(message, "error");
      throw error;
    }
  };

  // ============ UPDATE TEMPLATE ============
  const updateTemplate = async (id: string, input: UpdateTemplateInput) => {
    try {
      const { data: session } = await supabase.auth.getSession();
      if (!session?.session?.user?.id) {
        throw new Error("Usuário não autenticado");
      }

      // Verificar propriedade
      const template = await fetchTemplateById(id);
      if (template.user_id !== session.session.user.id) {
        throw new Error("Você não tem permissão para editar este template");
      }

      const { data, error } = await supabase
        .from("templates")
        .update({
          ...input,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;

      const updated = data as Template;
      templateStore.updateTemplate(id, updated);
      addToast("Template atualizado com sucesso!", "success");
      return updated;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erro ao atualizar template";
      addToast(message, "error");
      throw error;
    }
  };

  // ============ DELETE TEMPLATE ============
  const deleteTemplate = async (id: string) => {
    try {
      const { data: session } = await supabase.auth.getSession();
      if (!session?.session?.user?.id) {
        throw new Error("Usuário não autenticado");
      }

      // Verificar propriedade
      const template = await fetchTemplateById(id);
      if (template.user_id !== session.session.user.id) {
        throw new Error("Você não tem permissão para deletar este template");
      }

      const { error } = await supabase.from("templates").delete().eq("id", id);

      if (error) throw error;

      templateStore.deleteTemplate(id);
      addToast("Template deletado com sucesso!", "success");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erro ao deletar template";
      addToast(message, "error");
      throw error;
    }
  };

  // ============ APPLY TEMPLATE TO PROJECT ============
  const applyTemplateToProject = async (
    projectId: string,
    templateId: string,
  ) => {
    try {
      const { error } = await supabase.from("project_templates").insert([
        {
          project_id: projectId,
          template_id: templateId,
        },
      ]);

      if (error && error.code !== "23505") {
        // 23505 = unique constraint violation (já existe)
        throw error;
      }

      addToast("Template aplicado ao projeto!", "success");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erro ao aplicar template";
      addToast(message, "error");
      throw error;
    }
  };

  // ============ GET PROJECT TEMPLATES ============
  const getProjectTemplates = async (projectId: string) => {
    try {
      const { data, error } = await supabase
        .from("project_templates")
        .select("templates(*)")
        .eq("project_id", projectId);

      if (error) throw error;

      const templates = (data || []).map(
        (pt: any) => pt.templates,
      ) as Template[];
      return templates;
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Erro ao carregar templates do projeto";
      addToast(message, "error");
      throw error;
    }
  };

  return {
    fetchTemplates,
    fetchUserTemplates,
    fetchTemplateById,
    createTemplate,
    updateTemplate,
    deleteTemplate,
    applyTemplateToProject,
    getProjectTemplates,
    templates: computed(() => templateStore.templates),
    userTemplates: computed(() => templateStore.userTemplates),
  };
};
