import type { RealtimeChannel } from "@supabase/supabase-js";

/**
 * Composable para notificações em tempo real
 * Responsável por listen a mudanças no Supabase Realtime
 */
export const useRealtime = () => {
  const nuxtApp = useNuxtApp();
  const supabase = nuxtApp.$supabase;
  if (!supabase) {
    throw new Error(
      "Supabase client não inicializado. Verifique plugins/supabase.client.ts",
    );
  }

  const { addToast } = useAppToast();
  const projectStore = useProjectStore();
  const templateStore = useTemplateStore();

  const channels = ref<Map<string, RealtimeChannel>>(new Map());

  // ============ LISTEN PROJECTS CHANGES ============
  const listenProjectsChanges = (userId: string) => {
    try {
      const channel = supabase
        .channel(`projects:${userId}`)
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "projects",
            filter: `user_id=eq.${userId}`,
          },
          (payload: any) => {
            if (payload.eventType === "INSERT") {
              projectStore.addProject(payload.new);
              addToast("Novo projeto criado!", "success");
            } else if (payload.eventType === "UPDATE") {
              projectStore.updateProject(payload.new.id, payload.new);
              addToast("Projeto atualizado!", "info");
            } else if (payload.eventType === "DELETE") {
              projectStore.deleteProject(payload.old.id);
              addToast("Projeto deletado!", "info");
            }
          },
        )
        .subscribe();

      channels.value.set(`projects:${userId}`, channel);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Erro ao conectar ao realtime de projetos";
      console.error(message);
    }
  };

  // ============ LISTEN TEMPLATES CHANGES ============
  const listenTemplatesChanges = (userId: string) => {
    try {
      const channel = supabase
        .channel(`templates:${userId}`)
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "templates",
            filter: `user_id=eq.${userId}`,
          },
          (payload: any) => {
            if (payload.eventType === "INSERT") {
              templateStore.addTemplate(payload.new);
              addToast("Novo template criado!", "success");
            } else if (payload.eventType === "UPDATE") {
              templateStore.updateTemplate(payload.new.id, payload.new);
              addToast("Template atualizado!", "info");
            } else if (payload.eventType === "DELETE") {
              templateStore.deleteTemplate(payload.old.id);
              addToast("Template deletado!", "info");
            }
          },
        )
        .subscribe();

      channels.value.set(`templates:${userId}`, channel);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Erro ao conectar ao realtime de templates";
      console.error(message);
    }
  };

  // ============ LISTEN PUBLIC TEMPLATES CHANGES ============
  const listenPublicTemplatesChanges = () => {
    try {
      const channel = supabase
        .channel("public-templates")
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "templates",
            filter: "is_public=eq.true",
          },
          (payload: any) => {
            if (
              payload.eventType === "INSERT" ||
              payload.eventType === "UPDATE"
            ) {
              // Atualizar templates públicos se necessário
              // Esta é uma operação opcional dependendo da arquitetura
            }
          },
        )
        .subscribe();

      channels.value.set("public-templates", channel);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Erro ao conectar ao realtime de templates públicos";
      console.error(message);
    }
  };

  // ============ SUBSCRIEND TO ALL CHANGES ============
  const subscribeToAll = (userId: string) => {
    listenProjectsChanges(userId);
    listenTemplatesChanges(userId);
    listenPublicTemplatesChanges();
  };

  // ============ UNSUBSCRIBE FROM CHANNEL ============
  const unsubscribeFromChannel = (channelName: string) => {
    const channel = channels.value.get(channelName);
    if (channel) {
      supabase.removeChannel(channel);
      channels.value.delete(channelName);
    }
  };

  // ============ UNSUBSCRIBE FROM ALL ============
  const unsubscribeFromAll = () => {
    channels.value.forEach((channel, name) => {
      supabase.removeChannel(channel);
    });
    channels.value.clear();
  };

  // ============ CLEANUP ============
  onUnmounted(() => {
    unsubscribeFromAll();
  });

  return {
    subscribeToAll,
    unsubscribeFromChannel,
    unsubscribeFromAll,
    listenProjectsChanges,
    listenTemplatesChanges,
    listenPublicTemplatesChanges,
  };
};
