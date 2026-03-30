import { defineStore } from 'pinia';
import type { Project } from '~/types';

/**
 * Pinia Store para gerenciar estado de projetos globalmente
 */
export const useProjectStore = defineStore('project', {
  state: () => ({
    projects: [] as Project[],
    selectedProject: null as Project | null,
    isLoading: false,
  }),

  getters: {
    // Getter para contar projetos
    projectCount: (state) => state.projects.length,

    // Getter para obter projeto por ID
    getProjectById: (state) => (id: string) => {
      return state.projects.find((p) => p.id === id) || null;
    },

    // Getter para obter projetos ativos
    activeProjects: (state) => {
      return state.projects.filter((p) => p.status === 'active');
    },

    // Getter para obter projetos por nicho
    getProjectsByNiche: (state) => (niche: string) => {
      return state.projects.filter((p) => p.niche === niche);
    },
  },

  actions: {
    // Definir lista de projetos
    setProjects(projects: Project[]) {
      this.projects = projects;
    },

    // Adicionar projeto
    addProject(project: Project) {
      this.projects.push(project);
    },

    // Atualizar projeto
    updateProject(id: string, updates: Partial<Project>) {
      const index = this.projects.findIndex((p) => p.id === id);
      if (index !== -1) {
        this.projects[index] = { ...this.projects[index], ...updates };
      }
    },

    // Remover projeto
    removeProject(id: string) {
      this.projects = this.projects.filter((p) => p.id !== id);
    },

    // Definir projeto selecionado
    setSelectedProject(project: Project | null) {
      this.selectedProject = project;
    },

    // Limpar projetos
    clearProjects() {
      this.projects = [];
      this.selectedProject = null;
    },

    // Definir estado de carregamento
    setLoading(loading: boolean) {
      this.isLoading = loading;
    },
  },
});
