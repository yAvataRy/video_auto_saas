import { defineStore } from "pinia";
import type { Template } from "~/types";

interface TemplateState {
  templates: Template[];
  userTemplates: Template[];
  loading: boolean;
  error: string | null;
}

export const useTemplateStore = defineStore("template", {
  state: (): TemplateState => ({
    templates: [],
    userTemplates: [],
    loading: false,
    error: null,
  }),

  getters: {
    templatesByCategory: (state) => (category: string) => {
      return state.templates.filter((t) => t.category === category);
    },

    publicTemplates: (state) => {
      return state.templates.filter((t) => t.is_public);
    },

    privateTemplates: (state) => {
      return state.userTemplates.filter((t) => !t.is_public);
    },
  },

  actions: {
    setTemplates(templates: Template[]) {
      this.templates = templates;
    },

    setUserTemplates(templates: Template[]) {
      this.userTemplates = templates;
    },

    addTemplate(template: Template) {
      this.userTemplates.unshift(template);
      if (template.is_public) {
        this.templates.unshift(template);
      }
    },

    updateTemplate(id: string, updated: Template) {
      const userIndex = this.userTemplates.findIndex((t) => t.id === id);
      if (userIndex !== -1) {
        this.userTemplates[userIndex] = updated;
      }

      const publicIndex = this.templates.findIndex((t) => t.id === id);
      if (publicIndex !== -1) {
        this.templates[publicIndex] = updated;
      }
    },

    deleteTemplate(id: string) {
      this.userTemplates = this.userTemplates.filter((t) => t.id !== id);
      this.templates = this.templates.filter((t) => t.id !== id);
    },

    setLoading(loading: boolean) {
      this.loading = loading;
    },

    setError(error: string | null) {
      this.error = error;
    },

    clearError() {
      this.error = null;
    },
  },
});
