<template>
  <div>
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-3xl font-bold text-gray-800">Projects</h1>
      <button
        @click="showCreateModal = true"
        class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center"
      >
        <Icon name="mdi:plus" class="w-5 h-5 mr-2" />
        New Project
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-12">
      <Icon name="mdi:loading" class="w-8 h-8 animate-spin mx-auto text-gray-400 mb-3" />
      <p class="text-gray-500">Loading projects...</p>
    </div>

    <!-- Empty State -->
    <div v-else-if="projects.length === 0" class="text-center py-12 bg-white rounded-lg">
      <Icon name="mdi:folder-open" class="w-16 h-16 mx-auto text-gray-300 mb-4" />
      <h3 class="text-lg font-semibold text-gray-800 mb-2">No projects yet</h3>
      <p class="text-gray-500 mb-6">Create your first project to get started</p>
      <button
        @click="showCreateModal = true"
        class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
      >
        Create Project
      </button>
    </div>

    <!-- Projects Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="project in projects"
        :key="project.id"
        class="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6"
      >
        <div class="flex items-start justify-between mb-4">
          <div>
            <h3 class="text-lg font-semibold text-gray-800">{{ project.name }}</h3>
            <p class="text-sm text-gray-500">{{ project.niche }}</p>
          </div>
          <span
            :class="{
              'px-3 py-1 rounded-full text-xs font-semibold': true,
              'bg-green-100 text-green-800': project.status === 'active',
              'bg-yellow-100 text-yellow-800': project.status === 'draft',
              'bg-gray-100 text-gray-800': project.status === 'archived',
            }"
          >
            {{ project.status }}
          </span>
        </div>

        <p v-if="project.description" class="text-gray-600 text-sm mb-4">
          {{ project.description }}
        </p>

        <div class="flex items-center justify-between pt-4 border-t border-gray-200">
          <span class="text-xs text-gray-500">
            {{ formatDate(project.created_at) }}
          </span>
          <div class="flex space-x-2">
            <NuxtLink
              :to="`/projects/${project.id}`"
              class="text-blue-600 hover:text-blue-700 font-semibold text-sm"
            >
              View
            </NuxtLink>
            <button
              @click="handleDelete(project.id)"
              class="text-red-600 hover:text-red-700 font-semibold text-sm"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Create Project Modal -->
    <div v-if="showCreateModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <h2 class="text-2xl font-bold text-gray-800 mb-4">Create New Project</h2>

        <form @submit.prevent="handleCreateProject" class="space-y-4">
          <!-- Name -->
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700 mb-1">
              Project Name *
            </label>
            <input
              id="name"
              v-model="newProject.name"
              type="text"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="My Awesome Project"
            />
          </div>

          <!-- Niche -->
          <div>
            <label for="niche" class="block text-sm font-medium text-gray-700 mb-1">
              Niche *
            </label>
            <input
              id="niche"
              v-model="newProject.niche"
              type="text"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., Finance, Psychology, Technology"
            />
          </div>

          <!-- Description -->
          <div>
            <label for="description" class="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              v-model="newProject.description"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Optional description"
              rows="3"
            ></textarea>
          </div>

          <!-- Buttons -->
          <div class="flex space-x-3 pt-4">
            <button
              type="button"
              @click="showCreateModal = false"
              class="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="createLoading"
              class="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="!createLoading">Create</span>
              <span v-else class="flex items-center justify-center">
                <Icon name="mdi:loading" class="w-4 h-4 mr-2 animate-spin" />
                Creating...
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CreateProjectInput } from '~/types';

definePageMeta({
  middleware: 'auth',
});

const { projects, loading, fetchProjects, createProject, deleteProject } = useProjects();
const showCreateModal = ref(false);
const createLoading = ref(false);

const newProject = reactive<CreateProjectInput>({
  name: '',
  niche: '',
  description: '',
});

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const handleCreateProject = async () => {
  createLoading.value = true;
  try {
    await createProject(newProject);
    showCreateModal.value = false;
    newProject.name = '';
    newProject.niche = '';
    newProject.description = '';
  } catch (error) {
    console.error('Failed to create project:', error);
  } finally {
    createLoading.value = false;
  }
};

const handleDelete = async (id: string) => {
  if (confirm('Are you sure you want to delete this project?')) {
    try {
      await deleteProject(id);
    } catch (error) {
      console.error('Failed to delete project:', error);
    }
  }
};

onMounted(async () => {
  try {
    await fetchProjects();
  } catch (error) {
    console.error('Failed to fetch projects:', error);
  }
});
</script>
